<?php

namespace App\Criterias;

use Prettus\Repository\Contracts\RepositoryInterface;
use Prettus\Repository\Contracts\CriteriaInterface;
use App\Models\User;

/**
 * Criteria for Ticket model.
 */
class AllowedTIcketsCriteria implements CriteriaInterface
{
    private $auth;

    public function apply($model, RepositoryInterface $repository)
    {
        $this->auth = resolve('Illuminate\Contracts\Auth\Factory');
        $user = $this->auth->user();

        /**
         * - Client allowed only to fetch their created tickets.
         * - Support and admin allowed to fetch all tickets
         */
        if($user->hasRole(User::ROLE_SUPPORT) || $user->hasRole(User::ROLE_ADMIN))
        {

        }else
        {
           $model = $model->forWatcher($user->id);
        }

        return $model;
    }
}
