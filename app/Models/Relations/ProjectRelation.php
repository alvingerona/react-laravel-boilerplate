<?php
namespace App\Models\Relations;

/**
 * Relation trait for Project Model
 */
trait ProjectRelation
{
    public function categories()
    {
        return $this->hasMany('App\Models\ProjectCategory', 'proj_id');
    }

    public function tickets()
    {
        return $this->hasMany('App\Models\Ticket', 'proj_id');
    }    
}