import { Component, OnInit } from '@angular/core';
import { Desavanje } from '../models/desavanje';
import { ServisService } from '../servis.service';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Component({
  selector: 'app-pregled-desavanja',
  templateUrl: './pregled-desavanja.component.html',
  styleUrls: ['./pregled-desavanja.component.css']
})
export class PregledDesavanjaComponent implements OnInit {
  svaDesavanja: Desavanje[];
  korisnik: User;

  constructor(private servis: ServisService, private router: Router) { }

  ngOnInit(): void {
    this.korisnik = JSON.parse(localStorage.getItem('ulogovan'));
    this.servis.dohvatiSvaDesavanja().subscribe((tmp:Desavanje[])=>{
      this.svaDesavanja = tmp;
    })
  }

  desavanje(event){
    //(event.naziv)
    localStorage.setItem('desavanje',JSON.stringify(event));
    this.router.navigate(['/desavanje']);
  }

  nazad(){
    if(this.korisnik.tip == 'korisnik') this.router.navigate(['/registrovani']);
    if(this.korisnik.tip == 'moderator') this.router.navigate(['/moderator']);
    if(this.korisnik.tip == 'admin') this.router.navigate(['/admin']);
  }

}
