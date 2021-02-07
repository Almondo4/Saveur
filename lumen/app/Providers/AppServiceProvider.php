<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */

    public function register()
    {
        $this->app->configure('services');

        $this->app->singleton('mailer', function ($app) {
            return $app->loadComponent('mail', 'Illuminate\Mail\MailServiceProvider', 'mailer');
        });

        $this->app->alias('mailer', \Illuminate\Contracts\Mail\Mailer::class);
        //
        $this->app->make('queue');
        //

        $this->app->bind('Illuminate\Contracts\Translation\Translator', function ($app) {
            return $app['translator'];
        });

    }

}
