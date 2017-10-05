import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ProductService } from "./product.service";
import { Product } from "./Product";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css'],
  providers: [ProductService]
})
export class ProductCreateComponent implements OnInit, OnDestroy {

  id: number;
  product: Product;

  productForm: FormGroup;
  private sub: any;

  constructor(private route: ActivatedRoute, private router: Router, private productService: ProductService) { }

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.productForm = new FormGroup({
      id: new FormControl(''),
      description: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required)
    });


    if (this.id) {
      this.productService.findById(this.id).subscribe(
        product => {
          this.id = product.id;
          this.productForm.patchValue({
            id: product.id,
            description: product.description,
            name: product.name,
          });
        }, error => {
          console.log(error);
        }
      );

    }


  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onSubmit() {
    if (this.productForm.valid) {
      if (this.id) {
        let product: Product = new Product(
          this.productForm.controls['id'].value,
          this.productForm.controls['description'].value,
          this.productForm.controls['name'].value);
        this.productService.updateProduct(product).subscribe();

      } else {
        let product: Product = new Product(null,
          this.productForm.controls['description'].value,
          this.productForm.controls['name'].value);
        this.productService.saveProduct(product).subscribe();
      }



    }
    this.productForm.reset();
    this.productService.findAll();
    this.router.navigate(['/product']);
  }

  redirectProductPage() {
    this.router.navigate(['/product']);

  }

}
