<?php

namespace App\Services\Comment;

use App\Contracts\Repository\CommentRepositoryContract as CommentRepository;
use Illuminate\Contracts\Routing\ResponseFactory as Response;
use Illuminate\Contracts\Validation\Factory as Validator;
use Illuminate\Validation\ValidationException;
use App\Contracts\Repository\UserRepositoryContract as UserRepository;

/**
 * Rules
 */
use App\Rules\CanManageCommentRule;

class CommentDeleteService
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
        $currentUser = $this->userRepo->skipPresenter()->currentUser();

        return $this->validator->make($data, [
            'comment_id' => ['required', new CanManageCommentRule($currentUser, 'delete')]
        ]);
    }

    public function doDelete($data)
    {
        try {

            $validator = $this->validateData($data);

            if ($validator->fails()) 
            {
                throw new ValidationException($validator);
            }

            $this->repository->delete($data['comment_id']);

            return $this->response->success(['success' => true]);

        }catch (ValidationException $e) {
            return $this->response->validateError($e->errors());
        }
    }
}
