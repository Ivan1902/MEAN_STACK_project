import { Component, OnInit } from '@angular/core';
import { ServisService } from '../servis.service';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-zaboravljena',
  templateUrl: './zaboravljena.component.html',
  styleUrls: ['./zaboravljena.component.css']
})
export class ZaboravljenaComponent implements OnInit {
  poruka: String;
  email: String;
  flag: boolean;

  constructor(private servis: ServisService, private router: Router) { }

  ngOnInit(): void {
  }

  posalji(){
    var korisnici: User[];
    var korisnik: User;
    this.flag = false;
    this.servis.dohvatiSveKorisnike().subscribe((tmp:User[])=>{
      korisnici = tmp;
      korisnici.forEach(tmp=>{
        if(tmp.email == this.email){
          
          this.flag = true;
          korisnik = tmp;
          localStorage.setItem('zaboravio',JSON.stringify(tmp));
        }
      })
      if(this.flag){
        //alert(korisnik.username)
        this.servis.posaljiMejl(korisnik).subscribe(tmp=>{
          this.poruka = 'Poslato!';
        })
      }
      else{
        this.poruka = 'Pogresan mejl!';
      }
    })
  }

  nazad(){
    this.router.navigate(['/login']);
  }

}
