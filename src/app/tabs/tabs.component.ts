import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from '../autenticacion.service';
@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent implements OnInit {

  constructor(private authService: AutenticacionService) { }
  userLogged=this.authService.getUserLogged();
  ngOnInit() {}

}
