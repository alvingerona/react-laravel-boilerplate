<?php
namespace App\Models\Scopes;

/**
 * Scope trait for ProjectCategory Model
 */
trait ProjectCategoryScope
{
    public function scopeForName($query, $name)
    {
        return $query->where('name', $name);
    }

    public function scopeForProject($query, $projectId)
    {
        return $query->where('proj_id', $projectId);
    }
}