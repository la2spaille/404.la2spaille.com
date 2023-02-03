<?php
namespace App\Model;
use Engine\Model\Rest;

class Api
{
    const API_URL = "https://exemple.com";
    const AUTH_URL = "https://auth.exemple.com";
    private static  $rest;
    public static function init($rootUrl) {
        self::$rest = new Rest($rootUrl);

    }    

    // Generic getting function
    public static function get($endpoint='') {
        self::init(self::API_URL);
        return self::$rest->get($endpoint);
    }
    public static function get_someting() {
        return self::get('/somethings/to/get');
    }

    public static function post($endpoint='',$curlopt) {
        self::init(self::AUTH_URL);
        return self::$rest->post($endpoint,[],$curlopt);
    }


}
