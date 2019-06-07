<?php 

namespace App\Services\Faq;

use Illuminate\Contracts\Routing\ResponseFactory as Response;
use Illuminate\Contracts\Validation\Factory as Validator;
use Illuminate\Validation\ValidationException;

/**
 * Repositories
 */
use App\Contracts\Repository\FaqRepositoryContract as FaqRepository;

class FaqFilterService
{
    private $repository;
    private $response;

    public function __construct(
        Response $response,
        FaqRepository $repository
    ) {
        $this->repository = $repository;
        $this->response = $response;
    }

    public function listResponse($data)
    {
        try {
            $faqs = $this->repository->paginate();

            return $this->response->success(['data' => $faqs]);

        } catch (ValidationException $e) {
            return $this->response->validateError($e->errors());
        }
    }

    public function findOne($id)
    {
        try {
            $faq = $this->repository->find($id);

            return $this->response->success(['data' => $faq]);

        } catch (ValidationException $e) {
            return $this->response->validateError($e->errors());
        }        
    }
}
