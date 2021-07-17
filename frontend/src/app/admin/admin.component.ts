import { Component, OnInit } from '@angular/core';
import { ServisService } from '../servis.service';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { Knjiga } from '../models/knjiga';
import { Zanr } from '../models/zanr';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  korisnik: User;
  flag1: boolean;
  sviZahtevi: User[];
  sviKorisnici: User[];
  registrovani: User[];
  moderatori: User[];
  sveKnjige: Knjiga[];
  knjigaZaIzmenu: Knjiga;
  flag2: boolean;
  poruka1: String;
  slika;
  nazivUnos: String;
  autorUnos: String[];
  datumUnos: String;
  zanrUnos: String[];
  opisUnos: String;
  ocenaUnos: Number;
  procitaoUnos: String[];
  citaUnos: String[];
  cekanjeUnos: String[];
  straneUnos: Number;
  odobrenaUnos: boolean;
  slika1;
  nazivUnos1: String;
  autorUnos1: String[];
  datumUnos1: String;
  zanrUnos1: Array<String>;
  opisUnos1: String;
  straneUnos1: Number;
  poruka2: String;
  sviZanrovi: Zanr[];
  noviZanr: String;
  poruka3: String;

  constructor(private servis: ServisService, private router: Router) { }

  ngOnInit(): void {
    this.korisnik = JSON.parse(localStorage.getItem('ulogovan'));
    this.servis.sviZahtevi().subscribe((tmp:User[])=>{
      this.sviZahtevi = tmp;
    })
    this.servis.dohvatiSveKorisnike().subscribe((tmp:User[])=>{
      this.sviKorisnici = tmp;
      this.registrovani = [];
      this.moderatori = [];
      this.sviKorisnici.forEach(korisnik=>{
        if(korisnik.tip == 'korisnik') this.registrovani.push(korisnik);
        if(korisnik.tip == 'moderator') this.moderatori.push(korisnik);
      })
    })
    this.servis.dohvatiSveKnjige().subscribe((tmp:Knjiga[])=>{
      this.sveKnjige = tmp;
    })
    this.servis.dohvatiSveZanrove().subscribe((tmp:Zanr[])=>{
      this.sviZanrovi = tmp;
    })
  }

  promeniLozinku(){
    this.router.navigate(['/promena']);
  }

  logout(){
    localStorage.removeItem('ulogovan');
    this.router.navigate(['/login']);
  }

  obavestenje1(){
    this.flag1 = !this.flag1;
  }

  odobri(zahtev){
   
    this.servis.deleteZahtev(zahtev).subscribe(tmp=>{
      
      this.servis.dodajKorisnika(zahtev).subscribe(pom=>{
        var i = this.sviZahtevi.indexOf(zahtev);
        this.sviZahtevi.splice(i,1);
      })
    })
  }

  dodeli(korisnik){
    var korisnik1 = korisnik;
    korisnik1.tip = 'moderator';
    this.servis.sacuvajIzmeneKorisnika(korisnik1).subscribe(tmp=>{
      var i = this.registrovani.indexOf(korisnik);
      this.registrovani.splice(i,1);
      this.moderatori.push(korisnik1);
    })
  }

  oduzmi(korisnik){
    var korisnik1 = korisnik;
    korisnik1.tip = 'korisnik';
    this.servis.sacuvajIzmeneKorisnika(korisnik1).subscribe(tmp=>{
      var i = this.moderatori.indexOf(korisnik);
      this.moderatori.splice(i,1);
      this.registrovani.push(korisnik1);
    })
  }

  odabranaSlika(event){
    if (event.target.files.length > 0){
      const file = event.target.files[0];
      this.slika = file;
    }
  }

  izmeni(knjiga){
    this.knjigaZaIzmenu = knjiga;
    this.flag2 = true;
    this.poruka1 = '';
    this.nazivUnos = this.knjigaZaIzmenu.naziv;
    this.autorUnos = this.knjigaZaIzmenu.autor;
    this.datumUnos = this.knjigaZaIzmenu.datum;
    this.zanrUnos = this.knjigaZaIzmenu.zanr;
    this.opisUnos = this.knjigaZaIzmenu.opis;
    this.ocenaUnos = this.knjigaZaIzmenu.ocena;
    this.procitaoUnos = this.knjigaZaIzmenu.procitao;
    this.citaUnos = this.knjigaZaIzmenu.cita;
    this.cekanjeUnos = this.knjigaZaIzmenu.cekanje;
    this.straneUnos = this.knjigaZaIzmenu.strane;
    this.odobrenaUnos = this.knjigaZaIzmenu.odobrena;
    //this.slika = this.knjigaZaIzmenu.slika;
  }

  izmeniKnjigu(){
    var naziv: String;
    naziv = this.knjigaZaIzmenu.naziv;
    this.servis.izmeniKnjigu(this.slika,this.nazivUnos,this.autorUnos.toString(),
      this.datumUnos,this.zanrUnos,this.opisUnos,
      this.straneUnos,this.ocenaUnos,this.procitaoUnos.toString(),
      this.citaUnos.toString(),this.cekanjeUnos.toString(),this.odobrenaUnos).subscribe(tmp=>{
        this.knjigaZaIzmenu.naziv = this.nazivUnos;
        this.knjigaZaIzmenu.autor = this.autorUnos;
        this.knjigaZaIzmenu.datum = this.datumUnos;
        this.knjigaZaIzmenu.zanr = this.zanrUnos;
        this.knjigaZaIzmenu.opis = this.opisUnos;
        this.knjigaZaIzmenu.ocena = Number(this.ocenaUnos);
        this.knjigaZaIzmenu.procitao = this.procitaoUnos;
        this.knjigaZaIzmenu.cita = this.citaUnos;
        this.knjigaZaIzmenu.cekanje = this.cekanjeUnos;
        this.knjigaZaIzmenu.strane = Number(this.straneUnos);
        this.knjigaZaIzmenu.odobrena = this.odobrenaUnos;
      this.poruka1 = 'Uspesno zamenjeno!';
    })
  }

  dodajKnjigu1(){
    //alert(this.zanrUnos1.length)
    if(this.zanrUnos1.length > 3){
      this.poruka2 = 'Maksimalno 3 zanra!';
      return;
    }
    this.servis.dodajKnjigu(this.slika1,this.nazivUnos1,this.autorUnos1,this.datumUnos1,this.zanrUnos1,this.opisUnos1,this.straneUnos1).subscribe(tmp=>{
      
      for(var i = 0 ; i < this.zanrUnos1.length; i++){
        //alert(zanrovii[i])
        this.servis.dohvatiZanr(this.zanrUnos1[i]).subscribe((tmp:Zanr)=>{
          //alert('aaaaa')
          tmp = tmp[0];
          tmp.broj = tmp.broj + 1;
          this.servis.updateZanr(tmp).subscribe(pom=>{
            
          })
        })
      }
      this.poruka2 = 'Uspesan unos knjige!';
            this.slika1 = '';
            this.nazivUnos1 = '';
            this.autorUnos1 = null;
            this.datumUnos1 = '';
            this.zanrUnos1 = null;
            this.opisUnos1 = '';
            this.straneUnos1 = null;
      
    })
  }

  ukloniZanr(zanr){
    this.servis.ukloniZanr(zanr).subscribe(tmp=>{
      var i = this.sviZanrovi.indexOf(zanr);
      this.sviZanrovi.splice(i,1);
    })
  }

  insertZanr(){
    var data = new Zanr();
    data.naziv = this.noviZanr;
    data.broj = 0;
    this.servis.insertZanr(data).subscribe(tmp=>{
      this.sviZanrovi.push(data);
      this.poruka3 = 'Novi zanr je uspesno dodat!';
    })
  }

}
