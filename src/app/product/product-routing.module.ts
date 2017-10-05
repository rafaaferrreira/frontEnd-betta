import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './product-list.component';
import { ProductCreateComponent } from './product-create.component';
import { ImageListComponent } from '../image/image-list.component';
import { ImageService } from '../image/image.service';

const routes: Routes = [
  {path: 'product', component: ProductListComponent},
  {path: 'product/create', component: ProductCreateComponent},
  {path: 'product/edit/:id', component: ProductCreateComponent},
  {path: 'image/:id', component: ImageListComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ImageListComponent,ImageService]

})
export class ProductRoutingModule { }
