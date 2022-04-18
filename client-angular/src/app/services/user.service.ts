import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable()
export class UserService{
    public url:string;
    public _http:HttpClient;
    public identity:any;
    public token:any;
    constructor(_http:HttpClient){
        this._http=_http;
        this.url='http://concessionaire.devel/api-laravel/public/';
    }
    pruebas(){
        return "Hello world";
    }
    register(user:User):Observable<any>{
        let json:string='json='+JSON.stringify(user);
        let headers:HttpHeaders=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
        return this._http.post(this.url+'register',json,{headers:headers});
    }
    signUp(user:User,getToken:boolean=false):Observable<any>{
        let json:string="json="+JSON.stringify(user);
        let headers:HttpHeaders=new HttpHeaders().set("content-type",'application/x-www-form-urlencoded');
        return this._http.post(this.url+'login',json,{headers:headers});
    }
    getIdentity(){
        let identity:any= localStorage.getItem('identity');
        if(identity!='undefined'){
            this.identity=identity;
        }else{
            this.identity=null;
        }
        return this.identity;
    }
    getToken(){
        let token:any= localStorage.getItem('token');
        if(token!='undefined'){
            this.token=token;
        }else{
            this.token=null;
        }
        return this.token;
    }
}