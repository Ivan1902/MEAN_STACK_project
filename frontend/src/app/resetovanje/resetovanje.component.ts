import { Component, OnInit } from '@angular/core';
import { ServisService } from '../servis.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../models/user';

@Component({
  selector: 'app-resetovanje',
  templateUrl: './resetovanje.component.html',
  styleUrls: ['./resetovanje.component.css']
})
export class ResetovanjeComponent implements OnInit {
  lozinka: String;
  lozinka1: String;
  poruka: String;
  username: String;
  korisnik: User;
  constructor(private servis: ServisService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.username = this.route.snapshot.paramMap.get('username');
    //alert(this.username)
  }

  izmeni(){
    
    if(this.lozinka != this.lozinka1){
      this.poruka = 'Lozinke se ne poklapaju!';
      return;
    }
    var pattern = /^[A-Za-z0-9#*.!?\$]{7,}$/;
    if (!pattern.test(this.lozinka.toString())) {
      this.poruka='Lozinka mora da sadrzi minimum 7 karaktera';
      return;
    }
    pattern = /[A-Z]{1}/;
    if (!pattern.test(this.lozinka.toString())) {
      this.poruka="Lozinka mora da sadrzi minimum jedno veliko slovo";
      return;
    }
    pattern = /[0-9]{1}/;
    if (!pattern.test(this.lozinka.toString())) {
      this.poruka="Lozinka mora da sadrzi minimum jedan broj";
      return;
    }
    pattern = /[#*.!?\$]{1}/;
    if (!pattern.test(this.lozinka.toString())) {
      this.poruka="Lozinka mora da sadrzi minimum jedan specijalan znak";
      return;
    }
    this.servis.pretragaKorisnika(this.username).subscribe((tmp:User)=>{
      this.korisnik = tmp[0];
      this.korisnik.password = this.lozinka;
      this.servis.izmeni(this.korisnik).subscribe(tmp=>{
      
        localStorage.setItem('ulogovan',JSON.stringify(this.korisnik));
        if(this.korisnik.tip == 'korisnik') this.router.navigate(['/registrovani'])
        if(this.korisnik.tip == 'admin') this.router.navigate(['/admin'])
      
      
        this.poruka = 'Greska pri izmeni!';
      
    })
    })

    
  }
}
