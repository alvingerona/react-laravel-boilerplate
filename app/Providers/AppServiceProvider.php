<?php

namespace App\Providers;

use Illuminate\Support\Facades\Blade;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {

        /**
         * On some server there is an error of "Syntax error or access violation: 1071 Specified key was too long; max key length is 767 bytes"
         * ::defaultStringLength will fix this error on migrate.
         */
        Schema::defaultStringLength(191);

        Blade::if('env', function ($environment) {
            return app()->environment($environment);
        });    
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
