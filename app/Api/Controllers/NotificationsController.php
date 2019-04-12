<?php

namespace App\Api\Controllers;

use App\Services\User\Avatar\CreateAvatarService;
use Illuminate\Http\Request;

use App\Services\User\NotificationsLatestService;
use App\Services\User\NotificationsMarkReadService;

class NotificationsController
{
    private $notificationService;
    private $notificationsMarkReadService;

    public function __construct(
        NotificationsLatestService $notificationService, 
        NotificationsMarkReadService $notificationsMarkReadService)
    {
        $this->notificationService = $notificationService;
        $this->notificationsMarkReadService = $notificationsMarkReadService;
    }

    public function latest(Request $request)
    {
        return $this->notificationService->notificationsLatestResponse();
    }
    
    public function markRead(Request $request)
    {
        return $this->notificationsMarkReadService->markRead($request->all());
    }
}
