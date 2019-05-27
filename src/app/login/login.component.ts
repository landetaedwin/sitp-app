import { Component, OnInit } from '@angular/core';
import { Constantes } from '../resources/constantes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username:string;
  password:string;

  constructor(public constantes:Constantes, public router:Router) {
   }

  ngOnInit() {
  }


  verifyLogin(){
    let isLogin:boolean = true;

    if(isLogin){
      this.router.navigate(['/menu']);
    }


  }

}
