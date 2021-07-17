import { Component, OnInit } from '@angular/core';
import { ServisService } from '../servis.service';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Component({
  selector: 'app-promena',
  templateUrl: './promena.component.html',
  styleUrls: ['./promena.component.css']
})
export class PromenaComponent implements OnInit {
  stara: String;
  nova: String;
  nova1: String;
  poruka: String;
  constructor(private servis: ServisService,private router: Router) { }

  ngOnInit(): void {
  }

  promeni(){
    var user: User;
    user = JSON.parse(localStorage.getItem('ulogovan'));
    if(!user){
      this.poruka = 'Neulogovan korisnik!';
      return;
    }
    if(this.stara != user.password){
      this.poruka = 'Neispravna stara lozinka!';
      return;
    }
    if(this.nova != this.nova1){
      this.poruka = 'Nove lozinke nisu iste!';
    }
    var pattern = /^[A-Za-z0-9#*.!?\$]{7,}$/;
    if (!pattern.test(this.nova.toString())) {
      this.poruka='Lozinka mora da sadrzi minimum 7 karaktera';
      return;
    }
    pattern = /[A-Z]{1}/;
    if (!pattern.test(this.nova.toString())) {
      this.poruka="Lozinka mora da sadrzi minimum jedno veliko slovo";
      return;
    }
    pattern = /[0-9]{1}/;
    if (!pattern.test(this.nova.toString())) {
      this.poruka="Lozinka mora da sadrzi minimum jedan broj";
      return;
    }
    pattern = /[#*.!?\$]{1}/;
    if (!pattern.test(this.nova.toString())) {
      this.poruka="Lozinka mora da sadrzi minimum jedan specijalan znak";
      return;
    }
    user.password = this.nova;
    this.servis.izmeni(user).subscribe(tmp=>{
      localStorage.removeItem('ulogovan');
      this.router.navigate(['/login']);
      
    })
  }

  vrati(){
    this.router.navigate(['/registrovani']);
  }

}
