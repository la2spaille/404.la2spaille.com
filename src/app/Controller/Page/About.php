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
        $this->data->body = Api::get();

        /*------------------------------------
            HEAD
        ------------------------------------*/

        // SEO
        $this->head['title'] = 'About – La2spaille 🇨🇲';
        $this->head['description'] = "La2spaille's boilerplate";
        $this->head['opengraph'] = '/og/index.png';

        // Robots
        $this->head['allow-robots'] = true;

        /*------------------------------------
            RENDER
        ------------------------------------*/

        return $this->render('about');
    }

}