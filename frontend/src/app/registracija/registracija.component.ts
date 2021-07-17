import { Component, OnInit } from '@angular/core';
import { ServisService } from '../servis.service';
import { Form } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Component({
  selector: 'app-registracija',
  templateUrl: './registracija.component.html',
  styleUrls: ['./registracija.component.css']
})
export class RegistracijaComponent implements OnInit {
  ime: String;
  prezime: String;
  username: String;
  password: String;
  password1: String;
  datumRodj: String;
  grad: String;
  drzava: String;
  email: String;
  slika;
  myForm: Form;
  nisamRobot: boolean;
  poruka: String;
  flag: boolean;

  constructor(private servis : ServisService, private router: Router) { }

  ngOnInit(): void {
    this.nisamRobot = false;
    this.poruka = '';
  }

  resolved(event){
    this.nisamRobot = true;
  }

  registruj(){
    if(!this.ime || !this.prezime || !this.username || !this.password ||
      !this.datumRodj || !this.grad || !this.drzava || !this.email){
        this.poruka = 'Popuni polja!';
        return;
      }
    if(this.password != this.password1){
      this.poruka = 'Lozinke se ne poklapaju!';
      return;
    }
    var pattern = /^[A-Za-z0-9#*.!?\$]{7,}$/;
    if (!pattern.test(this.password.toString())) {
      this.poruka='Lozinka mora da sadrzi minimum 7 karaktera';
      return;
    }
    pattern = /[A-Z]{1}/;
    if (!pattern.test(this.password.toString())) {
      this.poruka="Lozinka mora da sadrzi minimum jedno veliko slovo";
      return;
    }
    pattern = /[0-9]{1}/;
    if (!pattern.test(this.password.toString())) {
      this.poruka="Lozinka mora da sadrzi minimum jedan broj";
      return;
    }
    pattern = /[#*.!?\$]{1}/;
    if (!pattern.test(this.password.toString())) {
      this.poruka="Lozinka mora da sadrzi minimum jedan specijalan znak";
      return;
    }

    if(!this.nisamRobot){
      this.poruka = 'Potvrdi da nisi robot!';
      return;
    }

    var korisnici:User[];
    var zahtevi:User[];
    this.flag = true;
    this.servis.dohvatiSveKorisnike().subscribe((tmp:User[])=>{
      korisnici = tmp;
      korisnici.forEach(korisnik=>{
        if(korisnik.username == this.username || korisnik.email == this.email){
          this.flag = false;
        }
      })
      this.servis.dohvatiSveZahteve().subscribe(tmp=>{
        zahtevi = tmp;
        zahtevi.forEach(zahtev=>{
          //alert(zahtev.username);
          console.log(zahtev.username)
          if(zahtev.username == this.username || zahtev.email == this.email){
            //alert('USAO');
            this.flag = false;
            //alert(this.flag)
          }
        })
        if(this.flag == true){
          this.servis.registruj(this.ime,this.prezime,this.username,this.password,
            this.datumRodj,this.grad,this.drzava,this.email,this.slika).subscribe(tmp=>{
              this.ime = '';
              this.prezime = '';
              this.username = '';
              this.password = '';
              this.password1 = '';
              this.datumRodj = '';
              this.grad = '';
              this.drzava = '';
              this.email = '';
              this.slika = null;
              this.nisamRobot = false;
              //this.poruka = 'Uspesna registracija!';
              alert('Uspesna registracija!');
              location.reload();
            });
        }
        else{
          this.poruka = 'Korisnicko ime ili email je vec zauzeto!';
        }
      });
      
      
    });
    
      
  }

  odabranaSlika(event){
    if (event.target.files.length > 0){
      const file = event.target.files[0];
      this.slika = file;
    }
  }

  nazad(){
    this.router.navigate(['/login']);
  }

}
