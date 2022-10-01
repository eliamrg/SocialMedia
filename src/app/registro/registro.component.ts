import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from '../autenticacion.service';
import { StorageService } from '../storage.service';
import { getAuth, updateProfile } from "firebase/auth";
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent implements OnInit {

  usuario={
    email:'',
    contrasena:'',
    contrasena2:'',
    nombre:''
  }
  constructor(private authService: AutenticacionService,
    private storage: StorageService,
    public alertController: AlertController) { }

  imagenSubida:any;
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
        }
    }catch(err){console.log("error subir foto",err)}
    
    
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Creando usuario',
      subHeader: 'Puede tardar un momento',
      message: ':)',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  urlImgFirebase:any;
  SubirImagen=(usuario:any,image:any)=>{
    let url;
    return new Promise((resolve)=>{
      this.storage.subirImagen(usuario+"_"+Date.now(),image).then(urlImagen=>{
        this.urlImgFirebase=urlImagen;
        console.log(this.urlImgFirebase);
        resolve(this.urlImgFirebase);
      });  
    })
    
  }

 
  Registro(){
    let url;
    
    console.log(this.usuario.contrasena+this.usuario.contrasena2,this.usuario.nombre,this.usuario.email);
    
    if(this.usuario.contrasena==this.usuario.contrasena2 &&(this.usuario.nombre!='')&&(this.usuario.contrasena!='')&&(this.usuario.email!='')){
     this.presentAlert(); 
      this.SubirImagen(this.usuario,this.imagenSubida).then(x=>{
        
        console.log("subida"+{x});
        url=x;
        let id;
        const{email,contrasena,nombre}=this.usuario;
        this.authService.registro(email,contrasena).then(res=>{
          console.log("Registro exitoso:",res);
          id=this.authService.getUserId();
          const auth = getAuth();
          updateProfile(auth.currentUser, {
            displayName:nombre, photoURL: url
          }).then(() => {
            console.log("Todo listo");
            
            window.location.href="/feed";
          }).catch((error) => {
            // An error occurred
            // ...
          });
        });
      });
    }

  }
  
  ngOnInit() {}
}
