import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from '../autenticacion.service';
@Component({
  selector: 'app-historias',
  templateUrl: './historias.component.html',
  styleUrls: ['./historias.component.scss'],
})
export class HistoriasComponent implements OnInit {

  constructor(private authService: AutenticacionService) { }
  
  
  userLogged=this.authService.getUserLogged();
  ngOnInit() {}

}
