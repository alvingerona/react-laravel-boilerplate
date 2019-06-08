<?php

namespace App\Services;

use Illuminate\Contracts\Routing\ResponseFactory as Response;
use Illuminate\Validation\ValidationException;

/**
 * Services
 */
use App\Services\Comment\LatestCommentService;

class OverviewService
{
    private $response;

    public function __construct(
        Response $response
    ) {
        $this->response = $response;
    }

    public function getResponse()
    {
        return $this->response->success([
            'new_comments' => 10,
            'open_tickets' => 100
        ]);
    }

}
