import { Injectable } from '@angular/core';
import Product from '../addproduct/product';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { FormGroup } from '@angular/forms';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  uri = "http://localhost:3000/product";
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  total :Number;  
products: Product[];
  
  

  constructor(private http: HttpClient) {}

   
  // To Create/Add New Product

  addProduct(Image:string, Name:string, Price:number, Quantity:number): Observable<any> {    
    var formData: any = new FormData();
    
    formData.append("Image", Image);
    formData.append("Name", Name);
    formData.append("Price", Price);    
    formData.append("Quantity", Quantity);

    
    return this.http
    .post<Product>(`${this.uri}/addproduct`,formData,{ 
      reportProgress: true,
       observe: 'events'})
   
  }

  // Error handling 
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

// To Get The List Of Product

 getProduct() {
    return this.http.get(`${this.uri}`);
  }

   // To Get product Details For Single Record Using Id
   editProduct(pid) {
    return this.http.get(`${this.uri}/edit/${pid}`);
  } 


  updateProduct(Name:string, Price:number, Quantity:number ,pid){
    const obj = {
      Name: Name,
      Price: Price,
      Quantity: Quantity     
    };

   return this.http
      .post<Product>(`${this.uri}/update/${pid}`, obj)
       .subscribe(res => console.log("Done"))
  }
  
  // To Delete Any Product
  deleteProduct(pid) {
    return this.http.get(`${this.uri}/delete/${pid}`);
  }
  


  
}
