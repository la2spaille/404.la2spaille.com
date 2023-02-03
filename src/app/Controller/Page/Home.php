<?php

namespace App\Controller\Page;

use App\Model\Api;
use \Engine\Controller\Controller;

class Home extends Controller
{

    public function show()
    {

        /*------------------------------------
            DATA
        ------------------------------------*/

        $this->data->title = "Home";

        /*------------------------------------
            HEAD
        ------------------------------------*/

        // SEO
        $this->head['title'] = 'Error — 404 Not Found';
        $this->head['description'] = "concours #4 : Créer et coder une page 404";
        $this->head['opengraph'] = '/og/index.png';

        // Robots
        $this->head['allow-robots'] = true;

        /*------------------------------------
            RENDER
        ------------------------------------*/

        return $this->render('home');
    }

}
