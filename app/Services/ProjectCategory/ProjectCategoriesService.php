<?php

namespace App\Services\ProjectCategory;

use App\Contracts\Repository\ProjectCategoriesRepositoryContract as ProjectCategoriesRepository;
use Illuminate\Contracts\Routing\ResponseFactory as Response;
use Illuminate\Validation\ValidationException;

class ProjectCategoriesService
{
    private $repository;
    private $response;
    
    public function __construct(
        ProjectCategoriesRepository $repository,
        Response $response
    ) {
        $this->repository = $repository;
        $this->response = $response;
    }

    public function loadCategories($projectId)
    {
        try {
            $roles = $this->repository->projectCategories($projectId);

            return $this->response->success(['data' => $roles]);
        } catch (ValidationException $e) {
            return $this->response->validateError($e->errors());
        }
    }

}
