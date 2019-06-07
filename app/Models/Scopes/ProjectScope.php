<?php
namespace App\Models\Scopes;

/**
 * Scope trait for Project Model
 */
trait ProjectScope
{
    public function scopeForKey($query, $key)
    {
        return $query->where("key", $key);
    }   
}