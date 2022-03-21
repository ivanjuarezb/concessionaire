<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\tblusers;
use App\Helpers\JwtAuth;

class UserController extends Controller
{
    public function postRegister(Request $request){
        //Recoger POST
        $json=$request->input('json', null);
        $params=json_decode($json);
        $email=(!is_null($json) && isset($params->email)) ? $params->email : null;
        $name=(!is_null($json) && isset($params->name)) ? $params->name : null;
        $surname=(!is_null($json) && isset($params->surname)) ? $params->surname : null;
        $role='ROLE_USER';
        $password=(!is_null($json) && isset($params->password)) ? $params->password : null;
        if(!is_null($email) && !is_null($password) && !is_null($name)){
            //Crear usuario
            $pwd=hash('sha256',$password);
            $user=new tblusers();
            $user->email=$email;
            $user->password=$pwd;
            $user->name=$name;
            $user->surname=$surname;
            $user->role=$role;
            //Comprobar usuario duplicado
            $isset_user = tblusers::where('email','=',$email)->first();
            if(is_null($isset_user)){
                //Guardar usuario
                $user->save();
                $data=['status'=>'success','code'=>200,'message'=>'Created user'];
            }else{
                //Usuario duplicado
                $data=['status'=>'error','code'=>400,'message'=>'Duplicate user'];
            }
        }else{
            $data=['status'=>'error','code'=>400,'message'=>'User not created'];
        }
        return response()->json($data,$data['code']);
    }
    public function postLogin(Request $request){
        $jwtAuth=new JwtAuth();
        //Recibir POST
        $json=$request->input('json',null);
        $params=json_decode($json);
        $email=(!is_null($json) && isset($params->email) ? $params->email : null);
        $password=(!is_null($json) && isset($params->password) ? $params->password : null);
        $getToken=(!is_null($json) && isset($params->getToken) ? $params->getToken : null);
        //Cifrar contraseña
        $pwd=hash('sha256',$password);
        if(!is_null($email) && !is_null($password) && $getToken != 'true'){
            $signup=$jwtAuth->signup($email,$pwd);
        }elseif(!is_null($email) && !is_null($password) && $getToken == 'true'){
            $signup=$jwtAuth->signup($email,$pwd,true);
        }else{
            $signup=['status'=>'error','code'=>400,'message'=>'Send your data by POST'];
        }
        return response()->json($signup);
    }
}
