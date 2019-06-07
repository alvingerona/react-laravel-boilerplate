<?php

namespace App\Services\Comment;

use App\Contracts\Repository\CommentRepositoryContract as CommentRepository;
use Illuminate\Contracts\Routing\ResponseFactory as Response;
use Illuminate\Contracts\Validation\Factory as Validator;
use Illuminate\Validation\ValidationException;

class CommentsService
{
    private $validator;
    private $repository;
    private $response;

    public function __construct(
        CommentRepository $repository,
        Response $response,
        Validator $validator
    ) {
        $this->repository = $repository;
        $this->response = $response;
        $this->validator = $validator;
    }

    public function filterWithResponse($ticketId)
    {
        try {
            $comments = $this->repository->filterByTicketId($ticketId);

            return $this->response->success(['data' => $comments]);

        }catch (ValidationException $e) {
            return $this->response->validateError($e->errors());
        }
    }
}
