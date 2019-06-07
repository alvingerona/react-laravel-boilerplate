<?php

namespace App\Services;

use App\Contracts\Repository\PrioritiesRepositoryContract as PrioritiesRepository;
use Illuminate\Contracts\Routing\ResponseFactory as Response;
use Illuminate\Validation\ValidationException;

class DefaultTicketCreateService
{
    private $priority;
    private $response;

    public function __construct(
        PrioritiesRepository $priority,
        Response $response
    ) {
        $this->response = $response;
        $this->priority = $priority;
    }

    public function getResponse()
    {
        $priority = $this->priority->onlyDefault();

        return $this->response->success([
            'priority' => $priority['data']['id']
        ]);
    }

}
