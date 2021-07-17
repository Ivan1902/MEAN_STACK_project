import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { ServisService } from '../servis.service';
import { Knjiga } from '../models/knjiga';
import { Router } from '@angular/router';
import { ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Komentar } from '../models/komentar';
import { Desavanje } from '../models/desavanje';
import { Zanr } from '../models/zanr';
import { ZahtevZaDesavanje } from '../models/zahtevZaDesavanje';

@Component({
  selector: 'app-registrovani',
  templateUrl: './registrovani.component.html',
  styleUrls: ['./registrovani.component.css']
})
export class RegistrovaniComponent implements OnInit {
  korisnik: User;
  promena: boolean;
  poruka: String;
  sveKnjige: Knjiga[];
  procitao: Knjiga[];
  cita: Knjiga[];
  cekanje: Knjiga[];
  zaBrisanje: Knjiga;
  zanrovi: String[];
  procenat: number[];
  data: Object[];
  sviKomentari: Komentar[];
  mojiKomentari: Komentar[];
  ime: String;
  prezime: String;
  username: String;
  email: String;
  pretrazeniKorisnici: User[];
  sviKorisnici: User[];
  flag1: boolean;
  flag2: boolean;
  naziv: string;
  autor: String[];
  zanr: String; 
  pretrazeneKnjige: Knjiga[];
  flag3: boolean;
  flag4: boolean;
  slika;
  slika1;
  nazivUnos: String;
  autorUnos: String[];
  datumUnos: String;
  zanrUnos: Array<String>;
  opisUnos: String;
  straneUnos: Number;
  poruka1: String;
  nazivUnos1: String;
  autorUnos1: String[];
  datumUnos1: String;
  zanrUnos1: Array<String>;
  opisUnos1: String;
  straneUnos1: Number;
  poruka4: String;
  svaDesavanja: Desavanje[];
  desavanjaZaPrijavu: Desavanje[];
  //poruka2: String;
  nazivDesavanja: String;
  nazivCompleted: Boolean;
  pocetakDesavanja: String;
  pocetakCompleted: Boolean;
  krajDesavanja: String;
  krajCompleted: Boolean;
  opisDesavanja: String;
  opisCompleted: Boolean;
  ucesniciDesavanja: Array<String>;
  ucesniciCompleted: Boolean;
  pratim: Array<String>;
  porukaNaziv: String;
  poruka3: String;
  flag5: boolean;
  checkboxNiz: boolean[];
  sviZanrovi: Zanr[];
  datum: Date;
  zahteviZaOdobravanje: ZahtevZaDesavanje[];
  poruka5: String;


  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter:(value,ctx)=>{
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };

  public pieChartLabels: String[];/* = ['A1','A2','A3'];*/
  public pieChartData: number[];/* = [300,500,100];*/
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [pluginDataLabels];
  
  constructor(private servis: ServisService, private router: Router) { }

