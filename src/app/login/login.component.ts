import { Component, OnInit } from '@angular/core';
import { getMaxListeners } from 'process';
import { AutenticacionService } from '../autenticacion.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  usuario={
    email:'',
    contrasena:''
  }
  constructor(private authService: AutenticacionService, public alertController: AlertController) { }

  Ingresar(){
    try{
      const{email,contrasena}=this.usuario;
      this.authService.login(email,contrasena).then(res=>{
        console.log("Sesion Iniciada:",res);
      })
    }
    catch(err){
      this.presentAlert();
    }
    
  
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Fallo al inicio de sesion',
      subHeader: 'Favor de verificar sus credenciales',
      message: ':(',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
  Registro(){
    const{email,contrasena}=this.usuario;
    this.authService.registro("eliam3k@gmail.com","vr3k22ML").then(res=>{
      console.log("Sesion Iniciada con Google:",res);
    })
  
  }
  IngresarGoogle(){
    const{email,contrasena}=this.usuario;
    this.authService.loginGoogle(email,contrasena).then(res=>{
      console.log("Sesion Iniciada con Google:",res);
    })
  }
  ngOnInit() {}

}
