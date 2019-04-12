<?php

namespace App\Services\User;

use App\Contracts\Repository\UserRepositoryContract as UserRepository;
use Illuminate\Contracts\Routing\ResponseFactory as Response;
use Illuminate\Contracts\Validation\Factory as Validator;
use Illuminate\Validation\ValidationException;

class FindUserService
{
    private $repository;

    public function __construct(
        UserRepository $repository,
        Response $response
    ) {
        $this->repository = $repository;
        $this->response = $response;
    }

    public function findUserResponse($userId)
    {
        try {
            $user = $this->repository->findOne($userId);

            return $this->response->success($user);
        } catch (ValidationException $e) {
            return $this->response->validateError($e->errors());
        }
    }

}
