import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImageListComponent } from './image-list.component';
import { ImageCreateComponent } from './image-create.component';
import { ImageService } from '../image/image.service';
import { ProductListComponent } from '../product/product-list.component';

const routes: Routes = [
  {path: 'image', component: ImageListComponent},
  {path: 'image/:id', component: ImageListComponent},
  {path: 'create/:id_pro_create', component: ImageCreateComponent},
  {path: 'image/edit/:id/:id_prod', component: ImageCreateComponent},
  {path: 'product', component: ProductListComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ImageListComponent,ImageService]
})
export class ImageRoutingModule { }
