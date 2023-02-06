<?php

namespace App\Config;

class Head {

    public static function data () {
        $head['urlBase'] = 'https://www.404-la2spaille.myhostme.space'; // Desktop version only with protocol
        $head['serverName'] = 'www.404-la2spaille.myhostme.space'; // Desktop or mobile without protocol

        $head['twitter']['pseudo']  = '@la2spaille';
        $head['twitter']['creator'] = '@la2spaille';

        return $head;
    }

}