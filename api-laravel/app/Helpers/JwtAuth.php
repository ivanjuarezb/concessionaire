<?php
namespace App\Helpers;
use firebase\JWT\JWT;
use Illuminate\Support\Facades\DB;
use App\Models\tblusers;
use Exception;

class JwtAuth{
    public $key;
    public function __construc(){
        $this->key='123456789';
    }
    public function signup($email,$password,$getToken=null){
        $user=tblusers::where('email','=',$email)->where('password','=',$password)->first();
        if(is_object($user)){
            //Generar token
            $token=['sub'=>$user->id,
                    'email'=>$user->email,
                    'name'=>$user->name,
                    'surname'=>$user->surname,
                    'iat'=>time(),
                    'exp'=>time() + (7*24*60*60)
            ];
            $jwt=JWT::encode($token,$this->key,'HS256');
            $decode=JWT::decode($jwt,$this->key,['HS256']);
            if(!is_null($getToken)){
                return $jwt;
            }else{
                return $decode;
            }
        }else{
            //Devolver error
            return ['status'=>'error','messagge'=>'Login is failed'];
        }
    }
    public function checkToken($jwt, $getIdentity=false){
        $auth=false;
        try{
            $decoded=JWT::decode($jwt,$this->key,['HS256']);
        }catch(\UnexpectedValueException $e){
            $auth=false;
        }catch(\DomainException $e){
            $auth=false;
        }
        if(is_object($decoded) && isset($decoded)){
            $auth=true;
        }else{
            $auth=false;
        }
        if($getIdentity==true){
            return $decoded;
        }
        return $auth;
    }
}