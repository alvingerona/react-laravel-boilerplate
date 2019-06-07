<?php

namespace App\Services\User;

use App\Contracts\Repository\UserRepositoryContract as UserRepository;
use Illuminate\Contracts\Routing\ResponseFactory as Response;
use Illuminate\Contracts\Validation\Factory as Validator;
use Illuminate\Validation\ValidationException;
use App\Exports\UsersExport;
use Excel;

class UserGenerateReportService
{
    private $repository;

    public function __construct(
        UserRepository $repository,
        Response $response
    ) {
        $this->repository = $repository;
        $this->response = $response;

    }

    public function generateWithResponse($filter)
    {
        $repository = $this->repository;

        try {
            $users = $repository->listsQuery($filter)->get();
            $filename = 'users-' . date('YmdHis') . '.xlsx';
            $file = Excel::store(new UsersExport($users['data']), $filename);

            return $this->response->success(['url' => asset( 'storage/' . $filename)]);

        } catch (ValidationException $e) {
            return $this->response->validateError($e->errors());
        }
    }
}
