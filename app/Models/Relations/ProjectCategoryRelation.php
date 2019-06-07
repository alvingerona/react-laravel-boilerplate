<?php
namespace App\Models\Relations;

/**
 * Relation trait for ProjectCategory Model
 */
trait ProjectCategoryRelation
{
    public function project()
    {
        return $this->belongsTo("App\Models\Project", "proj_id");
    }

    public function tickets()
    {
        return $this->hasMany('App\Models\Ticket', 'proj_category_id');
    }    
}