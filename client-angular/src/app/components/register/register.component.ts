import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {
  public user:User;
  private _router:Router;
  private _route:ActivatedRoute;
  private _userService:UserService;
  public status:string;
  constructor(_route:ActivatedRoute, _router:Router, _userService:UserService){
    this._route=_route;
    this._router=_router;
    this._userService=_userService;    
    this.user=new User(1,"ROLE_USER","","","","");
    this.status='';
  }
  ngOnInit(): void {
    console.log('register.component cargado correctamente');
  }
  onSubmit(registerForm:any){
    this._userService.register(this.user).subscribe(
      response=> {
        if(response.status=='success'){
          this.status=response.status;
          //vaciar formulario
          this.user=new User(1,"ROLE_USER","","","","");
          registerForm.reset();
        }else{
          this.status='error';
        }
      },
      error=> {
        console.log(<any>error);
        this.status='error';
      }
    );
  }
}
