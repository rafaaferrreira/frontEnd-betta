import { Component, OnInit, OnDestroy, Input} from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ImageService } from "./image.service";
import { Image } from "./Image";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-image-create',
  templateUrl: './image-create.component.html',
  styleUrls: ['./image-create.component.css'],
  providers: [ImageService],
})
export class ImageCreateComponent implements OnInit {

  id: number;
  image: Image;
  id_prod : number;
  @Input() private id_prodForm: number;

  imageForm: FormGroup;
  private sub: any;

  constructor(private route: ActivatedRoute, private router: Router, private imageService: ImageService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.sub = this.route.params.subscribe(params => {
      this.id_prod = params['id_prod'];
      this.id_prodForm = this.id_prod;
    });

    this.sub = this.route.params.subscribe(params => {
      this.id_prod = params['id_pro_create'];
      if(this.id_prod != null){
        this.id_prodForm = this.id_prod;
      }
     
      
    });

    this.imageForm = new FormGroup({
      id: new FormControl(''),
      type: new FormControl('', Validators.required),
      product_id : new FormControl(''),
      
    });
    if (this.id) {
      this.imageService.getImage(this.id).subscribe(
        image => {
          this.id = image.id;
          this.imageForm.patchValue({
            id: image.id,
            type: image.type,
            product_id: this.id_prodForm
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
    if (this.imageForm.valid) {
      if (this.id) {
        let image: Image = new Image(
          this.imageForm.controls['id'].value,
          this.imageForm.controls['type'].value,
          this.id_prodForm);
        this.imageService.updateImage(image).subscribe();

      } else {
        let image: Image = new Image(this.id_prodForm,
          this.imageForm.controls['type'].value,
          null,);
        this.imageService.saveImage(image).subscribe();
      }

    }
    this.imageService.findById(this.id_prodForm);
    this.imageForm.reset();
    this.router.navigate(['/image', this.id_prodForm]);
    
  }

  redirectImagetPage() {
    this.router.navigate(['/image/', this.id_prodForm]);

  }
  

  

}
