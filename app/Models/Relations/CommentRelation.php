<?php
namespace App\Models\Relations;

/**
 * Relation trait for Comment Model
 */
trait CommentRelation
{
    public function postedBy()
    {
        return $this->belongsTo('App\Models\User', 'posted_by', 'id');
    }

    public function ticket()
    {
        return $this->belongsTo('App\Models\Ticket', 'ticket_id', 'id');
    }
}