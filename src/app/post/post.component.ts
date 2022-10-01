import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BdServiceService } from '../bd-service.service';
import { StorageService } from '../storage.service';
import { AutenticacionService } from '../autenticacion.service';
import { Camera } from '@capacitor/camera';
import { CameraResultType } from '@capacitor/camera';
import { resolve } from 'dns';
import { rejects } from 'assert';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Posteando Imagen',
      subHeader: 'Puede tardar un momento',
      message: ':)',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
  picture:string;
  imagenSubida:any;
  constructor(private bd : BdServiceService,
    private authService: AutenticacionService,
    private storage: StorageService,
    private router:Router,
    public alertController: AlertController
    ) { }


    usuario:any;
    urlImgFirebase:any;

    async TomarFoto(){
      try{
        const image=await Camera.getPhoto({
          quality:100,
          allowEditing:false,
          resultType:CameraResultType.DataUrl,
        });
        this.picture=image.dataUrl;
        let reader=new FileReader();
        let usuario= this.authService.getUserId();
        //this.SubirImagen(usuario,image.dataUrl);  
        this.usuario=usuario;
        this.imagenSubida=image.dataUrl;
      }catch(err){console.log("error tomar foto",err)}
    }
    
   
    
      SubirImagen=(usuario:any,image:any)=>{
      let url;
      return new Promise((resolve)=>{
        this.storage.subirImagen(usuario+"_"+Date.now(),image).then(urlImagen=>{
        
          this.urlImgFirebase=urlImagen;
          this.nuevoPost.imagen=this.urlImgFirebase;
          console.log(this.urlImgFirebase);
          resolve(this.urlImgFirebase);
        });  
      })
      
    }
    cargarImagen(event:any){
      try{
        let archivos=event.target.files
      
        this.authService.getUserLogged();
        let usuario= this.authService.getUserId();
  
        let reader=new FileReader();
          reader.readAsDataURL(archivos[0]);
          reader.onloadend=()=>{
            //this.SubirImagen(usuario,reader.result);
          this.imagenSubida=reader.result;
          this.usuario=usuario;

          }
      }catch(err){console.log("error subir foto",err)}
      
      
    }
  ngOnInit(): void {
  }
  userLogged=this.authService.getUserLogged();
  onSubmit(f: NgForm) {
    console.log("Submit")
  }

  nuevoPost : any = {
    caption: "", 
    uid: "", 
    imagen: "", 
    usuario: "",
    like: 0, 
    comentario: "", 
    guardado: 0, 
    flechita: 0, 
    imagenUsuario: ""

  }

    actualizarNuevoPost() {
    this.nuevoPost.uid=this.authService.getUserId();
    this.nuevoPost.usuario=this.authService.getUserName();
    this.nuevoPost.imagenUsuario=this.authService.getUserPic();
    this.SubirImagen(this.usuario,this.imagenSubida).then(x=>{
      console.log("actualizar bd");
      this.bd.postPublicacion(this.nuevoPost).subscribe();
    });
    
    
  }

  subir(){
    this.presentAlert();
    console.log("actualizar bdx");
    this.nuevoPost.uid=this.authService.getUserId();
    this.nuevoPost.usuario=this.authService.getUserName();
    this.nuevoPost.imagenUsuario=this.authService.getUserPic();
    this.SubirImagen(this.usuario,this.imagenSubida).then(x=>{
      console.log("subida"+{x});
      this.bd.postPublicacion(this.nuevoPost).subscribe(res=>{
        window.location.href="/feed";
      });
    });
    
    
  }

}
