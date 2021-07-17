import { Component, OnInit } from '@angular/core';
import { Desavanje } from '../models/desavanje';
import { ServisService } from '../servis.service';
import { User } from '../models/user';
import { DesavanjeKomentar} from '../models/desavanjeKomentar';
import { ZahtevZaDesavanje } from '../models/zahtevZaDesavanje';
import { Router } from '@angular/router';

@Component({
  selector: 'app-desavanje',
  templateUrl: './desavanje.component.html',
  styleUrls: ['./desavanje.component.css']
})
export class DesavanjeComponent implements OnInit {
  desavanje: Desavanje;
  flag1: boolean;
  korisnik: User;
  poruka1: String;
  aktiviraj1: boolean;
  zatvori1: boolean;
  promeni: boolean;
  poruka2: String;
  flag2: boolean;
  komentari: DesavanjeKomentar[];
  flag3: boolean;
  poruka3: String;
  zahtevi: ZahtevZaDesavanje[];
  flag4: boolean;
  poruka4: String;
  komentar: String;
  flag5: boolean;
  flag6: boolean;
  poruka5: String;

  constructor(private servis: ServisService, private router: Router) { }

  ngOnInit(): void {
    this.desavanje = JSON.parse(localStorage.getItem('desavanje'));
    //alert(this.desavanje.pocetak)
    this.korisnik = JSON.parse(localStorage.getItem('ulogovan'));
    if(this.korisnik.username == this.desavanje.organizator){
      this.flag1 = true;
    }
    let flag = true;
    let pocetak;
    let kraj;
    let status;
    if(this.desavanje.pocetak){
      pocetak = this.desavanje.pocetak.split('-');
    }
    else{
      pocetak = 0;
    }
    
    if(this.desavanje.kraj){
      kraj = this.desavanje.kraj.split('-');
    }
    else{
      kraj = 0;
    }
    
    if(pocetak){
      if(new Date(pocetak[0],pocetak[1]-1,pocetak[2]).getTime() > new Date().getTime()){
        flag = false;
      }
    }
    if(kraj){
      if(new Date(kraj[0],kraj[1]-1,kraj[2]).getTime() < new Date().getTime()){
        flag = false;
      }
    }
    status = flag;
    if(this.desavanje.status != status){
      this.desavanje.status = status;
      this.servis.updateDesavanje(this.desavanje).subscribe(tmp=>{
        
      })
      
    }
    //alert('a')
    //alert()
    if((this.desavanje.tip == 'privatno' && 
        (this.desavanje.ucesnici.includes(this.korisnik.username) || this.desavanje.organizator == this.korisnik.username)) ||
        this.desavanje.tip == 'javno'){
          this.flag2 = true;
          //alert('evo')
        }
        
        
    this.servis.komentariZaDesavanje(this.desavanje).subscribe((pom: DesavanjeKomentar[])=>{
          //alert(pom[0].komentar)
          this.komentari = pom;
        })
      
    if(this.desavanje.tip == 'privatno' && this.desavanje.status && 
    !this.desavanje.ucesnici.includes(this.korisnik.username) && this.korisnik.username!=this.desavanje.organizator){
      this.flag3 = true;
    }

    if(this.desavanje.tip == 'privatno' && !this.desavanje.status /*&& !this.desavanje.ucesnici.includes(this.korisnik.username)*/){
      this.flag4 = true;
      this.poruka4 = 'Desavanje je privatno i zatvoreno';
    }
    
    if(this.desavanje.status && (this.desavanje.ucesnici.includes(this.korisnik.username) || this.desavanje.organizator == this.korisnik.username)){
      this.flag5 = true;
    }

    if(this.desavanje.tip == 'javno' && this.desavanje.status && 
    !this.desavanje.ucesnici.includes(this.korisnik.username) && this.korisnik.username!=this.desavanje.organizator){
      this.flag6 = true;
    }
    
  }

  aktiviraj(){
    if(this.desavanje.status == true){
      this.poruka1 = 'Desavanje je vec aktivno!';
    }
    else{
      this.aktiviraj1 = true;
      this.promeni = true;
    }
  }
  
  zatvori(){
    if(this.desavanje.status == false){
      this.poruka1 = 'Desavanje je vec zatvoreno!';
    }
    else{
      this.zatvori1 = true;
      this.promeni = true;
    }
  }

