import { Component, OnInit } from '@angular/core';
import { BdServiceService } from '../bd-service.service';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { AutenticacionService } from '../autenticacion.service';
@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.component.html',
  styleUrls: ['./publicacion.component.scss'],
})
export class PublicacionComponent implements OnInit {

  constructor(private ruta: ActivatedRoute, 
    private bd: BdServiceService,
    public alertController: AlertController,
    private authService: AutenticacionService) {}


    userLogged=this.authService.getUserLogged();
  publicacion :any;
  publicacionImprimir: any = {}
  
  posts: any = [];
  keys:any=[];
  tester : any = [];
  cargarFeed() {
    this.bd.getPublicaciones()
    .subscribe(resp => {
      //console.log(resp);
      this.keys=Object.keys(resp).reverse();
      console.log("llaves "+this.keys)
      this.tester = Object.values(resp);
      //console.log(this.tester);
      
      for(let test of this.tester){
        if(test != null){
          this.posts = this.posts.concat(test);

        }
      }
      this.posts.reverse();
      this.publicacion=this.keys[this.ruta.snapshot.params['idPost']];
      console.log("this.obtenerPublicacion("+this.publicacion+")");
      this.obtenerPublicacion(this.publicacion);
    })
   

   }
  ngOnInit(): void {
    
    this.cargarFeed();
    
   
   }
   
   async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Actualizando base de Datos',
      subHeader: 'Puede tardar un momento',
      message: ':)',
      buttons: ['OK']
    });
  }

   borrar()  {
    this.presentAlert();
    this.bd.deletePublicacion(this.publicacion).subscribe(res => {
      console.log(res);
      window.location.href="/feed";
    })
    
  }
 obtenerPublicacion(id: string) : any {
   this.bd.getPublicacionDetalle(id).subscribe(res => {
     console.log(res);
     this.publicacionImprimir = res;
   })
 } 
 editar( nuevoCaption: any) {
  this.presentAlert();
  this.bd.updatePublicacion(this.publicacion, nuevoCaption).subscribe(res => {
    console.log("Se actualizo la base de datos");
    
  });

  
}

}
