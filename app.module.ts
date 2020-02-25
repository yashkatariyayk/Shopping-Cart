import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AddproductComponent } from './addproduct/addproduct.component';
import { ServiceComponent } from './service/service.component';
import { GetproductComponent } from './getproduct/getproduct.component';
import { EditproductComponent } from './editproduct/editproduct.component';


@NgModule({
  declarations: [
    AppComponent,
    
    AddproductComponent,
    
    ServiceComponent,
    
    GetproductComponent,
    
    EditproductComponent
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,ReactiveFormsModule,HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
