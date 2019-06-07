<?php 

namespace App\Services\Ticket;

use Illuminate\Contracts\Routing\ResponseFactory as Response;
use Illuminate\Contracts\Validation\Factory as Validator;
use Illuminate\Validation\ValidationException;
/**
 * Models
 */
use App\Models\UserTicket;
/**
 * Contracts
 */
use App\Contracts\Repository\PrioritiesRepositoryContract as PrioritiesRepository;
use App\Contracts\Repository\TicketStatusesRepositoryContract as TicketStatusesRepository;
use App\Contracts\Repository\UserRepositoryContract as UserRepository;
use App\Contracts\Repository\ProjectsRepositoryContract ;
use App\Contracts\Repository\TicketRepositoryContract as TicketRepository;
/**
 * Services
 */
use App\Services\Comment\CommentStoreService;
use App\Services\Faq\FaqStoreService;
use App\Services\Ticket\TicketStoreUpdateMailer;
/**
 * Presenters
 */
use App\Presenters\TicketPresenter;

class TicketStatusUpdateService
{
    private $repository;
    private $priorityRepo;
    private $statusRepo;
    private $userRepo;
    private $validator;
    private $projectRepo;
    private $storeComment;
    private $storeFaq;
    private $ticketMailer;

    public function __construct(
        Validator $validator,
        Response $response,
        UserRepository $userRepo,
        TicketRepository $repository,
        PrioritiesRepository $priorityRepo,
        TicketStatusesRepository $statusRepo,
        ProjectsRepositoryContract $projectRepo,
        CommentStoreService $storeComment,
        FaqStoreService $storeFaq,
        TicketStoreUpdateMailer $ticketMailer
    ) {
        $this->repository = $repository;
        $this->response = $response;
        $this->priorityRepo  = $priorityRepo;
        $this->statusRepo = $statusRepo;
        $this->userRepo = $userRepo;
        $this->validator = $validator;
        $this->projectRepo = $projectRepo;
        $this->storeComment = $storeComment;
        $this->storeFaq = $storeFaq;
        $this->ticketMailer = $ticketMailer;
    }

    public function validateData($data)
    {
        return $this->validator->make($data, [
            'status_id' => 'required',
            'ticket_id' => 'required',
            'comment' => 'nullable',
            'duplicate_of' => 'nullable',
            'order' => 'nullable'
        ]);
    }

    /**
     * Set data, populate fields that has null or unset.
     */
    private function setupData($data)
    {
        $currentUser = $this->userRepo->skipPresenter()->currentUser();
        $ticketFields = [
            'status_id' =>  $data['status_id']
        ];

        $status = $this->statusRepo->skipPresenter()->find($data['status_id']);
        $firstChild = $status->children()->orderBy('order', 'asc')->first();

        if($firstChild)
        {
            /**
             * When there is a children of this selected status
             * then select first child of current status.
             */
            $ticketFields['status_id'] = $firstChild->id;
        }

        if(isset($data['duplicate_of']) && $data['duplicate_of'])
        {
            $ticketFields['duplicate_of'] = $data['duplicate_of'];
        }

        if(isset($data['order']))
        {
            $ticketFields['order'] = $data['order'];
        }

        return [
            'ticket_id' => $data['ticket_id'],
            'ticket' => $ticketFields,
            'comment' => isset($data['comment']) ? $data['comment'] : null
        ];
    }

    public function doUpdate($data)
    {
        try {

            $validator = $this->validateData($data);

            if ($validator->fails()) 
            {
                throw new ValidationException($validator);
            }
        
            $data = $this->setupData($data);

            if(isset($data['ticket']['duplicate_of']) && $data['ticket']['duplicate_of'])
            {
                $faqResponse = $this->storeFaq->doStore([
                    'ticket_id' => $data['ticket']['duplicate_of']
                ]);

                if($faqResponse->getStatusCode() != 200)
                {
                    return $faqResponse;
                }
            }

            $ticket = $this->repository->skipPresenter()->update($data['ticket'], $data['ticket_id']);
            $presenter = new TicketPresenter;

            $this->ticketMailer->sendForStatusChange($ticket);

            if($data['comment'])
            {
                $this->storeComment->doStore([
                    'ticket_id' => $data['ticket_id'],
                    'contents' => $data['comment']
                ]);
            }

            return $this->response->success([ 'data' =>  $presenter->present($ticket) ]);

        }catch (ValidationException $e) {
            return $this->response->validateError($e->errors());
        }
    }
}
