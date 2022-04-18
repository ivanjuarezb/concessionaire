import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[UserService]
})
export class LoginComponent implements OnInit {
  private _route:ActivatedRoute;
  private _router:Router;
  private _userService:UserService;
  public user:User;
  public token:string;
  public identity:string;
  public status:string;
  constructor(_router:Router, _route:ActivatedRoute,_userService:UserService){ 
    this.user=new User(1,"ROLE_USER","","","","",false);
    this._route=_route;
    this._router=_router;
    this._userService=_userService;
    this.token="";
    this.identity="";
    this.status="";
  }

  ngOnInit(): void {
    console.log('login.component cargado correctamente');
    this.logout();
  }
  onSubmit(loginForm:any){
    this._userService.signUp(this.user).subscribe(
      response=>{
        //token
        if(response.status!='error'){
          this.status='success';
          this.token=response;
          localStorage.setItem('token',this.token);
          //Objeto del usuario identificado
          this.user.getToken=true;
          this._userService.signUp(this.user).subscribe(
            response=>{
              this.identity=response;
              localStorage.setItem('identity',JSON.stringify(this.identity));
              //Redireccion
              this._router.navigate(['home']);
            },
            errors=>{
              console.log(<any>errors);
            }
          );
        }else{
          this.status='error';
        }
      },
      errors=>{
        console.log(<any>errors);
      }
    );
  }
  logout(){
    this._route.params.subscribe(params =>{
      let logout:number=+params['id'];
      if(logout==1){
        localStorage.removeItem('identity');
        localStorage.removeItem('token');
        this.identity="";
        this.token="";
        //Redireccion
        this._router.navigate(['home']);
      }
    });
  }

}
