import { Component, OnInit } from '@angular/core';
import { Knjiga } from '../models/knjiga';
import { ServisService } from '../servis.service';
import { User } from '../models/user';
import { Komentar } from '../models/komentar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-knjiga-registrovani',
  templateUrl: './knjiga-registrovani.component.html',
  styleUrls: ['./knjiga-registrovani.component.css']
})
export class KnjigaRegistrovaniComponent implements OnInit {

  knjiga: Knjiga;
  korisnik: User;
  status: String;
  poruka: String;
  strana: number;
  progress: number;
  cita = 'Cita';
  procitao1 = 'Procitao';
  komentar: Komentar;
  flag: boolean;
  poruka1: String;
  ocena: String;
  sviKomentari: Komentar[];
  sviKomentariKnjige: Komentar[];
  sveOceneKnjige: String[];
  flag1: boolean;

  constructor(private servis: ServisService,private router: Router) { }

  ngOnInit(): void {
    this.knjiga = JSON.parse(localStorage.getItem('knjigaRegistrovani'));
    this.korisnik = JSON.parse(localStorage.getItem('ulogovan'));
    if(this.knjiga.procitao.includes(this.korisnik.username)) {
      this.status = "Procitao";
      this.strana = this.knjiga.strane;
      this.progress = 100;
    }
    else if(this.knjiga.cita.includes(this.korisnik.username)) this.status = "Cita";
    else if(this.knjiga.cekanje.includes(this.korisnik.username)) this.status = "Cekanje";
    else this.status = '/';
    //this.komentar = new Komentar();
    this.servis.dohvatiKomentar(this.korisnik.username,this.knjiga.naziv).subscribe((tmp:Komentar)=>{
      //alert(tmp[0].tekst)
      if(tmp[0]){
        this.flag = true;
        this.komentar = tmp[0];
        var i;
        this.ocena='';
        for(i=0;i<this.komentar.ocena; i++){
          this.ocena += '*';
        }
      }
      else{
        this.flag = false;
        this.ocena = '';
        this.komentar = {
          username: this.korisnik.username,
          ime: this.korisnik.ime,
          prezime: this.korisnik.prezime,
          knjiga: this.knjiga.naziv,
          autor: this.knjiga.autor,
          ocena: null,
          tekst: null
        }
      }
    })

    this.servis.dohvatiSveKomentareKnjige(this.knjiga).subscribe((tmp:Komentar[])=>{
      this.sviKomentariKnjige = tmp;
      if(this.sviKomentariKnjige.length != 0) this.flag1 = true;
      var i = 0;
      this.sveOceneKnjige = [];
      for(i = 0 ; i < this.sviKomentariKnjige.length ; i++){
        //alert('aaaaaaa')
        //alert(this.sveOceneKnjige[i])
        this.sveOceneKnjige[i]='';
        //alert('bbbbb')
      }
      //alert(this.sveOceneKnjige[0])
      var j = 0;
      this.sviKomentariKnjige.forEach(tmp=>{
        
        for(i=0;i<tmp.ocena; i++){
          //alert('aaaaaaa')
          this.sveOceneKnjige[j] += '*';
        }
        j++;
        
      })
      
    })
    
  }

  procitao(){
    if(!this.knjiga.odobrena){
      this.poruka = 'Neodobrena knjiga!';
      return;
    }
    if(this.status == 'Procitao'){
      this.poruka = 'Knjiga je vec procitana!';
      return;
    }
    if(this.status == 'Cita'){
      var i;
       i = this.knjiga.cita.indexOf(this.korisnik.username);
       this.knjiga.cita.splice(i,1);
    }
    if(this.status == 'Cekanje'){
      var i;
      i = this.knjiga.cekanje.indexOf(this.korisnik.username);
      this.knjiga.cekanje.splice(i,1);
    }
    this.knjiga.procitao.push(this.korisnik.username);
    localStorage.setItem('knjigaRegistrovani',JSON.stringify(this.knjiga));
    this.servis.updateStatus(this.knjiga).subscribe(tmp=>{
    this.status = 'Procitao';
    this.poruka = '';
    this.strana = this.knjiga.strane;
    this.progress = 100;
    })
 }
    
  

  stavi(){
    if(!this.knjiga.odobrena){
      this.poruka = 'Neodobrena knjiga!';
      return;
    }
    if(this.status == 'Cekanje'){
      this.poruka = 'Knjiga je vec na cekanju!';
      return;
    }
    if(this.status == 'Procitao'){
      /*var i;
      
      i = this.knjiga.procitao.indexOf(this.korisnik.username);
      this.knjiga.procitao.splice(i,1);
      //alert('ovde')*/
      this.poruka = 'Ne mozes staviti na cekanje procitanu knjigu!'
      return;
    }
    if(this.status == 'Cita'){
      /*var i;
      i = this.knjiga.cita.indexOf(this.korisnik.username);
      this.knjiga.cita.splice(i,1);*/
      this.poruka = 'Ne mozes staviti na cekanje knjigu koju citas!';
      return;
    }
    this.knjiga.cekanje.push(this.korisnik.username);
    localStorage.setItem('knjigaRegistrovani',JSON.stringify(this.knjiga));
    this.servis.updateStatus(this.knjiga).subscribe(tmp=>{
    this.status = 'Cekanje';
    this.poruka = '';
    })
  }

  ukloni(){
    if(!this.knjiga.odobrena){
      this.poruka = 'Neodobrena knjiga!';
      return;
    }
    if(this.status == '/'){
      this.poruka = 'Knjiga nije na listi cekanja!';
      return;
    }
    
    else if(this.status == 'Cekanje'){
      var i;
      i = this.knjiga.cekanje.indexOf(this.korisnik.username);
      this.knjiga.cekanje.splice(i,1);
      localStorage.setItem('knjigaRegistrovani',JSON.stringify(this.knjiga));
      this.servis.updateStatus(this.knjiga).subscribe(tmp=>{
        this.status = '/';
        this.poruka = '';
        })
     
    }
    else{
      this.poruka = ' Knjiga nije na listi cekanja!';
    }
   
  }

