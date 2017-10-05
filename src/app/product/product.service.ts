import { Injectable } from '@angular/core';
import { Product } from "./Product";
import { Http, Response } from "@angular/http";
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ProductService {

  private apiUrl = 'http://localhost:8080/products';
  
   constructor(private http: Http) {
   }
  
   findAll(): Observable<Product[]>  {
    return this.http.get(this.apiUrl+'/getAllProducts')
       .map((res:Response) => res.json())
       .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
   }

   saveProduct(product: Product): Observable<Product> {
    return this.http.post(this.apiUrl+'/saveProduct', product)
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
      
 
  }


 findById(id: number): Observable<Product> {
    return this.http.get(this.apiUrl + '/getProduct/' + id)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Error'));
  }


 
  updateProduct(product: Product): Observable<Product> {
    return this.http.put(this.apiUrl + '/updateProduct', product)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  

 deleteProductById(id: number): Observable<boolean> {
    return this.http.delete(this.apiUrl + '/deleteProduct/' + id)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

}
