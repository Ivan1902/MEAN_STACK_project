import { Injectable, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { applySourceSpanToStatementIfNeeded } from '@angular/compiler/src/output/output_ast';
import { Observable } from 'rxjs';
import { Knjiga } from './models/knjiga';

@Injectable({
  providedIn: 'root'
})
export class ServisService {

  uri = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  login(username,password){
    const data = {
      username: username,
      password: password
    };
    return this.http.post(`${this.uri}/login`,data);
  }

  registruj(ime,prezime,username,password,datumRodj,grad,drzava,email,slika){
    
    
    
    const formData = new FormData();
    formData.set('ime',ime);
    formData.set('prezime',prezime);
    formData.set('username',username);
    formData.set('password',password);
    formData.set('datumRodj',datumRodj);
    formData.set('grad',grad);
    formData.set('drzava',drzava);
    formData.set('email',email);
    formData.set('slika',slika);
    formData.set('tip','korisnik');
    if(!slika){
      formData.set('genericka','da');
    }
    else{
      formData.set('genericka','ne');
    }
    return this.http.post(`${this.uri}/registracija`,formData);
  }

  dohvatiSveKorisnike(){
    return this.http.get(`${this.uri}/sviKorisnici`);
  }

  dohvatiSveZahteve():Observable<any>{
    return this.http.get<any>(`${this.uri}/sviZahtevi`);
  }

  posaljiMejl(user){
    return this.http.post(`${this.uri}/sendEmail`,user);
  }

  izmeni(user){
    return this.http.post(`${this.uri}/updatePassword`,user);
  }

  dohvatiSveKnjige():Observable<any>{
    return this.http.get<any>(`${this.uri}/sveKnjige`);
  }

  sacuvajIzmeneKorisnika(user){
    return this.http.post(`${this.uri}/updateUser`,user);
  }

  izmeniCekanje(knjiga){
    //alert('Servis')
    return this.http.post(`${this.uri}/updateCekanje`,knjiga);
  }

  dohvatiSveKomentare():Observable<any>{
    return this.http.get<any>(`${this.uri}/sviKomentari`);
  }

  updateStatus(knjiga){
    return this.http.post(`${this.uri}/updateStatus`,knjiga);
  }

  dohvatiKomentar(username,knjiga){
    const data = {
      username: username,
      knjiga: knjiga
    }
    //alert('servis')
    return this.http.post(`${this.uri}/dohvatiKomentar`,data);
  }

  updateKomentar(komentar){
    //alert(komentar.tekst)
    return this.http.post(`${this.uri}/updateKomentar`,komentar);
  }

  insertKomentar(komentar){
    return this.http.post(`${this.uri}/insertKomentar`,komentar);
  }

  updateOcena(knjiga){
    return this.http.post(`${this.uri}/updateOcena`,knjiga);
  }

  dohvatiSveKomentareKnjige(knjiga){
    return this.http.post(`${this.uri}/dohvatiSveKomentareKnjige`,knjiga);
  }

  profil(username){
    const data = {
      username: username
    }
    return this.http.post(`${this.uri}/profil`,data);
  }

  dodajKnjigu(slika,naziv,autor,datum,zanr,opis,strane){
  
    const formData = new FormData();
    var autor1: string[];
    autor1 = autor.split(/\s*,\s*/);
    var zanr1: string[];
    
    formData.set('slika',slika);
    formData.set('naziv',naziv);
    
    autor1.forEach(autor=>{
      formData.append('autor',autor);
    })
    
    formData.set('datum',datum);
    zanr.forEach(tmp=>{
      formData.append('zanr',tmp);
    })
    //formData.set('zanr',zanr);
    
    
    formData.set('opis',opis);
    formData.set('strane',strane);
   
    if(!slika){
      formData.set('genericka','da');
    }
    else{
      formData.set('genericka','ne');
    }
    return this.http.post(`${this.uri}/dodajKnjigu`,formData);
  }

  dohvatiSvaDesavanja():Observable<any>{
    return this.http.get<any>(`${this.uri}/svaDesavanja`);
  }

  updateUcesnici(desavanje){
    return this.http.post(`${this.uri}/updateUcesnici`,desavanje);
  }

  dodajDesavanje(organizator,naziv,pocetak,kraj,opis,ucesnici,status,tip){
    const data = {
      organizator: organizator,
      naziv: naziv,
      pocetak: pocetak,
      kraj: kraj,
      opis: opis,
      ucesnici: ucesnici,
      status: status,
      tip:tip
    }
    //alert(pocetak)
    return this.http.post(`${this.uri}/dodajDesavanje`,data);
  }

  updateDesavanje(desavanje){
    return this.http.post(`${this.uri}/updateDesavanje`,desavanje);
  }


  komentariZaDesavanje(desavanje){
    return this.http.post(`${this.uri}/komentariZaDesavanje`,desavanje);
  }

  zahtevZaDesavanje(korisnik,desavanje,organizator){
    const data = {
      korisnik: korisnik,
      desavanje: desavanje,
      organizator: organizator
    }
    return this.http.post(`${this.uri}/zahtevZaDesavanje`,data);
  }

  sviZahteviZaDesavanja(){
    return this.http.get(`${this.uri}/sviZahteviZaDesavanja`);
  }

  ostaviKomentar(komentar){
    return this.http.post(`${this.uri}/insertKomentarZaDesavanje`,komentar);
  }

  dohvatiSveZanrove(){
    return this.http.get(`${this.uri}/sviZanrovi`);
  }

  pretragaKorisnika(username){
    const data = {
      username: username
    }
    return this.http.post(`${this.uri}/pretragaKorisnika`,data);
  }

  odobriKnjigu(knjiga){
    return this.http.post(`${this.uri}/updateOdobrena`,knjiga);
  }

  dohvatiZanr(naziv){
    const data = {
      naziv: naziv
    }
    return this.http.post(`${this.uri}/dohvatiZanr`,data);
  }

  updateZanr(zanr){
    return this.http.post(`${this.uri}/updateZanr`,zanr);
  }

  insertZanr(zanr){
    return this.http.post(`${this.uri}/insertZanr`,zanr);
  }

  sviZahtevi(){
    return this.http.get(`${this.uri}/sviZahtevi`);
  }

  deleteZahtev(zahtev){
    return this.http.post(`${this.uri}/deleteZahtev`,zahtev);
  }

  dodajKorisnika(korisnik){
    //alert(korisnik.username)
    return this.http.post(`${this.uri}/insertKorisnik`,korisnik);
  }

  izmeniKnjigu(slika,naziv,autor,datum,zanr,opis,strane,ocena,procitao,cita,cekanje,odobrena){
    //alert(naziv)
    const formData = new FormData();
    var autor1: string[];
    var autor2 = String(autor)
    autor1 = autor2.split(/\s*,\s*/) ;
    //alert(autor1[1])
    var zanr1: string[];
    var zanr2 = String(zanr);
    zanr1 = zanr2.split(/\s*,\s*/);
    alert(ocena)
    formData.set('slika',slika);
    formData.set('naziv',naziv);
    //alert(autor1[1])
    autor1.forEach(autor=>{
      formData.append('autor',autor);
    })
    
   
    var procitao1: string[];
    var procitao2 = String(procitao)
    procitao1 = procitao2.split(/\s*,\s*/);
    procitao1.forEach(tmp => {
      formData.append('procitao',tmp);
    });
    var cita1: string[];
    var cita2 = String(cita)
    cita1 = cita2.split(/\s*,\s*/);
    cita1.forEach(tmp => {
      formData.append('cita',tmp);
    });
    
    var cekanje1: string[];
    var cekanje2 = String(cekanje)
    cekanje1 = cekanje2.split(/\s*,\s*/);
    cekanje1.forEach(tmp => {
      formData.append('cekanje',tmp);
    });
    
    formData.set('datum',datum);
    zanr1.forEach(zanr=>{
      formData.append('zanr',zanr);
    })
  
    formData.set('opis',opis);
    formData.set('strane',strane);
    formData.set('odobrena',odobrena);
    formData.set('ocena',ocena);
   
    if(!slika){
      formData.set('zameniSliku','ne');
    }
    else{
      formData.set('zameniSliku','da');
    }
    //alert('ovde')
    return this.http.post(`${this.uri}/updateKnjiga`,formData);
  }

  ukloniZanr(zanr){
    return this.http.post(`${this.uri}/deleteZanr`,zanr);
  }


  deleteZahtevZaDesavanje(zahtev){
    return this.http.post(`${this.uri}/deleteZahtevZaDesavanje`,zahtev);
  }
}
