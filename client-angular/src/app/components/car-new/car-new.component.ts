import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Car } from 'src/app/models/car';
import { Router } from '@angular/router';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-new',
  templateUrl: './car-new.component.html',
  styleUrls: ['./car-new.component.css'],
  providers: [UserService, CarService]
})
export class CarNewComponent implements OnInit {
  
  private _router:Router;
  private _userService:UserService;
  private _carService:CarService;
  public pageTitle:string;
  public identity:string;
  public token:string;
  public car:Car;
  public status_car:string;
  

  constructor(_carService:CarService, _userService:UserService, _router:Router){
    this._userService=_userService;
    this._carService=_carService;
    this._router=_router;
    this.pageTitle="Crear nuevo coche";
    this.identity=this._userService.getIdentity();
    this.token=this._userService.getToken();
    this.car=new Car(0,'','',0,'',null,null);
    this.status_car='';
  }

  ngOnInit(): void {
    if(this.identity == null){
      this._router.navigate(["/login"]);
    }
  }
  onSubmit(){
    this._carService.create(this.car,this.token).subscribe(
      response=>{
        console.log(response);
        if(response.status=="success"){
          this.car=response.car;
          this.status_car='success';
          this._router.navigate(['/home']);
        }
      },
      error=>{
        console.log(<any>error);
        this.status_car='error';
      }
    );
  }

}
