import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { GostComponent } from './gost/gost.component';
import { RegistrovaniComponent } from './registrovani/registrovani.component';
import { AdminComponent } from './admin/admin.component';
import { ModeratorComponent } from './moderator/moderator.component';
import { ZaboravljenaComponent } from './zaboravljena/zaboravljena.component';
import { RecaptchaModule } from 'ng-recaptcha';
import { ResetovanjeComponent } from './resetovanje/resetovanje.component';
import { PromenaComponent } from './promena/promena.component';
import { KnjigaGostComponent } from './knjiga-gost/knjiga-gost.component';
import { KnjigaRegistrovaniComponent } from './knjiga-registrovani/knjiga-registrovani.component';
import { ChartsModule } from 'ng2-charts';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { ProfilComponent } from './profil/profil.component';
import { MatStepperModule } from '@angular/material/stepper';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DesavanjeComponent } from './desavanje/desavanje.component';
import { PregledDesavanjaComponent } from './pregled-desavanja/pregled-desavanja.component'; 

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistracijaComponent,
    GostComponent,
    RegistrovaniComponent,
    AdminComponent,
    ModeratorComponent,
    ZaboravljenaComponent,
    ResetovanjeComponent,
    PromenaComponent,
    KnjigaGostComponent,
    KnjigaRegistrovaniComponent,
    ProfilComponent,
    DesavanjeComponent,
    PregledDesavanjaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RecaptchaModule,
    ChartsModule,
    MatProgressBarModule,
    MatStepperModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
