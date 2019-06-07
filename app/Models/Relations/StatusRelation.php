<?php
namespace App\Models\Relations;

/**
 * Relation trait for Status Model
 */
trait StatusRelation
{
    public function children()
    {
        return $this->hasMany('App\Models\Status', 'parent_id');
    }

    public function parent()
    {
        return $this->belongsTo('App\Models\Status', 'parent_id');
    }    
}