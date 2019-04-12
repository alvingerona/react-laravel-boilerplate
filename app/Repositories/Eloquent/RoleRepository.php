<?php

namespace App\Repositories\Eloquent;

use App\Models\Role;
use App\Presenters\RolePresenter;
use Prettus\Repository\Eloquent\BaseRepository;
use App\Contracts\Repository\RoleRepositoryContract;

class RoleRepository extends BaseRepository implements RoleRepositoryContract
{
    public function boot()
    {
    
    }

    public function model()
    {
        return Role::class;
    }

    public function presenter()
    {
        return RolePresenter::class;
    }

    public function listOfRoles()
    {   
        return $this->all();        
    }
}
