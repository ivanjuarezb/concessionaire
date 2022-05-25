import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car.service';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car'; 

@Component({
  selector: 'app-car-edit',
  templateUrl: './car-edit.component.html',
  styleUrls: ['./car-edit.component.css'],
  providers: [UserService,CarService]
})
export class CarEditComponent implements OnInit {
  private _carService:CarService;
  private _userService:UserService;
  private _router:Router;
  private _route:ActivatedRoute;
  public token:string;
  public carEdit:Car;
  public statusCar:string;
  constructor(_carService:CarService, _userService:UserService, _router:Router, _route:ActivatedRoute) { 
    this._carService=_carService;
    this._userService=_userService;
    this._router=_router;
    this._route=_route
    this.carEdit=new Car(0,'','',0,'','','');
    this.token=this._userService.getToken();
    this.statusCar="";
  }

  ngOnInit(): void {
    if(this.token==null){
      this._router.navigate(['/login']);
    }else{
      this._route.params.subscribe(
        params=>{
          let id:number = +params["id"];
          this.carEdit.id=id;
          if(id!=undefined && typeof(id)=="number"){
            this._carService.getCar(id).subscribe(
              response=>{
                if(response.status=='success'){
                  this.carEdit=response.car;
                }
              },
              error=>{
                console.log(<any>error);
                this._router.navigate(["/home"]);
              }
            );
          }
        }
      );
    }
  }
  onSubmit(){
    this._carService.update(this.token, this.carEdit, this.carEdit.id).subscribe(
      response=>{
        if(response.status=="success"){
          this.statusCar='success';
          this._router.navigate(['/home']);
        }
      },
      error=>{
        this.statusCar="error";
        console.log(<any>error);
      }
    );
  }
}
