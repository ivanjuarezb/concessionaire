import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public title:string;
  constructor(
    private _route:ActivatedRoute,
    private _router:Router
  ){
    this.title="Resgistrate";
  }

  ngOnInit(): void {
    console.log('register.component cargado correctamente');
  }

}
