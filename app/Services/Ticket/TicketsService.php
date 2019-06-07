<?php

namespace App\Services\Ticket;

use App\Contracts\Repository\TicketRepositoryContract as TicketRepository;
use Illuminate\Contracts\Routing\ResponseFactory as Response;
use Illuminate\Contracts\Validation\Factory as Validator;
use Illuminate\Validation\ValidationException;

class TicketsService
{
    private $repository;

    public function __construct(
        TicketRepository $repository,
        Response $response
    ) {
        $this->repository = $repository;
        $this->response = $response;
    }

    public function getTickets($filter)
    {
        $this->setFieldsQuery($filter);
        $repository = $this->repository;

        if($this->hasField('order'))
        {
            $repository->orderBy($this->getField('order'));
        }

        return $repository->scopeQuery(function($query){
            $query = $query->orderBy('order','asc');

            if($this->hasField('search'))
            {
                $query = $query->generalSearch($this->getField('search'));   
            }
            
            return $query;
        });

    }

    public function listResponse($filter)
    {
        $limit = (isset($filter['limit']) ? $filter['limit'] : 20);
        $repository = $this->repository;

        try {
            $tickets = $repository->listsQuery($filter)->paginate($limit);

            return $this->response->success(['data' => $tickets]);

        } catch (ValidationException $e) {
            return $this->response->validateError($e->errors());
        }
    }
}
