<?php

namespace App\Services\Ticket;

use App\Contracts\Repository\TicketRepositoryContract as TicketRepository;
use Illuminate\Contracts\Routing\ResponseFactory as Response;
use Illuminate\Contracts\Validation\Factory as Validator;
use Illuminate\Validation\ValidationException;
use App\Exports\TicketsExport;
use Excel;

class TicketGenerateReportService
{
    private $repository;

    public function __construct(
        TicketRepository $repository,
        Response $response
    ) {
        $this->repository = $repository;
        $this->response = $response;

    }

    public function generateWithResponse($filter)
    {
        $repository = $this->repository;

        try {
            $tickets = $repository->listsQuery($filter)->get();
            $filename = 'tickets-' . date('YmdHis') . '.xlsx';
            $file = Excel::store(new TicketsExport($tickets['data']), $filename);

            return $this->response->success(['url' => asset( 'storage/' . $filename)]);

        } catch (ValidationException $e) {
            return $this->response->validateError($e->errors());
        }
    }
}
