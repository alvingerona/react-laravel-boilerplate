<?php

namespace App\Services\Role;

use App\Contracts\Repository\RoleRepositoryContract as RoleRepository;
use Illuminate\Contracts\Routing\ResponseFactory as Response;
use Illuminate\Validation\ValidationException;

class LoadRolesService
{
    private $repository;

    public function __construct(
        RoleRepository $repository,
        Response $response
    ) {
        $this->repository = $repository;
        $this->response = $response;
    }

    public function loadRoles()
    {
        try {
            $roles = $this->repository->listOfRoles();

            return $this->response->success(['data' => $roles]);
        } catch (ValidationException $e) {
            return $this->response->validateError($e->errors());
        }
    }

}
