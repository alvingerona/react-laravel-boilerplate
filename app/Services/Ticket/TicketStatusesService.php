<?php

namespace App\Services\Ticket;

use App\Contracts\Repository\TicketStatusesRepositoryContract as Repository;
use Illuminate\Contracts\Routing\ResponseFactory as Response;
use Illuminate\Contracts\Validation\Factory as Validator;
use Illuminate\Validation\ValidationException;

use App\Criterias\TicketStatus\WithChildCriteria;

class TicketStatusesService
{
    private $repository;

    public function __construct(
        Repository $repository,
        Response $response
    ) {
        $this->repository = $repository;
        $this->response = $response;
    }

    public function listResponse($filter)
    {
        $data = $this->repository->pushCriteria(WithChildCriteria::class)->all();

        return $this->response->success(['data' => $data]);
    }

}
