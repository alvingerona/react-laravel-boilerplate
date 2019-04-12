<?php

namespace App\Services\User;

use App\Contracts\Repository\TicketsRepositoryContract as TicketsRepository;
use Illuminate\Contracts\Routing\ResponseFactory as Response;
use Illuminate\Contracts\Validation\Factory as Validator;
use Illuminate\Validation\ValidationException;

class TicketsService
{
    private $repository;

    public function __construct(
        TicketsRepository $repository,
        Response $response
    ) {
        $this->repository = $repository;
        $this->response = $response;
    }

    public function listResponse($filter)
    {
        try {
            $users = $this->repository->listOfUsers();

            return $this->response->success(['data' => $users]);
        } catch (ValidationException $e) {
            return $this->response->validateError($e->errors());
        }
    }

}
