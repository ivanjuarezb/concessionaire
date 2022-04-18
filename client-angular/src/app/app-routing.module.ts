import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Componentes
import { AppComponent } from './app.component';
import { DefaultComponent } from './components/default/default.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CarNewComponent } from './components/car-new/car-new.component';
import { CarEditComponent } from './components/car-edit/car-edit.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';

const routes: Routes = [
  //Las rutas se revisan y ejecutan en orden, nunca poner la ruta "**" la primera,
  //siempre la ultima, ya que si no siempre se cargara esa.
  {path:"home",component:DefaultComponent},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"logout/:id",component:LoginComponent},
  {path:"crear-coche",component:CarNewComponent},
  {path:"editar-coche/:id",component:CarEditComponent},
  {path:"coche/:id",component:CarDetailComponent},
  {path:"**",component:DefaultComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
