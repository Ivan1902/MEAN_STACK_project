import { Component, OnInit } from '@angular/core';
import { Knjiga } from '../models/knjiga';
import { ServisService } from '../servis.service';
import { Komentar } from '../models/komentar';
import { Zanr } from '../models/zanr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-knjiga-gost',
  templateUrl: './knjiga-gost.component.html',
  styleUrls: ['./knjiga-gost.component.css']
})
export class KnjigaGostComponent implements OnInit {

  knjiga: Knjiga;
  sviKomentari: Komentar[];
  

  constructor(private servis: ServisService, private router: Router) { }

  ngOnInit(): void {
    this.knjiga = JSON.parse(localStorage.getItem('knjigaGost'));
    this.servis.dohvatiSveKomentareKnjige(this.knjiga).subscribe((tmp: Komentar[])=>{
      this.sviKomentari = tmp;
    })

    
  }

  nazad(){
    this.router.navigate(['/gost']);
  }

}
