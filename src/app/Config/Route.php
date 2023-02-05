<?php

namespace App\Config;

use App\Model\Api;
use \Engine\Router\Router;

class Route
{
    public static function init()
    {
        Router::init();
        Router::get('/', 'Home#show');

        Router::p404('show');
        Router::run();



    }

}
