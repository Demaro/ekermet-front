import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';


@Component({
  selector: 'app-auth-save',
  templateUrl: './auth-save.component.html',
  styleUrls: ['./auth-save.component.css']
})

@Injectable()
export class AuthSaveComponent2 implements CanActivate {

  constructor(private router: Router, public auth: AuthenticationService) { }

  canActivate() {
    if (localStorage.getItem('currentUser')) {
      this.auth.authenticated = true;
      //console.log(this.auth.authenticated)
        // logged in so return true
        return true;
    }



        }
  


    }

        
