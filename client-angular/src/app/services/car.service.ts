import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Car } from "../models/car";

@Injectable()
export class CarService {
    private _http:HttpClient;
    public url:string;
    constructor(_http:HttpClient){
        this._http=_http;
        this.url="http://concessionaire.devel/api-laravel/public/";
    }
    pruebas():string{
        return "Prueba car.service.ts";
    }
    create(car:Car,token:string):Observable<any>{
        let params:string="json="+JSON.stringify(car);
        let headers:HttpHeaders=new HttpHeaders().set("content-type","application/x-www-form-urlencoded").set("Authorization",token);
        return this._http.post(this.url+"store",params,{headers:headers});
    }
    getCars():Observable<any>{ 
        return this._http.get(this.url+"cars");
    }
    getCar(id:number):Observable<any>{
        return this._http.get(this.url+"show/"+id);
    }

}

