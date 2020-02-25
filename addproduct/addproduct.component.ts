
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import{ProductService} from'../service/product.service';
import Product from '../addproduct/product';
import { HttpEventType, HttpEvent } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.scss']
})

export class AddproductComponent implements OnInit {
  [x: string]: any;
  preview: string;
  form: FormGroup; 
  Product=[];
  
  constructor(
    public formbuilder: FormBuilder,
    public router: Router,
    public productService:ProductService    
  ){
    this.createForm();
  }

   createForm() {
      // Reactive Form
      this.form = this.formbuilder.group({
        Image: ['',Validators.required],
        Name: ['',Validators.required],
        Price:['',Validators.required],
        Quantity:['',Validators.required]    
      })
    }

   ngOnInit() {}

// Image Preview
uploadFile(event) {
  const file = (event.target as HTMLInputElement).files[0];
  this.form.patchValue({
    Image: file
  });
  this.form.get('Image').updateValueAndValidity()

  // File Preview
  const reader = new FileReader();
  reader.onload = () => {
    this.preview = reader.result as string;
  }
  reader.readAsDataURL(file)
}
  
  
  addProduct() {
    this.productService.addProduct(
      this.form.value.Image,
      this.form.value.Name,
      this.form.value.Price,   
      this.form.value.Quantity
     ).subscribe((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.Sent:
          console.log('Request has been made!');
          break;
        case HttpEventType.ResponseHeader:
          console.log('Response header has been received!');
          break;        
        case HttpEventType.Response:
          console.log('User successfully created!', event.body);
          this.percentDone = false;
         
      }
    }
    )
  } 

}
