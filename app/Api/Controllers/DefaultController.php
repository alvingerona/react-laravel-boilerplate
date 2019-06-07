<?php

namespace App\Api\Controllers;

use App\Services\User\Avatar\CreateAvatarService;
use Illuminate\Http\Request;

use App\Services\DefaultTicketCreateService;

class DefaultController
{
    private $defaultTicketCreateService;

    public function __construct(
        DefaultTicketCreateService $defaultTicketCreateService
    )
    {
        $this->defaultTicketCreateService = $defaultTicketCreateService;
    }

    /**
     * default values for creating ticket create.
     */
    public function ticketCreate(Request $request)
    {
        return $this->defaultTicketCreateService->getResponse();
    }
}
