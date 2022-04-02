import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable()
export class UserService{
    public url:string;
    public _http:HttpClient;
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
}