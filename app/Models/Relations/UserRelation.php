<?php
namespace App\Models\Relations;

/**
 * Relation trait for User Model
 */
trait UserRelation
{
    public function reportedTickets()
    {
        return $this->hasMany('App\Models\Ticket', 'reporter_id');
    }

    public function assignedTickets()
    {
        return $this->hasManyThrough(
            'App\Models\Ticket', 
            'App\Models\UserTicket', 
            'user_id', 
            'id',
            'id',
            'ticket_id'
        );
    }

    public function ticketComments()
    {
        return $this->hasMany('App\Models\Comment', 'posted_by');
    }
}