import { ProductService } from './../service/product.service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Product from '../addproduct/product';
import { HttpEventType, HttpEvent } from '@angular/common/http';
import { pid, updateProduct } from 'process';

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.scss']
})
export class EditproductComponent implements OnInit {

  [x: string]: Object;
  angForm: FormGroup;
  
  productDetail: Product;
  frmGroup: FormGroup;
  product: any = {};
  productId:string;
  value:any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private formbuilder: FormBuilder
  ) {
    this.createForm();
  }

  createForm() {
    // Reactive Form
    this.form = this.formbuilder.group({
     
     Name: ['',Validators.required],
     Price:['',Validators.required],
     Quantity:['',Validators.required]
     
   })
    }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.productId = params["id"];
      this.productService.editProduct(params["id"]).subscribe(res => {
        this.product = res;
      });
    });
  }
  
  updateProduct() {
    this.route.params.subscribe(params => {
      this.productService.updateProduct(
        this.form.value.Name,
      this.form.value.Price,   
      this.form.value.Quantity,
    
        params["id"]
      );
      console.log(updateProduct());
     
     
  });
  this.router.navigate(['/product']);
}
  
}
