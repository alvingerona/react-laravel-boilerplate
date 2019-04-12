<?php

namespace App\Services\User;

use App\Contracts\Repository\UserRepositoryContract as UserRepository;
use Illuminate\Contracts\Routing\ResponseFactory as Response;

class NotificationsLatestService
{
    private $response;
    private $user;

    public function __construct(
        UserRepository $user,
        Response $response
    ) {
        $this->user = $user;
        $this->response = $response;
    }

    public function notificationsLatestResponse()
    {
        try {
            $user = $this->user->skipPresenter()->currentUser();
            $notifications =  $user->notifications()->orderBy('created_at', 'desc')->paginate();
            
            return $this->response->success([
                'unread_count' => $user->unreadNotifications->count(),
                'data' => $notifications
            ]);
        } catch (ValidationException $e) {
            return $this->response->validateError($e->errors());
        }
    }
}