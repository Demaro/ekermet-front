import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';

import {  UserService } from '../services/user_service';
import {MatSnackBar} from '@angular/material';
import { SnackbarComponent } from 'src/app/snackbar/snackbar.component';
import { PlanMensualService } from '../services/plan-mensual.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
  })
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    emailPattern = "[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}";
    error = "";

    error_email = "";

    error_name = "";

    returnUrl: string;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private userService: UserService,
        private auth: AuthenticationService,
        private snack: MatSnackBar,
        public planServices: PlanMensualService,
        public zone: NgZone
   ) { }

    ngOnInit() {

        this.auth.newRegex = "";

        this.registerForm = this.formBuilder.group({
            first_name: ['', Validators.required],
            username: ['', Validators.required],
            email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
        this.auth.routernav = true;
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;

        this.auth.register(this.registerForm.value.first_name, this.registerForm.value.username,
            this.registerForm.value.email, this.registerForm.value.password)

            .pipe(first())
            .subscribe(

                data => {


                  this.auth.if_register = true;


                    this.auth.login(this.registerForm.value.email, this.registerForm.value.password)
                    .subscribe(

                        data =>{

                          this.auth.userCurrent = data;
                          this.auth.userCurrent = JSON.parse(localStorage.getItem('currentUser'));

                          this.auth.username_get = this.auth.userCurrent.name

                          this.auth.token = this.auth.userCurrent.token;



                          this.loading = false;
                          this.zone.run(() => this.router.navigate(['panel']));


                          this.auth.contactsend(
                              this.auth.userDataGoogle.displayName,
                              this.auth.userDataGoogle.email,
                              0,
                              "Demaro Create",
                              "Nuevo Usuario Registrado!")


                              .pipe(first())

                              .subscribe(
                                data => {
                                  this.loading = false;



                                  this.auth.authenticated = true;

                                },
                                error => {
                                  console.log("error al enviar: ", error);
                                }
                              )




                          this.auth.authenticated = true;

                        },
                        error => {
                            console.log("error loggin: ", error)

                            this.loading = false;
                        }

                    )

                },

                error => {

                    if (error.error.email) {

                        this.error_email = error.error.email.toString()
                        this.error = this.error_email

                        this.auth.error_loggin_mess = this.error
                        this.auth.error_reg = true;

                        this.auth.newRegex_reg2 = this.error

                        this.snack.openFromComponent(SnackbarComponent, {
                            duration: 3000,
                          });

                          this.auth.error_loggin_mess = "";

                          this.loading = false;



                          this.auth.error_loggin_mess = "";





                    }



                    if (error.error.username) {

                    this.error_name = error.error.username.toString()


                    this.error = this.error_name


                    this.loading = false;


                    this.auth.error_loggin_mess = this.error
                    this.auth.error_reg = true;

                    this.auth.newRegex_reg2 = this.error


                    this.snack.openFromComponent(SnackbarComponent, {
                      duration: 3000,
                    });

                    this.auth.error_loggin_mess = "";

                    this.loading = false;



                }

                });

}

}

