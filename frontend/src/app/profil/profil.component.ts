import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { ServisService } from '../servis.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  korisnik: User;
  poruka: String;
  ulogovan: User;

  constructor(private servis: ServisService,private router: Router) { }

  ngOnInit(): void {
    this.korisnik = JSON.parse(localStorage.getItem('profil'))
    this.ulogovan = JSON.parse(localStorage.getItem('ulogovan'));
  }

  zaprati(){
    
    if(this.korisnik.pratioci.includes(this.ulogovan.username) ){
      this.poruka = 'Vec pratite ovog korisnika!';
    }
    else{
      this.korisnik.pratioci.push(this.ulogovan.username);
      this.servis.sacuvajIzmeneKorisnika(this.korisnik).subscribe(tmp=>{
        this.poruka = 'Uspesno ste zapratili ovog korisnika!';
      })
    }
  }

  nazad(){
    localStorage.removeItem('profil');
    this.router.navigate(['/registrovani']);
  }

}
