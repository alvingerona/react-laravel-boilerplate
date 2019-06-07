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

        $this->app->bind("App\Contracts\Repository\ProjectsRepositoryContract", "App\Repositories\Eloquent\ProjectsRepository");

        $this->app->bind("App\Contracts\Repository\ProjectCategoriesRepositoryContract", "App\Repositories\Eloquent\ProjectCategoriesRepository");

        $this->app->bind("App\Contracts\Repository\PrioritiesRepositoryContract", "App\Repositories\Eloquent\PrioritiesRepository");

        $this->app->bind("App\Contracts\Repository\TicketStatusesRepositoryContract", "App\Repositories\Eloquent\TicketStatusesRepository");

        $this->app->bind("App\Contracts\Repository\CommentRepositoryContract", "App\Repositories\Eloquent\CommentRepository");

        $this->app->bind("App\Contracts\Repository\FaqRepositoryContract", "App\Repositories\Eloquent\FaqRepository");

        $this->app->bind("App\Contracts\Repository\CommentNotificationRepository", "App\Repositories\Eloquent\CommentNotificationRepositoryEloquent");
    }
}
