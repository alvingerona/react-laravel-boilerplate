<?php

namespace App\Services\PriorityType;

use App\Contracts\Repository\PrioritiesRepositoryContract as PrioritiesRepository;
use Illuminate\Contracts\Routing\ResponseFactory as Response;
use Illuminate\Validation\ValidationException;

class LoadPriorityTypesService
{
    private $repository;

    public function __construct(
        PrioritiesRepository $repository,
        Response $response
    ) {
        $this->repository = $repository;
        $this->response = $response;
    }

    public function loadPriorityTypes()
    {
        try {
            $roles = $this->repository->loadPriorityTypes();

            return $this->response->success(['data' => $roles]);
        } catch (ValidationException $e) {
            return $this->response->validateError($e->errors());
        }
    }

}
