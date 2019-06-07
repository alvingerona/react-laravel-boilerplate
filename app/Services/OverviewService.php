<?php

namespace App\Services;

use Illuminate\Contracts\Routing\ResponseFactory as Response;
use Illuminate\Validation\ValidationException;

/**
 * Repository
 */
use App\Contracts\Repository\TicketRepositoryContract as TicketRepository;
use App\Contracts\Repository\TicketStatusesRepositoryContract as StatusesRepository;

/**
 * Services
 */
use App\Services\Comment\LatestCommentService;

class OverviewService
{
    private $response;
    private $ticketRepo;
    private $statusRepo;
    private $latestCommentService;

    public function __construct(
        Response $response,
        TicketRepository $ticketRepo,
        StatusesRepository $statusRepo,
        LatestCommentService $latestCommentService
    ) {
        $this->response = $response;
        $this->ticketRepo = $ticketRepo;
        $this->statusRepo = $statusRepo;
        $this->latestCommentService = $latestCommentService;
    }

    public function getResponse()
    {
        $openStatus = $this->statusRepo->skipPresenter()->onlyDefault();

        return $this->response->success([
            'new_comments' => $this->latestCommentService->count(),
            'open_tickets' => $this->ticketRepo->skipPresenter()->listsQuery(['status' => $openStatus->id])->all()->count()
        ]);
    }

}
