import { EditproductComponent } from './editproduct/editproduct.component';
import { GetproductComponent } from './getproduct/getproduct.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
   { path: '',   redirectTo: '/product', pathMatch: 'full' },
  {path:'add/product',component:AddproductComponent},
  {path:'edit/:id',component:EditproductComponent},
  {path:'product',component:GetproductComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
