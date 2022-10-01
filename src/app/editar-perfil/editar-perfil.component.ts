import { Component, OnInit } from '@angular/core';

import { AutenticacionService } from '../autenticacion.service';
import { StorageService } from '../storage.service';
import { getAuth, updateProfile , updatePassword } from "firebase/auth";
@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.scss'],
})
export class EditarPerfilComponent implements OnInit {

  constructor(private authService: AutenticacionService,private storage: StorageService) { }
  usuario={
    contrasena:'',
    contrasena2:'',
    nombre:''
  }
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

  Cimagen(){
    let url;
    this.SubirImagen(this.usuario,this.imagenSubida).then(x=>{
      console.log("subida"+{x});
      url=x;
      let id;
      id=this.authService.getUserId();
        const auth = getAuth();
        updateProfile(auth.currentUser, {
          photoURL: url
        }).then(() => {
          console.log("Imagen listo");
          window.location.href="/perfil";
        }).catch((error) => {
          // An error occurred
          // ...
        });
    });
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



  Cnombre(){
    const auth = getAuth();
    updateProfile(auth.currentUser, {
      displayName: this.usuario.nombre, 
    }).then(() => {
      console.log("Nombre actualizado"+ this.usuario.nombre);
      window.location.href="/perfil";
    }).catch((error) => {
      // An error occurred
      // ...
    });
  }
  Ccontrasena(){
    if (this.usuario.contrasena==this.usuario.contrasena2){
      const auth = getAuth();

      const user = auth.currentUser;
      const newPassword = this.usuario.contrasena
      
      updatePassword(user, newPassword).then(() => {
        console.log("Contraseña actualizado"+ newPassword);
        window.location.href="/perfil";
      }).catch((error) => {
        // An error ocurred
        // ...
      });
    }
    
  }

  ngOnInit() {
    this.usuario.nombre=this.authService.getUserName();
  }
}


