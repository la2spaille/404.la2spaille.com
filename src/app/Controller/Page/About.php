<?php

namespace App\Controller\Page;

use App\Model\Api;
use Engine\Controller\Controller;

class About extends Controller
{
    public function show()
    {

        /*------------------------------------
            DATA
        ------------------------------------*/

        $this->data->title = 'About';

        /*------------------------------------
            HEAD
        ------------------------------------*/

        // SEO
        $this->head['title'] = 'About | Error — 404 Not Found';
        $this->head['description'] = "concours #4 : Créer et coder une page 404";
        $this->head['opengraph'] = '/og/index.png';

        // Robots
        $this->head['allow-robots'] = true;

        /*------------------------------------
            RENDER
        ------------------------------------*/

        return $this->render('about');
    }

}