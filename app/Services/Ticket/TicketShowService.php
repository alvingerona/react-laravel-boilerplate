<?php

namespace App\Services\Ticket;

use App\Contracts\Repository\TicketRepositoryContract as TicketRepository;
use Illuminate\Contracts\Routing\ResponseFactory as Response;
use Illuminate\Contracts\Validation\Factory as Validator;
use Illuminate\Validation\ValidationException;

class TicketShowService
{
    private $repository;

    public function __construct(
        TicketRepository $repository,
        Response $response
    ) {
        $this->repository = $repository;
        $this->response = $response;
    }

    public function ticket($id)
    {
        try {
            $ticket = $this->repository->find($id);

            return $this->response->success(['data' => $ticket]);

        } catch (ValidationException $e) {
            return $this->response->validateError($e->errors());
        }
    }

}
