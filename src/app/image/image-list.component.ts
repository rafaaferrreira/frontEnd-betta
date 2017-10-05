import { Component, OnInit, Input } from '@angular/core';
import { Image } from "./Image";
import { Router, ActivatedRoute} from '@angular/router';
import { ImageService } from '../image/image.service';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.css'],
  providers: [ImageService],
})
export class ImageListComponent implements OnInit {

  private images: Image[];
  id_product : number;
  private sub: any;
  @Input() private id_prod: number;

  constructor(private route: ActivatedRoute, private router: Router, private imageService: ImageService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id_product = params['id'];
    });
    this.id_prod = this.id_product;
    this.getImagesByIdProduct();
  }


  getImagesByIdProduct() {
    console.log("Executando busca por todas images por id do produto");  
    this.imageService.findById(this.id_product).subscribe(images => {
        this.images = images;
        console.log(images);
      },
      err => {
        console.log(err);
      }
 
    );
  }



  deleteImage(image: Image) {
    if (image) {
      this.imageService.deleteImageById(image.id).subscribe(
        res => {
          this.getImagesByIdProduct();
          this.router.navigate(['/image',this.id_product]);
          console.log('done');
        }
      );
    }
  }


  redirectNewImagePage() {
    console.log("clikei na porra do botao");
    this.router.navigate(['/create',this.id_product]);
  }

  editImagePage(image: Image, id_pro : number) {
    if (image) {
      this.router.navigate(['/image/edit',image.id,id_pro]);
    }
  }

  backPageProducts() {
    this.router.navigate(['/product']);
  }









/*
  getAllImages() {
    this.imageService.findAll().subscribe(
      images => {
        this.images = images;
        console.log(images);
      },
      err => {
        console.log(err);
      }
 
    );
  }
*/
  

}
