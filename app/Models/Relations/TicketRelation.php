<?php
namespace App\Models\Relations;

/**
 * Relation trait for Ticket Model
 */
trait TicketRelation
{
    public function project()
    {
        return $this->belongsTo("App\Models\Project", "proj_id");
    }

    public function category()
    {
        return $this->belongsTo('App\Models\ProjectCategory', 'proj_category_id');
    }

    public function reporter()
    {
        return $this->belongsTo('App\Models\User', 'reporter_id', 'id');
    }

    public function assignee()
    {
        return $this->hasManyThrough(
            'App\Models\User', 
            'App\Models\UserTicket', 
            'ticket_id', 
            'id',
            'id',
            'user_id'
        );        
    }

    public function priorityType()
    {
        return $this->belongsTo('App\Models\PriorityType', 'priority_type_id', 'id');
    }

    public function status()
    {
        return $this->belongsTo('App\Models\Status', 'status_id', 'id');
    }

    public function orig()
    {
        return $this->belongsTo('App\Models\Ticket', 'duplicate_of', 'id');        
    }

    public function comments()
    {
        return $this->hasMany('App\Models\Comment', 'ticket_id', 'id');
    }
}