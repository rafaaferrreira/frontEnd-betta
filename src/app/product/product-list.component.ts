import { Component, OnInit } from '@angular/core';
import { Product } from "./product";
import { ProductService } from "./product.service";
import { Router } from '@angular/router';


@Component({
  moduleId: module.id,
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers: [ProductService],
  

})
export class ProductListComponent implements OnInit {

  private products: Product[];
  id_product: number;
 
  constructor(private router: Router, private productService: ProductService) { }
 
  ngOnInit() {
    this.getAllProducts();
  }
 
  getAllProducts() {
    this.productService.findAll().subscribe(
      products => {
        this.products = products;
        console.log(products);
      },
      err => {
        console.log(err);
      }
 
    );
  }



 deleteProduct(product: Product) {
    if (product) {
      this.productService.deleteProductById(product.id).subscribe(
        res => {
          this.getAllProducts();
          this.router.navigate(['/product']);
          console.log('done');
        }
      );
    }
  }


  redirectNewProductPage() {
    this.router.navigate(['/product/create']);
  }


  redirectImageProducs(id : number) {
    this.id_product = id;
    this.router.navigate(['/image', id]);
  }

  editProductPage(product: Product) {
    if (product) {
      this.router.navigate(['/product/edit', product.id]);
    }
  }
  
 
}
