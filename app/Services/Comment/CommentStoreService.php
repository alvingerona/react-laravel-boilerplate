<?php

namespace App\Services\Comment;

use App\Contracts\Repository\CommentRepositoryContract as CommentRepository;
use Illuminate\Contracts\Routing\ResponseFactory as Response;
use Illuminate\Contracts\Validation\Factory as Validator;
use Illuminate\Validation\ValidationException;
use App\Contracts\Repository\UserRepositoryContract as UserRepository;
use App\Notifications\CommentStore;

class CommentStoreService
{
    private $validator;
    private $repository;
    private $response;

    private $userRepo;

    public function __construct(
        CommentRepository $repository,
        Response $response,
        Validator $validator,

        UserRepository $userRepo
    ) {
        $this->repository = $repository;
        $this->response = $response;
        $this->validator = $validator;
        $this->userRepo = $userRepo;
    }

    public function validateData($data)
    {
        return $this->validator->make($data, [
            'ticket_id' => 'required',
            'contents' => 'required'
        ]);
    }

    public function doStore($data)
    {
        try {

            $validator = $this->validateData($data);

            if ($validator->fails()) 
            {
                throw new ValidationException($validator);
            }

            $currentUser = $this->userRepo->skipPresenter()->currentUser();
            $data['posted_by'] = $currentUser->id;
            $comment = $this->repository->skipPresenter()->create($data);
            /**
             * List of users that will receive notifications.
             */
            $users = $this->userRepo->ticketWatchers($comment->ticket_id)
                ->filter(function($user) use($currentUser){
                    return $currentUser->id != $user->id;
                });

            $users->each(function($user) use($comment){
                $user->notify(new CommentStore($comment));
            });

            return $this->response->success(['data' => $comment]);

        }catch (ValidationException $e) {
            return $this->response->validateError($e->errors());
        }
    }
}
