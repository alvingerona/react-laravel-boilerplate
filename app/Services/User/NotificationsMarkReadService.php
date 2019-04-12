<?php

namespace App\Services\User;

use App\Contracts\Repository\UserRepositoryContract as UserRepository;
use Illuminate\Contracts\Routing\ResponseFactory as Response;
use Illuminate\Contracts\Validation\Factory as Validator;
use App\Exceptions\PasswordMismatchException;
use Illuminate\Validation\ValidationException;
use Illuminate\Contracts\Hashing\Hasher;

class NotificationsMarkReadService
{
    private $response;
    private $validator;
    private $hasher;
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

    /**
     * TODO: add validation to make sure ids is belong to current user login.
     */
    public function makeValidator($data)
    {
        return $this->validator->make($data, [
            'ids'      => 'required'
        ]);
    }

    public function markRead($data)
    {
        $validator = $this->makeValidator($data);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }

        $notes = $this->user->skipPresenter()->currentUser()->notifications()->whereIn('id', $data['ids'])->get();

        $notes->each(function($note){
            $note->markAsRead();
        });
    }
}
