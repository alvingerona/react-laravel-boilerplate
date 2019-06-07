<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Scopes\ProjectScope;
use App\Models\Relations\ProjectRelation;
use App\Models\Attributors\ProjectAttributor;

class Project extends Model
{
    use ProjectScope, ProjectRelation, ProjectAttributor;

    protected $table = 'projects';

    protected $fillable = [
        'name',
        'key'
    ];
}