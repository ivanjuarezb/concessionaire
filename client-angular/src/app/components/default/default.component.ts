import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css'],
  providers:[UserService, CarService]
})
export class DefaultComponent implements OnInit {
  private _router:Router;
  private _userService:UserService;
  private _carService:CarService;
  public user:User;
  public token:string;
  public identity:string;
  public carList:Array<Car>;
  public statusList:string;
  constructor(_router:Router, _userService:UserService, _carService:CarService){ 
    this.user=new User(1,"ROLE_USER","","","","",false);
    this._router=_router;
    this._userService=_userService;
    this._carService=_carService;
    this.identity=this._userService.getIdentity();
    this.token=this._userService.getToken();
    this.carList=[];
    this.statusList='';
  }
  ngOnInit(): void {
    console.log('default.component cargado correctamente');
    this._carService.getCars().subscribe(
      response=> {
        if(response.status=='success'){
          this.statusList='success';
          this.carList=response.cars;
        }
      },
      error=>{
        console.log(<any>error);
      }
    );
  }
}
