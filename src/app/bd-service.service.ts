
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';



const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};


@Injectable({
  providedIn: 'root'
})
export class BdServiceService {

  constructor(private http: HttpClient) { }

  


  //GET
  getPublicaciones(): any {
    return this.http.get('https://insta-base-1905762-default-rtdb.firebaseio.com/Publicaciones.json')
  }

  getDatosUsuario(): any {
    return this.http.get('https://insta-base-1905762-default-rtdb.firebaseio.com/usuario.json')
  }

  getPublicacionesUsuario(): any {
    return this.http.get('https://insta-base-1905762-default-rtdb.firebaseio.com/usuario/publicaciones.json')
  }

  getPublicacionDetalle(id: string): any {
    console.log('https://insta-base-1905762-default-rtdb.firebaseio.com/Publicaciones/'+ id +'.json');
    console.log(this.http.get('https://insta-base-1905762-default-rtdb.firebaseio.com/Publicaciones/'+ id +'.json'));
    return this.http.get('https://insta-base-1905762-default-rtdb.firebaseio.com/Publicaciones/'+ id +'.json')
  }


  //POST
  postPublicacion(post: any) {
    return this.http.post('https://insta-base-1905762-default-rtdb.firebaseio.com/Publicaciones.json', post)
  }


  //DELETE
  deletePublicacion(id: number){
    console.log("https://insta-base-1905762-default-rtdb.firebaseio.com/Publicaciones/"+ id.toString() + ".json");
    
    return this.http.delete('https://insta-base-1905762-default-rtdb.firebaseio.com/Publicaciones/'+ id.toString() + '.json')
  }

 

  //PUT
  updatePublicacion(id: number, nuevosDatos: any) {
    return this.http.put('https://insta-base-1905762-default-rtdb.firebaseio.com/Publicaciones/'+ id.toString() +'.json', nuevosDatos)
  }

}
