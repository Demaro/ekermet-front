import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {  UserService } from '../services/user_service';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/user';
import { first } from 'rxjs/operators';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  contactForm: FormGroup;
  send: boolean = true;
  loading: boolean = false;
  submitted = false;
  emailPattern = "[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}";

  currentUser: User; 
  users: User[] = [];
  
  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    public auth: AuthenticationService,
    public data: User,
    public snack: MatSnackBar,
  ) { this.auth.userCurrent = JSON.parse(localStorage.getItem('currentUser'));}
  

  ngOnInit() {
        this.auth.routernav = true;
        
        this.auth.sender = false;
        this.send = true;
        

        this.auth.newRegex = "";
        this.auth.newRegex_reg2 = "";


    
        this.contactForm = this.formBuilder.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
            fono: [],
            company: [''],
            message: ['', [Validators.required]]
        });

        

}

get f() { return this.contactForm.controls; }


onSubmit(){


  this.submitted = true;
  
  
         // stop here if form is invalid
         if (this.contactForm.invalid) {
             return;
         }

         this.send = false;
         this.loading = true;
         this.auth.contactsend(this.contactForm.value.name, this.contactForm.value.email, 
          this.contactForm.value.fono, this.contactForm.value.company, this.contactForm.value.message)
          

          .pipe(first())
          
          .subscribe(
            data => {
             
              console.log("data enviada!: ", data)

              this.loading = false;
              this.auth.sender = true;

              this.snack.openFromComponent(SnackbarComponent, {
                duration: 3000,
              });
            },
            error => {
              console.log("error al enviar");
              this.send = true;
              this.loading = false;
            }
          )

         

}

}


