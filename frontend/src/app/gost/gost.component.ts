import { Component, OnInit } from '@angular/core';
import { ServisService } from '../servis.service';
import { Knjiga } from '../models/knjiga';
import { Router } from '@angular/router';
import { Desavanje } from '../models/desavanje';
import { Zanr } from '../models/zanr';

@Component({
  selector: 'app-gost',
  templateUrl: './gost.component.html',
  styleUrls: ['./gost.component.css']
})
export class GostComponent implements OnInit {
  naziv: string;
  autor: String[];
  zanr: String;
  sveKnjige: Knjiga[];
  pretrazeneKnjige: Knjiga[];
  svaDesavanja: Desavanje[];
  aktivnaDesavanja: Desavanje[];
  buducaDesavanja: Desavanje[];
  sviZanrovi: Zanr[];

  constructor(private servis: ServisService, private router: Router) { }

  ngOnInit(): void {
    this.aktivnaDesavanja = [];
    this.buducaDesavanja = [];
    this.servis.dohvatiSvaDesavanja().subscribe((tmp: Desavanje[])=>{
      this.svaDesavanja = tmp.filter(desavanje=>desavanje.tip == 'javno');
      this.svaDesavanja.forEach(pom=>{
        if(pom.status){
          this.aktivnaDesavanja.push(pom);
        }
      })
      this.svaDesavanja.forEach(pom=>{
        var datum;
        if(pom.pocetak && !pom.status){
          datum = pom.pocetak.split('-');
          //alert(datum)
          if(new Date(datum[0],datum[1]-1,datum[2]).getTime() > new Date().getTime()){
            this.buducaDesavanja.push(pom);
          }
        }

      })
    })
    this.servis.dohvatiSveZanrove().subscribe((tmp:Zanr[])=>{
      this.sviZanrovi = tmp;
    })
  }

  pretrazi(){
    this.servis.dohvatiSveKnjige().subscribe(tmp=>{
      this.sveKnjige = tmp;
      this.pretrazeneKnjige = this.sveKnjige;

      if(this.naziv){
        this.pretrazeneKnjige = this.pretrazeneKnjige.filter(knjiga => knjiga.naziv.indexOf(this.naziv)>=0);
      }
      if(this.autor){
        this.pretrazeneKnjige = this.pretrazeneKnjige.filter(knjiga => knjiga.autor == this.autor);
      }
      if(this.zanr){
        this.pretrazeneKnjige = this.pretrazeneKnjige.filter(knjiga => knjiga.zanr.includes(this.zanr));
      }
    })
  }

  stranica(knjiga){
    localStorage.setItem('knjigaGost',JSON.stringify(knjiga));
    this.router.navigate(['/knjigaGost']);
  }

  nazad(){
    this.router.navigate(['/login']);
  }
}
