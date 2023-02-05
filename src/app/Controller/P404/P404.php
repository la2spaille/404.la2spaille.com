<?php

namespace App\Controller\P404;

use App\Core\RedirectTo;
use \Engine\Controller\Controller;

class P404 extends Controller {

    public function show ()
    {

        /*------------------------------------
            HEAD
        ------------------------------------*/

        $this->head['title'] = 'Error — 404 Not Found but really';

        /*------------------------------------
            RENDER ERROR
        ------------------------------------*/

        RedirectTo::home();
    }
}
