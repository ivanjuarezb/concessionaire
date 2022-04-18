import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router,ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css'],
  providers:[UserService]
})
export class DefaultComponent implements OnInit {
  private _route:ActivatedRoute;
  private _router:Router;
  private _userService:UserService;
  public user:User;
  public token:string;
  public identity:string;
  constructor(_router:Router, _route:ActivatedRoute,_userService:UserService){ 
    this.user=new User(1,"ROLE_USER","","","","",false);
    this._route=_route;
    this._router=_router;
    this._userService=_userService;
    this.token="";
    this.identity="";
  }
  ngOnInit(): void {
    console.log('default.component cargado correctamente');
    let user=this._userService.getIdentity();
    console.log(user);
  }
}
