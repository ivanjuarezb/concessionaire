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
        this.url="http://concessionaire.devel/";
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
    update(token:string, car:Car, id:number):Observable<any>{
        let params:string="json="+JSON.stringify(car);
        let headers:HttpHeaders=new HttpHeaders().set("Authorization", token).set("content-type", "application/x-www-form-urlencoded");
        return this._http.put(this.url+"update/"+id,params,{headers:headers});
    }
    delete(token:string, id:number):Observable<any>{
        let headers:HttpHeaders=new HttpHeaders().set("Authorization", token).set("content-type", "application/x-www-form-urlencoded");
        return this._http.delete(this.url+"delete/"+id,{headers:headers});
    }

}

