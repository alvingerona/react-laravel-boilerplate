<?php

namespace App\Services\Comment;

use Illuminate\Validation\ValidationException;
use App\Contracts\Repository\UserRepositoryContract as UserRepository;
use App\Contracts\Repository\CommentNotificationRepository;
use Illuminate\Contracts\Routing\ResponseFactory as Response;

class LatestCommentService
{
    private $response;
    private $user;
    private $commentNotificationRepo;

    public function __construct(
        UserRepository $user,
        Response $response,
        CommentNotificationRepository $commentNotificationRepo
    ) {
        $this->user = $user;
        $this->response = $response;
        $this->commentNotificationRepo = $commentNotificationRepo;
    }

    private function base()
    {
        $user = $this->user->skipPresenter()->currentUser();
        return $user->unreadNotifications()
            ->where('type', 'App\\Notifications\\CommentStore')
            ->orderBy('created_at', 'desc');
    }

    public function count()
    {
        return $this->base()->count();
    }

    public function getWithResponse()
    {
        $user = $this->user->skipPresenter()->currentUser();
    
        try {
            return $this->response->success([ 'data' =>  $this->commentNotificationRepo->forUser($user) ]);
        }catch (ValidationException $e) {
            return $this->response->validateError($e->errors());
        }
    }
}