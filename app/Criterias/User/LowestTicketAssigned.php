<?php

namespace App\Criterias\User;

use Prettus\Repository\Contracts\RepositoryInterface;
use Prettus\Repository\Contracts\CriteriaInterface;
use App\Models\User;

/**
 * Criteria for Ticket model.
 */
class LowestTicketAssigned implements CriteriaInterface
{
    public function apply($model, RepositoryInterface $repository)
    {
        return $model->withCount('assignedTickets')->orderBy('assigned_tickets_count', 'asc');
    }
}
