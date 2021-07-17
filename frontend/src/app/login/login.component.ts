import { Component, OnInit } from '@angular/core';
import { ServisService } from '../servis.service';
import { Router } from '@angular/router';
import { User } from '../models/user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;
  message: String;

  constructor(private servis: ServisService,private router: Router) { }
  //korisnik: User;
  ngOnInit(): void {
  }

  login(){
    //let korisnik: User;
    //alert(this.username)
    this.servis.login(this.username,this.password).subscribe((user: User)=>{
      if(user[0]){
        localStorage.setItem('ulogovan',JSON.stringify(user[0]));
        if(user[0].tip == 'korisnik') this.router.navigate(['/registrovani'])
        if(user[0].tip == 'admin') this.router.navigate(['/admin'])
        if(user[0].tip == 'moderator') this.router.navigate(['/moderator']); 
      }
      else{
        this.message = 'Neispravni podaci!';
        this.username = '';
        this.password = '';
      }
    })
    
  }

}