  citam(){
    if(!this.knjiga.odobrena){
      this.poruka = 'Neodobrena knjiga!';
      return;
    }
    if(this.status == 'Cita'){
      this.poruka = 'Vec citam knjigu!';
      return;
    }
    if(this.status == 'Procitao'){
      var i;
       /*i = this.knjiga.procitao.indexOf(this.korisnik.username);
       this.knjiga.procitao.splice(i,1);*/
       this.poruka = 'Ne mozes citati knjigu koju si vec procitao!';
       return;
    }
    if(this.status == 'Cekanje'){
      var i;
      i = this.knjiga.cekanje.indexOf(this.korisnik.username);
       this.knjiga.cekanje.splice(i,1);
    }
    this.knjiga.cita.push(this.korisnik.username);
    localStorage.setItem('knjigaRegistrovani',JSON.stringify(this.knjiga));
    this.servis.updateStatus(this.knjiga).subscribe(tmp=>{
    this.status = 'Cita';
    this.poruka = '';

    })
  }

  promena(){
    
    this.progress = (100*this.strana)/this.knjiga.strane;
   
  }

  potvrdi(){
    var i;
    for(i = 0 ; i < this.ocena.length ; i++){
      if(this.ocena[i] != '*'){
        this.poruka1 = 'Neispravan format ocene!';
        return;
      }
    }
    this.komentar.ocena = this.ocena.length;
    if(this.flag){
      this.servis.updateKomentar(this.komentar).subscribe(tmp=>{
        this.servis.dohvatiSveKomentare().subscribe(tmp=>{
          this.sviKomentari = tmp;
          var n = 0;
          var sum = 0;
          this.sviKomentari.forEach(komentar=>{
            if(komentar.knjiga == this.komentar.knjiga){
              sum+=komentar.ocena;
              n++;}
            })
            //alert(sum);
            this.knjiga.ocena = sum/n;
            this.servis.updateOcena(this.knjiga).subscribe(tmp=>{
              localStorage.setItem('knjigaRegistrovani',JSON.stringify(this.knjiga));
              //if(this.korisnik.tip == 'korisnik'){
                this.korisnik.pratioci.forEach(pratilac => {
                  this.servis.pretragaKorisnika(pratilac).subscribe((korisnik:User)=>{
                    korisnik = korisnik[0];
                    if(!korisnik.obavestenja) korisnik.obavestenja = [];
                    korisnik.obavestenja.push('Korisnik ' + this.korisnik.username + ' je ostavio komentar na knjigu ' + this.knjiga.naziv);
                    //alert(korisnik.obavestenja[0]);
                    this.servis.sacuvajIzmeneKorisnika(korisnik).subscribe(pom=>{
  
                    })
                  })
                });
              //}
              // if(this.korisnik.tip == 'moderator' || this.korisnik.tip == 'admin'){
              //   this.servis.dohvatiSveKorisnike().subscribe((sviKorisnici: User[])=>{
              //     sviKorisnici.forEach(korisnik1=>{
              //       if(this.korisnik.tip =='moderator') korisnik1.obavestenja.push('Moderator ' + this.korisnik.username + ' je ostavio komentar na knjigu ' + this.knjiga.naziv);
              //       if(this.korisnik.tip == 'admin')  korisnik1.obavestenja.push('Admin ' + this.korisnik.username + ' je ostavio komentar na knjigu ' + this.knjiga.naziv);
              //       this.servis.sacuvajIzmeneKorisnika(korisnik1).subscribe(pom=>{
  
              //       })
              //     })
              //   })
              // }
              
              this.poruka1 = 'Uspesno dodato!';
            })
          })
          })
        
      //})
    }
    else{
      //alert('aaaaaaa')
      this.flag = true;
      this.servis.insertKomentar(this.komentar).subscribe(tmp=>{
        this.servis.dohvatiSveKomentare().subscribe(tmp=>{
          this.sviKomentari = tmp;
          var n = 0;
          var sum = 0;
          this.sviKomentari.forEach(komentar=>{
            if(komentar.knjiga == this.komentar.knjiga){
              sum+=komentar.ocena;
              n++;
            }
          })
            this.knjiga.ocena = sum/n;
            //alert(this.knjiga.ocena);
            this.servis.updateOcena(this.knjiga).subscribe(tmp=>{
              localStorage.setItem('knjigaRegistrovani',JSON.stringify(this.knjiga));
              this.korisnik.pratioci.forEach(pratilac => {
                this.servis.pretragaKorisnika(pratilac).subscribe((korisnik:User)=>{
                  korisnik = korisnik[0];
                  if(!korisnik.obavestenja) korisnik.obavestenja = [];
                  korisnik.obavestenja.push('Korisnik ' + this.korisnik.username + ' je ostavio komentar na knjigu ' + this.knjiga.naziv);
                  //alert(korisnik.obavestenja[0]);
                  this.servis.sacuvajIzmeneKorisnika(korisnik).subscribe(pom=>{

                  })
                })
              });
              this.poruka1 = 'Uspesno dodato!';
              
            })
          })
          })
        
      //})
    }

    
   
  }

  profil(username){
    this.servis.profil(username).subscribe((tmp:User)=>{
      localStorage.setItem('profil',JSON.stringify(tmp[0]));
      this.router.navigate(['/profil']);
    })
  }


  nazad(){
    this.router.navigate(['/registrovani']);
  }
}
