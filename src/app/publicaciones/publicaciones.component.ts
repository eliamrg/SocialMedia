import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BdServiceService } from '../bd-service.service';
import { AutenticacionService } from '../autenticacion.service';
@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.component.html',
  styleUrls: ['./publicaciones.component.scss'],
})
export class PublicacionesComponent implements OnInit {

  constructor(private http: HttpClient, private db: BdServiceService,private authService: AutenticacionService) { }
  ngOnInit(): void {
    
    this.cargarFeed();
  }
  userLogged=this.authService.getUserLogged();
  publicaciones : any = [];
  posts: any = [];
  tester : any = [];
  
  filtro : string = '';
  
  activo = 'grid';
  cargarFeed() {
    this.db.getPublicaciones()
    .subscribe(resp => {
      console.log(resp);
      this.tester = Object.values(resp);
      console.log(this.tester);
      for(let test of this.tester){
        if(test != null){
          //this.alumnos = this.alumnos.concat(test);
          this.posts = this.posts.concat(test);
        }
      }
      //console.log(this.alumnos);
      console.log(this.posts);
      console.log(Object.keys(resp).reverse());
      this.posts.reverse();
    })
   

   }

  toggleActivo(activo: string):void {
    this.activo = activo;
  }

}
{}
