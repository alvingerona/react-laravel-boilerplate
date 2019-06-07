<?php 

namespace App\Services\Ticket;

use App\Contracts\Repository\TicketRepositoryContract as TicketRepository;
use Illuminate\Contracts\Routing\ResponseFactory as Response;
use Illuminate\Contracts\Validation\Factory as Validator;
use Illuminate\Validation\ValidationException;

/**
 * Repo contract
 */
use App\Contracts\Repository\PrioritiesRepositoryContract as PrioritiesRepository;
use  App\Contracts\Repository\TicketStatusesRepositoryContract as TicketStatusesRepository;
use App\Contracts\Repository\UserRepositoryContract as UserRepository;
use App\Contracts\Repository\ProjectsRepositoryContract ;

use App\Models\UserTicket;
use App\Services\Ticket\TicketStoreUpdateMailer;

class TicketStoreService
{
    private $repository;
    private $priorityRepo;
    private $statusRepo;
    private $userRepo;
    private $validator;
    private $projectRepo;
    private $ticketMailer;
    
    public function __construct(
        Validator $validator,
        Response $response,
        UserRepository $userRepo,
        TicketRepository $repository,
        PrioritiesRepository $priorityRepo,
        TicketStatusesRepository $statusRepo,
        ProjectsRepositoryContract $projectRepo,
        TicketStoreUpdateMailer $ticketMailer
    ) {
        $this->repository = $repository;
        $this->response = $response;
        $this->priorityRepo  = $priorityRepo;
        $this->statusRepo = $statusRepo;
        $this->userRepo = $userRepo;
        $this->validator = $validator;
        $this->projectRepo = $projectRepo;
        $this->ticketMailer = $ticketMailer;
    }

    public function validateData($data)
    {
        return $this->validator->make($data, [
            'subject' => 'required',
            'description' => 'required',
            'priority' => 'required',
            'status' => 'nullable',
            'assignee' => 'nullable',
            'project' => 'required',
            'category' => 'required',
        ]);
    }

    /**
     * Set data, populate fields that has null or unset.
     */
    private function setupData($data)
    {
        $defPriority = $this->priorityRepo->skipPresenter()->onlyDefault();
        $defStatus = $this->statusRepo->skipPresenter()->onlyDefault();
        $defAssignee = $this->userRepo->skipPresenter()->resolverLowestTicket();

        if(!isset($data['assignee']) || !$data['assignee'])
        {
            $data['assignee'] = $defAssignee->id;
        }

        if(!isset($data['priority']) || !$data['priority'])
        {
            $data['priority'] = $defPriority->id;
        }        

        if(!isset($data['status']) || !$data['status'])
        {
            $data['status'] = $defStatus->id;
        }

        /**
         * Get the last ticket on same status.
         */
        $lastTicket = $this->repository->skipPresenter()->statusListInOrder($data['status']);

        if($lastTicket)
        {
            $data['order'] = $lastTicket->order + 1;
        }
        
        $projectId = $data['project'];
        $currentUser = $this->userRepo->skipPresenter()->currentUser();

        return [
            'ticket' => [
                'proj_id' => $projectId,
                'subject' => $data['subject'],
                'proj_category_id' => $data['category'],
                'key_number' => $this->projectRepo->nextKey($projectId),
                'reporter_id' => $currentUser->id,
                'description' =>  $data['description'],
                'priority_type_id' => $data['priority'] ,
                'status_id' =>  $data['status'],
                'order' => 0
            ],
            'assignee' => $data['assignee']
        ];
    }

    public function doStore($data)
    {
        try {

            $validator = $this->validateData($data);

            if ($validator->fails()) 
            {
                throw new ValidationException($validator);
            }
            
            $data = $this->setupData($data);
            $ticket = $this->repository->skipPresenter()->create($data['ticket']);

            UserTicket::assign($data['assignee'],  $ticket->id);

            $this->ticketMailer->sendForStore($ticket);

            return $this->response->success(['data' => $ticket]);

        }catch (ValidationException $e) {
            return $this->response->validateError($e->errors());
        }
    }
}
