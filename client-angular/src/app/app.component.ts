import { Component, DoCheck, OnInit} from '@angular/core';
import { UserService } from './services/user.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[UserService]
})
export class AppComponent implements OnInit, DoCheck{
  title = 'client-angular';
  public identity:any;
  public token:string;
  private _userService:UserService;
  constructor(_userService:UserService){
    this._userService=_userService;
    this.identity="";
    this.token="";
  }
  ngOnInit(){
      console.log('app.component cargado');
      this.token=this._userService.getToken();
      this.identity=JSON.parse(this._userService.getIdentity());
  }
  ngDoCheck(): void {
    this.token=this._userService.getToken();
    this.identity=JSON.parse(this._userService.getIdentity());
  }
}
