<?php
namespace App\Models\Scopes;

/**
 * Scope trait for User Model
 */
trait UserScope
{
    public function scopeForTicketWatchers($query, $ticketId)
    {
        return $query->where(function($query) use($ticketId){
            /**
             * The user created the ticket
             */
            $query->whereHas('reportedTickets', function($query) use($ticketId){
                $query->where('id', $ticketId);
            });

            /**
             * The ticket current assignee
             */
            $query->orWhereHas('assignedTickets', function($query) use($ticketId){
                $query->where('ticket_id', $ticketId);
            });

            /**
             * User posted comment
             */
            $query->orWhereHas('ticketComments', function($query) use($ticketId){
                $query->where('ticket_id', $ticketId);
            });

            /**
             * For admin
             */            
            $query->orWhereHas('roles', function($query){
                $query->where('roles.name', self::ROLE_ADMIN);
            });
        });
    }        
}