import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car.service';
import { Car } from 'src/app/models/car';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css'],
  providers:[CarService]
})
export class CarDetailComponent implements OnInit {
  private _carService:CarService;
  private _route:ActivatedRoute;
  private _router:Router;
  public carDetail:Car;
  constructor(_carService:CarService,_route:ActivatedRoute,_router:Router) {
    this._carService=_carService;
    this.carDetail=new Car(0,'','',0,'','','');
    this._route=_route;
    this._router=_router;
  }

  ngOnInit(): void {
    this._route.params.subscribe(
      params=>{
        let id:number = +params["id"];
        if(id!=undefined && typeof(id)=="number"){
          this._carService.getCar(id).subscribe(
            response=>{
              if(response.status=='success'){
                this.carDetail=response.car;
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
