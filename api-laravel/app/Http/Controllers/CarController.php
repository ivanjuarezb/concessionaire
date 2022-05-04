<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Helpers\JwtAuth;
use App\Models\tblcars;
//use Illuminate\Contracts\Validation\Validator;
use Illuminate\Support\Facades\Validator;

class CarController extends Controller
{
    public function getCars(){
        $cars=tblcars::all()->load('user');
        $data=['status'=>'success','code'=>200,'cars'=>$cars];
        return response()->json($data,$data['code']);
    }
    public function postStore(Request $request){
        //Recoger token
        $hash=$request->header('Authorization',null);
        $jwtAuth=new JwtAuth();
        //Comprobar Token
        $checkToken=$jwtAuth->checkToken($hash);
        if($checkToken==true){
            //Recoger POST
            $json=$request->input('json',null);
            
            $params=json_decode($json);
            $params_array=json_decode($json,true);
            //Conseguir el usuario
            $user=$jwtAuth->checkToken($hash,true);
            //Validar parametros
            if(isset($params->title) && isset($params->description) && isset($params->status) && isset($params->price)){
                $validate=Validator::make($params_array,['title'=>'required','description'=>'required','status'=>'required','price'=>'required']);
                $errors=$validate->fails();
                if($errors==false){
                    //Guardar coche
                    $car=new tblcars();
                    $car->user_id=$user->sub;
                    $car->title=$params->title;
                    $car->description=$params->description;
                    $car->status=$params->status;
                    $car->price=$params->price; 
                    $car->save();
                    $data=['status'=>'success','code'=>200,'car'=>$car];
                }else{
                    $data=['status'=>'error','code'=>'400','message'=>$validate->errors()];
                }
            }else{
                $data=['status'=>'error','code'=>'400','message'=>'Send the post correctly'];
            }
            
        }else{
            $data=['status'=>'error','code'=>400,'message'=>'Incorret login'];
        }
        return response()->json($data,$data['code']);
        
    }
    public function getShow($id){
        $car=tblcars::find($id);
        if(!is_null($car) && is_object($car)){
            $car=tblcars::find($id)->load('user');
            $data=['status'=>'success','code'=>200,'car'=>$car];
        }else{
            $data=['status'=>'error','code'=>400,'message'=>"Car don't exist"];
        }
        return response()->json($data,$data['code']);
    }
    public function putUpdate($id,Request $request){
        //Recoger token
        $hash=$request->header('Authorization',null);
        $jwtAuth=new JwtAuth();
        //Comprobar Token
        $checkToken=$jwtAuth->checkToken($hash);
        if($checkToken==true){
            //Actualizar el coche
            $json=$request->input('json');
            $params=json_decode($json);
            $params_array=json_decode($json,true);
            if(isset($params) && !is_null($params) && is_object($params)){
                $validate=Validator::make($params_array,['title'=>'required','description'=>'required','status'=>'required','price'=>'required']);
                $fails=$validate->fails();
                if($fails==false){
                    $car=tblcars::where('id','=',$id)->update($params_array);
                    $data=['status'=>'success','code'=>200,'car'=>$params];
                }else{
                    $data=['status'=>'error','code'=>400,'message'=>$validate->errors()];
                }
            }else{
                $data=['status'=>'error','code'=>400,'message'=>'Send the data correctly by post'];
            }
        }else{
            $data=['status'=>'error','code'=>400,'message'=>'Incorret login'];
        }
        return response()->json($data,$data['code']);
    }
    public function deleteCar($id,Request $request){
        //Recoger token
        $hash=$request->header('Authorization',null);
        $jwtAuth=new JwtAuth();
        //Comprobar Token
        $checkToken=$jwtAuth->checkToken($hash);
        if($checkToken==true){
            //Comprobar que existe el registro
            $car=tblcars::find($id);
            if(!is_null($car)){
                //Borrarlo
                $car->delete();
                $data=['status'=>'success','code'=>200,'Car'=>$car];
            }else{
                $data=['status'=>'error','code'=>400,'message'=>'Car dont exists'];
            } 
        }else{
            $data=['status'=>'error','code'=>400,'message'=>'Incorret login'];
        }
        return response()->json($data,$data['code']);
    }
}
