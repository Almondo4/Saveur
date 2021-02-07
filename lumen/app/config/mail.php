<?php

return [

    'driver' => env('MAIL_DRIVER','smtp'),
    'host' => env('MAIL_HOST'),
    'port' => env('MAIL_PORT'),
    'from' => [
        'address' => env('emaple@test.gg'),
        'name' => env('Stranger'),
    ],
    'encryption' => env('MAIL_ENCRYPTION'),
    'username' => env('MAIL_USERNAME'),
    'password' => env('MAIL_PASSWORD'),
    'markdown' => [
        'theme' => 'default',
        'paths' => [
            resource_path('views/vendor/mail'),
        ],
    ],
    "sendmail" => "/usr/sbin/sendmail -bs",
    "pretend" => false,
    'steam' =>[
        'ssl' =>[
            'allow_self_signed' => true,
            'verify_peer' =>false,
            'verify_peer_name' =>false,
        ]
    ]
];