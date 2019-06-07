<?php

namespace App\Services\User;

use App\Contracts\Repository\UserRepositoryContract as UserRepository;
use Illuminate\Contracts\Routing\ResponseFactory as Response;
use Illuminate\Contracts\Validation\Factory as Validator;
use Illuminate\Validation\ValidationException;
use App\Criterias\OnlyOwnUserCriteria;

class UpdateUserService
{
    private $validator;
    private $repository;
    private $user;

    public function __construct(
        Validator $validator,
        UserRepository $repository,
        Response $response
    ) {
        $this->repository = $repository;
        $this->response = $response;
        $this->validator = $validator;
    }

    public function makeUserUpdateValidator($data)
    {
        $id = isset($data['id']) ? $data['id'] : 0;

        return $this->validator->make($data, [
            'id' => 'required',
            'first_name' => 'required',
            'last_name' => 'required',
            'email' => 'email|unique:users,email,' . $id ,
            'role' => 'required'
        ]);
    }

    public function updateUserWithResponse($userData)
    {
        try {
            $updatedUser = $this->updateUser($userData);

            return $this->response->success(['data' => $updatedUser]);
        } catch (ValidationException $e) {
            return $this->response->validateError($e->errors());
        }
    }

    private function setupData($data)
    {
        $userData = [
            'first_name' => $data['first_name'],
            'last_name' => $data['last_name']
        ];
        $roleId = null;

        if(isset($data['password']) && trim($data['password']) != "")
        {
            $userData = $data['password'];
        }

        if(isset($data['email']) && $data['email'] && trim($data['email']) != "")
        {
            $userData['email'] = $data['email'];
        }

        if(isset($data['role']) && $data['role'])
        {
            $roleId = $data['role'];
        }

        return [
            'user_data' => $userData,
            'role_id' => $roleId,
            'id' => $data['id']
        ];
    }

    public function updateUser($userData)
    {
        $this->repository->popCriteria(OnlyOwnUserCriteria::class);
        
        $currentUser = $this->repository->find($userData['id'])['data'];

        $validator = $this->makeUserUpdateValidator($userData);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }

        $data = $this->setupData($userData);

        $this->repository->update($data['user_data'], $data['id']);

        if($data['role_id'])
        {
            $this->repository->updateRole($data['role_id'], $data['id']);
        }

        return $this->repository->findOne($data['id']);
    }
}
