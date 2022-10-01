import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

//IMPORTS EXTRA
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { initializeApp , provideFirebaseApp} from '@angular/fire/app';
import { NavbarComponent } from './navbar/navbar.component';
import { TabsComponent } from './tabs/tabs.component';
import { FeedComponent } from './feed/feed.component';
import { LoginComponent } from './login/login.component';
import { HistoriasComponent } from './historias/historias.component';
import { PopoverComponent } from './popover/popover.component';
import { popoverController } from '@ionic/core';
import { HistoriaContenidoComponent } from './historia-contenido/historia-contenido.component';
import { PostComponent } from './post/post.component';
import { PerfilComponent } from './perfil/perfil.component';
import { PublicacionesComponent } from './publicaciones/publicaciones.component';
import { PublicacionComponent } from './publicacion/publicacion.component';
import { RegistroComponent } from './registro/registro.component';
import { EditarPerfilComponent } from './editar-perfil/editar-perfil.component';
import { MapaComponent } from './mapa/mapa.component';
import { GoogleMapsModule } from '@angular/google-maps';
@NgModule({
  declarations: [AppComponent,NavbarComponent,TabsComponent,FeedComponent,
    LoginComponent,HistoriasComponent,PopoverComponent,HistoriaContenidoComponent,
    PostComponent,PerfilComponent,PublicacionesComponent,PublicacionComponent,
    RegistroComponent, EditarPerfilComponent, MapaComponent
  ],
  entryComponents: [],
  imports: [BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    GoogleMapsModule,
    IonicModule.forRoot(),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
