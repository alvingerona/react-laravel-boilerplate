<?php

namespace App\Services\User;

use App\Contracts\Repository\UserRepositoryContract as UserRepository;
use Illuminate\Contracts\Routing\ResponseFactory as Response;
use Illuminate\Contracts\Validation\Factory as Validator;
use Illuminate\Validation\ValidationException;

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
            'password' => 'required'
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

    public function storeUser($userInfo)
    {
        $validator = $this->validateData($userInfo);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }

        return $this->user->create($userInfo);
    }
}
