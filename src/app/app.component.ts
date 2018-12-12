import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { User } from './models/user';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { PlanMensualService } from './services/plan-mensual.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  
})
export class AppComponent implements OnInit {
  currentUser: User;
  count: number;
  username_array = []
  username_get = "";
  showStyle: false;

  version = "0.5.1";

  


  constructor(public auth: AuthenticationService, public planServices: PlanMensualService, private router: Router,) { 
  }

ngOnInit(){



  if (localStorage.getItem('currentUser')) {

    this.auth.authenticated = true;


    this.auth.userCurrent = JSON.parse(localStorage.getItem('currentUser'))
    this.auth.username_get = this.auth.userCurrent.name;

    console.log("Sesion de: ", this.auth.username_get)


  }


 
}

colornavchange(){
  this.auth.colornav = !this.auth.colornav;
}

logout(){
  this.auth.logout()

  this.router.navigate['login']
}



}