  potvrdi(){
    let flag = true;
    let pocetak;
    let kraj;
    let status;
    if(this.desavanje.pocetak){
      pocetak = this.desavanje.pocetak.split('-');
    }
    else{
      pocetak = 0;
    }
    
    if(this.desavanje.kraj){
      kraj = this.desavanje.kraj.split('-');
    }
    else{
      kraj = 0;
    }
    
    if(pocetak){
      if(new Date(pocetak[0],pocetak[1]-1,pocetak[2]).getTime() > new Date().getTime()){
        flag = false;
      }
    }
    if(kraj){
      if(new Date(kraj[0],kraj[1],kraj[2]).getTime() < new Date().getTime()){
        flag = false;
      }
    }
    status = flag;
    if(this.desavanje.status == status){
      if(this.aktiviraj1){
        this.poruka2 = 'Neuspela aktivacija desavanja';
        this.promeni = false;
        this.aktiviraj1 = false;
      }
      if(this.zatvori1){
        this.poruka2 = 'Neuspelo zatvaranje desavanja';
        this.promeni = false;
        this.zatvori1 = false;
      }
    }
    if(this.desavanje.status != status){
      this.desavanje.status = status;
      this.servis.updateDesavanje(this.desavanje).subscribe(tmp=>{
      
        localStorage.setItem('desavanje',JSON.stringify(this.desavanje));
       
          if(this.aktiviraj1){
            this.poruka2 = 'Uspesna aktivacija desavanja';
            this.promeni = false;
            this.aktiviraj1 = false;
          }
          if(this.zatvori1){
            this.poruka2 = 'Uspesno zatvaranje desavanja';
            this.promeni = false;
            this.zatvori1 = false;
          }
        
      })
    }
  }

  posalji(){
    this.servis.sviZahteviZaDesavanja().subscribe((tmp:ZahtevZaDesavanje[])=>{
      this.zahtevi = tmp;
      var x = false;
      //alert(this.zahtevi[0].desavanje)
      this.zahtevi.forEach(pom=>{
        if(pom.desavanje == this.desavanje.naziv && pom.korisnik == this.korisnik.username){
          this.poruka3 = 'Vec ste poslali zahtev!';
          x = true;
        }
      })
      if(x) return;
      this.servis.zahtevZaDesavanje(this.korisnik.username,this.desavanje.naziv,this.desavanje.organizator).subscribe(tmp=>{
        this.poruka3 = 'Uspesno dodat zahtev!';
      })
    })
   
  }

  ostaviKomentar(){
    if(!this.komentar) return;
    var data = new  DesavanjeKomentar();
    data.desavanje = this.desavanje.naziv;
    data.korisnik = this.korisnik.username;
    data.komentar = this.komentar;
    //alert(data.desavanje)
    this.servis.ostaviKomentar(data).subscribe(tmp=>{
      if(this.desavanje.organizator!=this.korisnik.username){
        this.servis.pretragaKorisnika(this.desavanje.organizator).subscribe((korisnik:User)=>{
          korisnik = korisnik[0];
          if(!korisnik.obavestenja) korisnik.obavestenja = [];
          korisnik.obavestenja.push('Korisnik ' + this.korisnik.username + ' je ostavio komentar na desavanje ' + this.desavanje.naziv);
          //alert(korisnik.obavestenja[0]);
          this.servis.sacuvajIzmeneKorisnika(korisnik).subscribe(pom=>{

          })
        })
      }
      this.desavanje.ucesnici.forEach(ucesnik => {
        if(ucesnik!=this.korisnik.username){
          this.servis.pretragaKorisnika(ucesnik).subscribe((korisnik:User)=>{
            korisnik = korisnik[0];
            if(!korisnik.obavestenja) korisnik.obavestenja = [];
            korisnik.obavestenja.push('Korisnik ' + this.korisnik.username + ' je ostavio komentar na desavanje ' + this.desavanje.naziv);
            //alert(korisnik.obavestenja[0]);
            this.servis.sacuvajIzmeneKorisnika(korisnik).subscribe(pom=>{
  
            })
          })
        }
        
      });
      this.komentari.push(data);
    })
    
  }
  nazad(){
    
    this.router.navigate(['/pregledDesavanja']);
  }

  prijavi_se(){
    this.desavanje.ucesnici.push(this.korisnik.username);
    this.servis.updateUcesnici(this.desavanje).subscribe(tmp=>{
      localStorage.setItem('desavanje',JSON.stringify(this.desavanje));
      
      this.poruka5 = 'Uspesno si se prijavio za desavanje!';
    })
  }
}
