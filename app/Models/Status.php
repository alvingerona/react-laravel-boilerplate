<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Scopes\StatusScope;
use App\Models\Relations\StatusRelation;
use App\Models\Attributors\StatusAttributor;

class Status extends Model
{
    use StatusScope, StatusRelation, StatusAttributor;

    protected $table = 'statuses';

    protected $fillable = [
        'name',
        'parent_id',
        'order',
        'on_board',
        'is_default',
        'color',
        'slug'
    ];

    public function generateSlug($slug)
    {
        if($this->parent)
        {
            $slug = $this->parent->slug . '.' . $slug;
        }

        $this->slug = $slug;
        $this->save();

        return $this;
    }
}