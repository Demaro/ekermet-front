import { Component, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { first } from 'rxjs/operators';

 
import { User } from '../models/user';
import { UserService } from '../services/user_service';
import { AuthenticationService } from '../services/authentication.service';


 
@Component(
    {templateUrl: 'home.component.html',
          styleUrls: ['./home.component.scss']}
)
export class HomeComponent implements OnInit, AfterViewInit {
    currentUser: User;
    users: User[] = []; 

 
    constructor(private userService: UserService, public auth: AuthenticationService, public cdRef: ChangeDetectorRef) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }


    ngOnInit () { 
        setTimeout (() => { 
            this.auth.colornav = false;
        }); 
    } 
 

    ngAfterViewInit() {
        setTimeout (() => { 
            
        this.auth.colornav = false;
        

        });

  }
 
deleteUser(id: number) {
        this.userService.delete(id).pipe(first()).subscribe(() => {
            this.loadAllUsers()
        });
}
 
    private loadAllUsers() {
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.users = users;
        });
    }


logout() {
      // remove user from local storage to log user out
      this.auth.logout

  }

  colornavchange(){
      this.auth.colornav = !this.auth.colornav;
  }

}




