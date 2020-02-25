import { Component } from '@angular/core';
import Product from './addproduct/product';
import { ProductService } from './service/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'shoppingCart';

  Products: Product[]; 

  constructor(
    private productservice: ProductService,
    private router: Router
  ) { }  


  ngOnInit() {
    this.productservice.getProduct().subscribe((data: Product[]) => {
      this.Products = data; 
      
	});  
} 

 
}
