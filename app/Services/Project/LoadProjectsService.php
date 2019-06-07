<?php

namespace App\Services\Project;

use App\Contracts\Repository\ProjectsRepositoryContract as ProjectsRepository;
use Illuminate\Contracts\Routing\ResponseFactory as Response;
use Illuminate\Validation\ValidationException;

class LoadProjectsService
{
    private $repository;

    public function __construct(
        ProjectsRepository $repository,
        Response $response
    ) {
        $this->repository = $repository;
        $this->response = $response;
    }

    public function loadProjects()
    {
        try {
            $roles = $this->repository->listProjects();

            return $this->response->success(['data' => $roles]);
        } catch (ValidationException $e) {
            return $this->response->validateError($e->errors());
        }
    }

}
