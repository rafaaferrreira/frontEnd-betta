import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ImageRoutingModule } from './image-routing.module';
import { ImageListComponent } from './image-list.component';
import { ImageCreateComponent } from './image-create.component';

@NgModule({
  imports: [
    CommonModule,
    ImageRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ImageListComponent, ImageCreateComponent]
})
export class ImageModule { }