  ngOnInit(): void {
    this.ucesniciDesavanja = new Array<String>();
    this.nazivCompleted = false;
    this.pocetakCompleted = false;
    this.krajCompleted = false;
    this.opisCompleted = false;
    this.ucesniciCompleted = false;
    this.korisnik = JSON.parse(localStorage.getItem('ulogovan'));
    this.korisnik.aktivan = 'sada';
    this.pratim = [];
    this.servis.dohvatiSveKorisnike().subscribe((tmp:User[])=>{
      tmp.forEach(pom=>{
        //alert(pom.username)
        if(pom.username!=this.korisnik.username && pom.pratioci.includes(this.korisnik.username)){
          
          this.pratim.push(pom.username);
        }
      })
    })
    this.checkboxNiz = [];
    for(var i = 0; i < this.korisnik.obavestenja.length; i++){
      this.checkboxNiz[i] = false;
    }
    
    this.servis.dohvatiSveKnjige().subscribe(tmp=>{
      this.sveKnjige = tmp;

      this.procitao = this.sveKnjige.filter(knjiga => knjiga.procitao.includes(this.korisnik.username));
      this.cita = this.sveKnjige.filter(knjiga => knjiga.cita.includes(this.korisnik.username));
      this.cekanje = this.sveKnjige.filter(knjiga => knjiga.cekanje.includes(this.korisnik.username));
      
      
      this.zanrovi = [];
      this.procitao.forEach(knjiga=>{
       
        knjiga.zanr.forEach(zanr=>{
          //alert(zanr)
          if(this.zanrovi.indexOf(zanr) == -1){
            this.zanrovi.push(zanr);
            
          }
        })
      })
      
      this.procenat = [];
      var i = 0;
      for(i = 0 ; i < this.zanrovi.length; i++){
        //alert('gotovo')
        this.procenat[i] = 0;
      }
      i = 0;
      
      this.zanrovi.forEach(zanr=>{
        this.procitao.forEach(knjiga=>{
          knjiga.zanr.forEach(zanr1=>{
            if(zanr == zanr1){
              this.procenat[i] = this.procenat[i] + 1;
            }
          })
        })
        i++;
      })

      var sum = 0;
      this.procenat.forEach(tmp=>{
        sum += tmp;
      })

      this.procenat.forEach(tmp=>{
        tmp = tmp/sum;
      })
      
      this.pieChartLabels = this.zanrovi;
      this.pieChartData = this.procenat;
      
    })

    this.servis.dohvatiSveKomentare().subscribe(tmp=>{
      this.sviKomentari = tmp;
      this.mojiKomentari = this.sviKomentari.filter(komentar=> komentar.username == this.korisnik.username);
    })

    this.servis.dohvatiSvaDesavanja().subscribe((tmp:Desavanje[])=>{
      this.svaDesavanja = tmp;
      this.desavanjaZaPrijavu = [];
      this.svaDesavanja.forEach(desavanje=>{
        if(desavanje.organizator!=this.korisnik.username){
          if(!desavanje.ucesnici.includes(this.korisnik.username)){
            this.desavanjaZaPrijavu.push(desavanje);
          }
        }
      })
    })
    this.servis.dohvatiSveZanrove().subscribe((tmp:Zanr[])=>{
      this.sviZanrovi = tmp;
    })

    this.servis.sviZahteviZaDesavanja().subscribe((tmp:ZahtevZaDesavanje[])=>{
      this.zahteviZaOdobravanje = [];
      tmp.forEach(pom=>{
        if(pom.organizator == this.korisnik.username){
          this.zahteviZaOdobravanje.push(pom);
        }
      })
    })
  }

  promeni(){
    this.promena = true;
  }

  sacuvaj(){
    this.promena = false;
    this.servis.sacuvajIzmeneKorisnika(this.korisnik).subscribe(tmp=>{
      this.poruka = 'Uspesno sacuvano!';
    })
  }

  ukloni(knjiga){
    //alert('Poziv')
    this.zaBrisanje = knjiga;
    var index = this.zaBrisanje.cekanje.indexOf(this.korisnik.username);
    this.zaBrisanje.cekanje.splice(index,1);
    //alert('ovde')
    this.servis.izmeniCekanje(this.zaBrisanje).subscribe(pom=>{
      this.servis.dohvatiSveKnjige().subscribe(tmp=>{
        this.sveKnjige = tmp;
        this.procitao = this.sveKnjige.filter(knjiga => knjiga.procitao.includes(this.korisnik.username));
        this.cita = this.sveKnjige.filter(knjiga => knjiga.cita.includes(this.korisnik.username));
        this.cekanje = this.sveKnjige.filter(knjiga => knjiga.cekanje.includes(this.korisnik.username));
        
      })
    })
  }

  odaberi(knjiga){
    localStorage.setItem('knjigaRegistrovani',JSON.stringify(knjiga));
    this.router.navigate(['/knjigaRegistrovani']);
  }

  odaberi1(naziv){
    //alert(naziv)
    var tmp: Knjiga;
    var flag;
    flag = false;
    this.sveKnjige.forEach(knjiga=>{
      if(!flag && knjiga.naziv == naziv){
        //alert('ovde')
        tmp = knjiga;
        flag = true;
      }
    })
    this.odaberi(tmp);
  }

  pretrazi(){
    this.servis.dohvatiSveKorisnike().subscribe((tmp:User[])=>{
      this.sviKorisnici = tmp;
      this.pretrazeniKorisnici = this.sviKorisnici;
      if(this.ime){
        this.pretrazeniKorisnici = this.pretrazeniKorisnici.filter(korisnik=> korisnik.ime == this.ime);
      }
      if(this.prezime){
        this.pretrazeniKorisnici = this.pretrazeniKorisnici.filter(korisnik=> korisnik.prezime == this.prezime);
      }
      if(this.username){
        this.pretrazeniKorisnici = this.pretrazeniKorisnici.filter(korisnik=> korisnik.username == this.username);
      }
      if(this.email){
        this.pretrazeniKorisnici = this.pretrazeniKorisnici.filter(korisnik=> korisnik.email == this.email);
      }
      if(this.pretrazeniKorisnici.length == 0){
        this.flag1 = false;
        this.flag2 = true;
        
      }
      else{
        this.flag1 = true;
        this.flag2 = false;
      }
    })
  }

