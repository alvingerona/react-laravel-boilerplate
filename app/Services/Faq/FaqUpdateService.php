<?php 

namespace App\Services\Faq;

use Illuminate\Contracts\Routing\ResponseFactory as Response;
use Illuminate\Contracts\Validation\Factory as Validator;
use Illuminate\Validation\ValidationException;

/**
 * Repositories
 */
use App\Contracts\Repository\UserRepositoryContract as UserRepository;
use App\Contracts\Repository\FaqRepositoryContract as FaqRepository;

/**
 * Rules
 */
use App\Rules\TicketAllowedToFaqRule;

class FaqUpdateService
{
    private $repository;
    private $userRepo;
    private $validator;
    private $response;
    private $ticketRepo;

    public function __construct(
        Validator $validator,
        Response $response,
        UserRepository $userRepo,
        FaqRepository $repository
    ) {
        $this->repository = $repository;
        $this->response = $response;
        $this->userRepo = $userRepo;
        $this->validator = $validator;
    }

    public function validateData($data)
    {
        return $this->validator->make($data, [
            'subject' => 'required_without:ticket_id',
            'description' => 'required_without:ticket_id',
            'ticket_id' => new TicketAllowedToFaqRule
        ]);
    }

    /**
     * Set data, populate fields that has null or unset.
     */
    private function setupData($data)
    {
        $currentUser = $this->userRepo->skipPresenter()->currentUser();

        return  array_merge($data, [
            'author_id' => $currentUser->id
         ]);
    }

    public function doUpdate($faqId, $data)
    {
        try {

            $validator = $this->validateData($data);

            if ($validator->fails()) 
            {
                throw new ValidationException($validator);
            }

            if(isset($data['ticket_id']) && $data['ticket_id'])
            {
                $faq = $this->repository->forTicketId($data['ticket_id']);
                
                if(!empty($faq['data']))
                {
                    if($faqId != $faq['data']['id'])
                    {
                        return $this->response->success($faq);
                    }
                }
            }
            
            $data = $this->setupData($data);
            $faq = $this->repository->update($data, $faqId);

            return $this->response->success($faq);

        }catch (ValidationException $e) {
            return $this->response->validateError($e->errors());
        }
    }
}
