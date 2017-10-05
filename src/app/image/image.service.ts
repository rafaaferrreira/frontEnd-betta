import { Injectable } from '@angular/core';
import { Image } from "./Image";
import { Http, Response } from "@angular/http";
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ImageService {

  private apiUrl = 'http://localhost:8080/images';


  constructor(private http: Http) { }

  findAll(): Observable<Image[]>  {
    return this.http.get(this.apiUrl+'/getAllImages')
       .map((res:Response) => res.json())
       .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
   }


  findById(id: number): Observable<Image[]>{
    return this.http.get(this.apiUrl + '/getImagesByProduct/' + id)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Error'));
  }


  getImage(id: number): Observable<Image>{
    return this.http.get(this.apiUrl + '/getImage/' + id)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Error'));
  }

  saveImage(image: Image): Observable<Image> {
    return this.http.post(this.apiUrl+'/saveImage', image)
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
      
 
  }

  updateImage(image: Image): Observable<Image> {
    return this.http.put(this.apiUrl + '/updateImage', image)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }


  deleteImageById(id: number): Observable<boolean> {
    return this.http.delete(this.apiUrl + '/deleteImage/' + id)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

}
