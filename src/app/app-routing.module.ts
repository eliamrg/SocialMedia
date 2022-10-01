import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomePage } from './home/home.page';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { FeedComponent } from './feed/feed.component';
import { TabsComponent } from './tabs/tabs.component';
import { PostComponent } from './post/post.component';
import { PerfilComponent } from './perfil/perfil.component';
import { PublicacionComponent } from './publicacion/publicacion.component';
import { RegistroComponent } from './registro/registro.component';
import { MapaComponent } from './mapa/mapa.component';
import { EditarPerfilComponent } from './editar-perfil/editar-perfil.component';
const routes: Routes = [
  
  { path: 'feed', component: FeedComponent },
  { path: 'mapa', component: MapaComponent },
  {path: 'post', component: PostComponent},
  {path: 'perfil', component: PerfilComponent},
  {path: 'publicacion/:idPost', component: PublicacionComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'editar', component: EditarPerfilComponent},
  { path: '**', component: FeedComponent },
  /*{ path: 'perfil', component: PerfilComponent }, 
  {path: 'publicacion/:id', component: PublicacionComponent},
  {path: 'post', component: PostComponent},
  {path: '**', component: FeedComponent },
*/];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
