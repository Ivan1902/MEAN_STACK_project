import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { GostComponent } from './gost/gost.component';
import { ModeratorComponent } from './moderator/moderator.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { RegistrovaniComponent } from './registrovani/registrovani.component';
import { ZaboravljenaComponent } from './zaboravljena/zaboravljena.component';
import { ResetovanjeComponent } from './resetovanje/resetovanje.component';
import { PromenaComponent } from './promena/promena.component';
import { KnjigaGostComponent } from './knjiga-gost/knjiga-gost.component';
import { KnjigaRegistrovaniComponent } from './knjiga-registrovani/knjiga-registrovani.component';
import { ProfilComponent } from './profil/profil.component';
import { DesavanjeComponent } from './desavanje/desavanje.component';
import { PregledDesavanjaComponent } from './pregled-desavanja/pregled-desavanja.component';


const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'login',component:LoginComponent},
  {path:'admin',component:AdminComponent},
  {path:'gost',component:GostComponent},
  {path:'moderator',component:ModeratorComponent},
  {path:'registracija',component:RegistracijaComponent},
  {path:'registrovani',component:RegistrovaniComponent},
  {path:'zaboravljena',component:ZaboravljenaComponent},
  {path: 'resetovanje/:username',component: ResetovanjeComponent},
  {path: 'promena', component: PromenaComponent},
  {path: 'knjigaGost', component: KnjigaGostComponent },
  {path: 'knjigaRegistrovani', component: KnjigaRegistrovaniComponent},
  {path:'profil', component: ProfilComponent},
  {path: 'desavanje', component: DesavanjeComponent},
  {path: 'pregledDesavanja', component: PregledDesavanjaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
