<?php

namespace App\Contracts\Repository;

use Prettus\Repository\Contracts\RepositoryInterface;

interface RoleRepositoryContract extends RepositoryInterface
{
    public function listOfRoles();
}
