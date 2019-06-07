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

class FaqDeleteService
{
    private $repository;
    private $validator;
    private $response;
    private $ticketRepo;

    public function __construct(
        Validator $validator,
        Response $response,
        FaqRepository $repository
    ) {
        $this->repository = $repository;
        $this->response = $response;
        $this->validator = $validator;
    }

    public function validateData($data)
    {
        return $this->validator->make($data, [
            'faq_id' => 'required'
        ]);
    }

    public function doDelete($data)
    {
        try {

            $validator = $this->validateData($data);

            if ($validator->fails()) 
            {
                throw new ValidationException($validator);
            }
            
          $this->repository->delete($data['faq_id']);

            return $this->response->success(['success' => true]);

        }catch (ValidationException $e) {
            return $this->response->validateError($e->errors());
        }
    }
}
