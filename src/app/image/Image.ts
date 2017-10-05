export class Image {
  
   id : number;
   type : string;
   product_id: number;
  
   constructor(id: number, type: string, product_id: number){
     this.id = id;
     this.type = type;
     this.product_id = product_id;
   }
   
 }