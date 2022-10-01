import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from '../autenticacion.service';
import { BdServiceService } from '../bd-service.service';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from '../popover/popover.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit {

  colorheart="light";
  colorplane="light";
  colorcoment="light";
  colorsave="light";
  heart(){
    if(this.colorheart=="light")
    this.colorheart="danger";
    else
    this.colorheart="light";
  }
  plane(){
    if(this.colorplane=="light")
    this.colorplane="tertiary";
    else
    this.colorplane="light";
    
  }
  coment(){
    if(this.colorcoment=="light")
    this.colorcoment="warning";
    else
    this.colorcoment="light";
   
  }
  save(){
    if(this.colorsave=="light")
    this.colorsave="primary";
    else
    this.colorsave="light";
   
    
  }
  constructor( private db: BdServiceService, 
    private popover: PopoverController,
    private authService: AutenticacionService,
    private router: Router) { }

    ngOnInit(): void {
      this.cargarFeed();
     }
     
     userLogged=this.authService.getUserLogged();
   
     key=123;
     posts: any = [];
     reves:any=[];
  tester : any = [];
  
  filtro : string = '';
  isPopoverOpen: boolean = false;
   
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
        this.reves=this.posts.reverse();
      })
     

     }
     
     //postIndex: number
     borrar(idPost : number)  {
       this.db.deletePublicacion(idPost).subscribe(res => {
         console.log(res);
         this.cargarFeed();
       })
       
     }
   
     editando: boolean = false;
   
     editar() {
       this.editando = !this.editando;
     }
   
     guardar(idPost: number, nuevoCaption: any) {
       this.db.updatePublicacion(idPost, nuevoCaption).subscribe(res => {
         console.log("Se actualizo la base de datos")
       });
   
       this.editar();
     }
   

}
