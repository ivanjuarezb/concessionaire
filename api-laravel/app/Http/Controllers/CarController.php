<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Helpers\JwtAuth;

class CarController extends Controller
{
    public function getCars(Request $request){
        //Recoger token
        $hash=$request->header('Authorization',null);
        $jwtAuth=new JwtAuth();
        //Comprobar Token
        $checkToken=$jwtAuth->checkToken($hash);
        if($checkToken==true){
            echo 'Method getCars CarController AUTHENTICATED';
            die();
        }else{
            echo 'Method getCars CarController NO AUTHENTICATED';
            die();
        }
    }
}
