<?php

namespace App\Controller\Page;

use Engine\Controller\Controller;
use Engine\Router\Router;

class Brain extends Controller
{
    public function show()
    {
        if(!isset($_GET['xhr']) ) {
            return $this->renderError();
        }
        $routes = Router::getRoutes();
        $routes = $routes['GET'];
        $xhr = [];
        foreach ($routes as $route) {
            if ($route->getPath() != '/brain') {
                $path = $route->getPath();
                $xhr['routes'][$path] = $route->getController();
                $xhr['cache'][$path] = $route->get_controller();
            }

        }
        header("Content-Type: application/json");
        print (json_encode($xhr));
    }
}



















