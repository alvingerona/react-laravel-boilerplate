<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{

    /**
     * Container resolvers for the application repositories.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(
            'App\Contracts\Repository\UserRepositoryContract',
            'App\Repositories\Eloquent\UserRepository'
        );

        $this->app->bind(
            'App\Contracts\Repository\RoleRepositoryContract',
            'App\Repositories\Eloquent\RoleRepository'
        );

        $this->app->bind(
            "App\Contracts\Repository\TicketRepositoryContract", "App\Repositories\Eloquent\TicketRepository"
        );
    }
}
