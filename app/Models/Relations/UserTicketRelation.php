<?php
namespace App\Models\Relations;

/**
 * Relation trait for UserTicket Model
 */
trait UserTicketRelation
{

    public function ticket()
    {
        return $this->belongsTo('App\Models\Ticket', 'ticket_id');
    }


    public function assignee()
    {
        return $this->belongsTo('App\Models\User', 'user_id');
    }    
}