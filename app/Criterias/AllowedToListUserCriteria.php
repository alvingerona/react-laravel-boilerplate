<?php

namespace App\Criterias;

use Prettus\Repository\Contracts\RepositoryInterface;
use Prettus\Repository\Contracts\CriteriaInterface;

class AllowedToListUserCriteria implements CriteriaInterface
{
    private $auth;

    public function apply($model, RepositoryInterface $repository)
    {
        $this->auth = resolve('Illuminate\Contracts\Auth\Factory');

        /**
         * TODO : add a query to determin if user role is allowed to 
         * list users.
         */

   //     $model = $model->where('id', '=', $this->auth->user()->id);

        return $model;
    }
}
