<?php

namespace App\Core;


class Constant {

    public static function init () {
        $root = substr($_SERVER['DOCUMENT_ROOT'], 0, -6);
        define('ROOT', $root);

        $protocol = "http";
        define('PROTOCOL',$protocol);

        $host = $_SERVER['HTTP_HOST'];
        define('HOST',$host);

        $url = PROTOCOL . "://" . HOST;
        define('URL',$url);



    }

}
