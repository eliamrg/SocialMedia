import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from '../autenticacion.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AutenticacionService) { }
  userLogged=this.authService.getUserLogged();
  cerrarSesion(){
    this.authService.logOut();
  }
  ngOnInit() {}

}
