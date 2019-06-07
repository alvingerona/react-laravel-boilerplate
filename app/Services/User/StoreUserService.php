<?php

namespace App\Services\User;

use App\Contracts\Repository\UserRepositoryContract as UserRepository;
use Illuminate\Contracts\Routing\ResponseFactory as Response;
use Illuminate\Contracts\Validation\Factory as Validator;
use Illuminate\Validation\ValidationException;
use App\Notifications\SignupWelcome;

class StoreUserService
{
    private $validator;
    private $response;
    private $user;

    public function __construct(
        Validator $validator,
        UserRepository $user,
        Response $response
    ) {
        $this->user = $user;
        $this->response = $response;
        $this->validator = $validator;
    }

    public function validateData($data)
    {
        return $this->validator->make($data, [
            'first_name' => 'required',
            'last_name' => 'required',
            'email' => 'required|email|unique:users,email',
            'password' => 'required',
            'role' => 'required'
        ]);
    }

    public function storeUserWithResponse($userInfo)
    {
        try {
            $storedUser = $this->storeUser($userInfo);

            return $this->response->success(['data' => $storedUser]);
        } catch (ValidationException $e) {
            return $this->response->validateError($e->errors());
        }
    }


    private function setupData($data)
    {
        $userData = [
            'first_name' => $data['first_name'],
            'last_name' => $data['last_name'],
            'email' => $data['email']
        ];
        $roleId = null;

        if(isset($data['password']) && trim($data['password']) != "")
        {
            $userData = $data['password'];
        }

        if(isset($data['role']) && $data['role'])
        {
            $roleId = $data['role'];
        }

        return [
            'user_data' => $userData,
            'role_id' => $roleId
        ];
    }    

    public function storeUser($userInfo)
    {
        $validator = $this->validateData($userInfo);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }

        $data = $this->setupData($userInfo);

        $user = $this->user->create($userInfo);

        $this->user->updateRole($data['role_id'], $user['data']['id']);

        $this->user->findOne($user['data']['id'])->notify(new SignupWelcome());

        return $user;
    }
}
