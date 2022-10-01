import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from '../autenticacion.service';
import { HttpClient } from '@angular/common/http';
import { Geolocation } from '@capacitor/geolocation';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {

  constructor(private http: HttpClient,private authService: AutenticacionService) { }
 
  latitud:number;
  longitud:number;
  userLogged=this.authService.getUserLogged();
  ngOnInit(): void {
    this.ObtenerCoordenadas();
    //this.getDatosUsuario();
  }

  async ObtenerCoordenadas(){
    const ObtenerCoordenada=await Geolocation.getCurrentPosition();
    this.latitud=ObtenerCoordenada.coords.latitude;
    this.longitud=ObtenerCoordenada.coords.longitude;
  }
  usuario : any = {}

  editando = false;

  toggleEditar(): void {
    this.editando = !this.editando;
  }

  /*@Input() bio: string = "";

  guardarBio(): void {
    this.usuario.descripcion = this.bio;
  }
  
  getDatosUsuario(): void {
    this.http.get('https://insta-base-1905762-default-rtdb.firebaseio.com/usuario.json').subscribe(res => {
      console.log(res);
      this.usuario = res;
    })
  }*/
}
