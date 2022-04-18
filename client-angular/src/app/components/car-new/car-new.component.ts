import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { Car } from 'src/app/models/car';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-car-new',
  templateUrl: './car-new.component.html',
  styleUrls: ['./car-new.component.css'],
  providers: [UserService]
})
export class CarNewComponent implements OnInit {
  private _route:ActivatedRoute;
  private _router:Router;
  private _userService:UserService;
  public pageTitle:string;
  public identity:string;
  public token:string;
  public car:Car;

  constructor(_userService:UserService, _route:ActivatedRoute, _router:Router){
    this._userService=_userService;
    this._route=_route;
    this._router=_router;
    this.pageTitle="Crear nuevo coche";
    this.identity=this._userService.getIdentity();
    this.token=this._userService.getToken();
    this.car=new Car(0,'','',0,'',null,null);
  }

  ngOnInit(): void {
    if(this.identity == null){
      this._router.navigate(["/login"]);
    }
  }

}