  profil(username){
    var pom: User;
    this.servis.profil(username).subscribe((tmp:User)=>{
      pom = tmp[0];
      localStorage.setItem('profil',JSON.stringify(pom));
      this.router.navigate(['/profil']);
    })
  }

  pretraziKnjige(){
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

      if(this.pretrazeneKnjige.length != 0){
        this.flag3 = true;
        this.flag4 = false;
      }
      else{
        this.flag3 = false;
        this.flag4 = true;
      }
    })
  }

  odabranaSlika(event){
    if (event.target.files.length > 0){
      const file = event.target.files[0];
      this.slika = file;
    }
  }

  odabranaSlika1(event){
    if (event.target.files.length > 0){
      const file = event.target.files[0];
      this.slika1 = file;
    }
  }

  dodajKnjigu(){

    
    this.servis.dodajKnjigu(this.slika,this.nazivUnos,this.autorUnos,this.datumUnos,this.zanrUnos,this.opisUnos,this.straneUnos).subscribe(tmp=>{
      if(this.zanrUnos.length > 3){
        this.poruka1 = 'Maksimalan broj zanrova je 3';
        return;
      }
      for(var i=0; i < this.zanrUnos.length; i++){
        this.servis.dohvatiZanr(this.zanrUnos[i]).subscribe((tmp:Zanr)=>{
          tmp = tmp[0];
          tmp.broj = tmp.broj + 1;
          this.servis.updateZanr(tmp).subscribe(pom=>{
            this.poruka1 = 'Uspesan unos knjige!';
            this.slika = '';
            this.nazivUnos = '';
            this.autorUnos = null;
            this.datumUnos = '';
            this.zanrUnos = null;
            this.opisUnos = '';
            this.straneUnos = null;
          })
        })
      }
     
    })
  }

  dodajKnjigu1(){
    //alert(this.datumUnos);
    this.servis.dodajKnjigu(this.slika1,this.nazivUnos1,this.autorUnos1,this.datumUnos1,this.zanrUnos1,this.opisUnos1,this.straneUnos1).subscribe(tmp=>{
      if(this.zanrUnos1.length > 3){
        this.poruka4 = 'Maksimalan broj zanrova je 3';
        return;
      }
      for(var i = 0 ; i < this.zanrUnos1.length; i++){
        //alert(this.zanrUnos1[i])
        this.servis.dohvatiZanr(this.zanrUnos1[i]).subscribe((tmp:Zanr)=>{
          //alert('aaaaa')
          tmp = tmp[0];
          tmp.broj = tmp.broj + 1;
          this.servis.updateZanr(tmp).subscribe(pom=>{
            this.poruka4 = 'Uspesan unos knjige!';
            this.slika1 = '';
            this.nazivUnos1 = '';
            this.autorUnos1 = null;
            this.datumUnos1 = '';
            this.zanrUnos1 = null;
            this.opisUnos1 = '';
            this.straneUnos1 = null;
          })
        })
      }
      
    })
  }

 

  prijavi_se(desavanje){
    var desavanje1: Desavanje;
    //alert(desavanje.naziv)
    desavanje1 = desavanje;
    desavanje1.ucesnici.push(this.korisnik.username);
    this.servis.updateUcesnici(desavanje1).subscribe(tmp=>{
      this.servis.dohvatiSvaDesavanja().subscribe((tmp:Desavanje[])=>{
        this.svaDesavanja = tmp;
        this.desavanjaZaPrijavu = [];
        this.svaDesavanja.forEach(desavanje=>{
          if(desavanje.organizator!=this.korisnik.username ){
            if(!desavanje.ucesnici.includes(this.korisnik.username)){
              this.desavanjaZaPrijavu.push(desavanje);
            }
          }
        })
        
    
      })
    })
  }

  napravi(){
    let flag = true;
    let pocetak;
    let kraj;
    let status;
    let tip;
    if(this.pocetakDesavanja){
      pocetak = this.pocetakDesavanja.split('-');
    }
    else{
      pocetak = 0;
    }
    if(this.krajDesavanja){
      kraj = this.krajDesavanja.split('-');
    }
    else{
      kraj = 0;
    }
    if(pocetak){
      if(new Date(pocetak[0],pocetak[1]-1,pocetak[2]).getTime() > new Date().getTime()){
        flag = false;
      }
    }
    if(kraj){
      if(new Date(kraj[0],kraj[1]-1,kraj[2]).getTime() < new Date().getTime()){
        flag = false;
      }
    }
    status = flag;
    if(this.korisnik.tip == 'korisnik'){
      tip = 'privatno';
    }
    if(this.korisnik.tip == 'moderator'){
      tip = 'javno';
    }
    //alert('a')
    if(this.ucesniciDesavanja.length){
      //alert('c')
      this.servis.dodajDesavanje(this.korisnik.username,this.nazivDesavanja,this.pocetakDesavanja,this.krajDesavanja,this.opisDesavanja,this.ucesniciDesavanja,status,tip).subscribe(tmp=>{
        this.poruka3 = 'Uspesno dodat dogadjaj!';
      })
    }
    else{
     //alert('b')
      
      this.servis.dodajDesavanje(this.korisnik.username,this.nazivDesavanja,this.pocetakDesavanja,this.krajDesavanja,this.opisDesavanja,[],status,tip).subscribe(tmp=>{
        this.poruka3 = 'Uspesno dodat dogadjaj!';
      })
    }
    
  }

  nazivCompleted1(){
    if(this.nazivDesavanja){
      this.nazivCompleted = true;
      this.porukaNaziv = '';
    }
    else this.porukaNaziv = 'Unesite naziv dogadjaja!';
    
  }

  pocetakCompleted1(){
    this.pocetakCompleted = true;
  }

  krajCompleted1(){
    this.krajCompleted = true;
  }

  opisCompleted1(){
    this.opisCompleted = true;
  }

  desavanje(event){
    localStorage.setItem('desavanje',JSON.stringify(event));
    this.router.navigate(['/desavanje']);
  }

  promeniLozinku(){
    this.router.navigate(['/promena']);
  }

  logout(){
    this.datum = new Date();
    this.korisnik.aktivan = this.datum.getHours()+':'+this.datum.getMinutes()+' , '+this.datum.getFullYear()+'-'+Number(this.datum.getMonth()+1)+'-'+this.datum.getDate();
    //alert(this.korisnik.aktivan)
    this.servis.sacuvajIzmeneKorisnika(this.korisnik).subscribe(tmp=>{
      localStorage.removeItem('ulogovan');
      this.router.navigate(['/login']);
    })
    
  }


  obavestenje1(){
    this.flag5 = !this.flag5;
  }

  ukloniObavestenje(i){
    //var i = this.korisnik.obavestenja.indexOf(obavestenje);
    
    this.korisnik.obavestenja.splice(i,1);
    
    localStorage.setItem('ulogovan',JSON.stringify(this.korisnik));
    this.servis.sacuvajIzmeneKorisnika(this.korisnik).subscribe(tmp=>{

    });
  }

  odobri(zahtevZaDesavanje){
    var tmp: Desavanje;
    this.svaDesavanja.forEach(desavanje=>{
      if(desavanje.naziv == zahtevZaDesavanje.desavanje){
        tmp = desavanje;
      }
    })
    tmp.ucesnici.push(zahtevZaDesavanje.korisnik);
    this.servis.updateDesavanje(tmp).subscribe(pom=>{
      this.servis.deleteZahtevZaDesavanje(zahtevZaDesavanje).subscribe(cc=>{
        var i = this.zahteviZaOdobravanje.indexOf(zahtevZaDesavanje);
        this.zahteviZaOdobravanje.splice(i,1);
        this.poruka5 = 'Uspesno odobreno!';
      })
    })
  }

  odbij(zahtevZaDesavanje){
    this.servis.deleteZahtevZaDesavanje(zahtevZaDesavanje).subscribe(cc=>{
      var i = this.zahteviZaOdobravanje.indexOf(zahtevZaDesavanje);
      this.zahteviZaOdobravanje.splice(i,1);
      this.poruka5 = 'Uspesno odbijeno!';
    })
  }
}
