import { ProductService } from './../service/product.service';
import { Component, OnInit, getDebugNode } from '@angular/core';
import { Router } from '@angular/router';
import Product from '../addproduct/product';




@Component({
  selector: 'app-getproduct',
  templateUrl: './getproduct.component.html',
  styleUrls: ['./getproduct.component.scss']
})
export class GetproductComponent implements OnInit {
  [x: string]: any;
  
  Products: Product[]; 
  total:number=0;
  

  constructor(
    private productService: ProductService,
    private router: Router
  ) { }  
 
  ngOnInit() {
    this.productService.getProduct().subscribe((data: Product[]) => {
      this.Products = data; 
      console.log(data);
      data.forEach(element => {
        this.total += element.Price * element.Quantity;
      });
      console.log(this.total);
                    
	});  
} 

  //Delete Products
  deleteProduct(pid) {
    this.productService.deleteProduct(pid).subscribe(newData  => {  
                  
       this.data = newData;
       console.log(this.data);
       console.log("Deleted");
    });
    this.router.navigate(['/product']);
  }   
}
