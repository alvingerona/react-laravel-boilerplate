<?php
namespace App\Models\Relations;

/**
 * Relation trait for Faq Model
 */
trait FaqRelation
{
    public function ticket()
    {
        return $this->belongsTo('App\Models\Ticket', 'ticket_id');
    }
}