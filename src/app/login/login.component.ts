import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import {AuthenticationService } from '../services/authentication.service';
import {MatSnackBar} from '@angular/material';
import { SnackbarComponent } from 'src/app/snackbar/snackbar.component';
import { PlanMensualService } from '../services/plan-mensual.service';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
  })
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    emailPattern = "[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}";

    hola = '{"email" username":[" Contraseña Incorrecta."]}';
    newRegex = "";
    error = "";
    error1 = "";

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        public snack: SnackbarComponent,
        public snackBar: MatSnackBar,
        public planServices: PlanMensualService,
        private zone:NgZone
  ) {}




    ngOnInit() {

        this.authenticationService.colornav = false;
        window.scrollTo(0, 0)

        this.authenticationService.newRegex_reg2 = "";

        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
            password: ['', Validators.required]
        });

        // reset login status
        this.authenticationService.logout();


        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.f.email.value, this.f.password.value)

        .pipe(first())
        .subscribe(

                data => {


                    this.authenticationService.userCurrent = JSON.parse(localStorage.getItem('currentUser'));

                    this.authenticationService.username_get = this.authenticationService.userCurrent.name
                    console.log(this.authenticationService.userCurrent)



                    this.authenticationService.authenticated = true;

                    if(this.authenticationService.authenticated){
                        this.planServices.UserAuthPlan().subscribe(res =>{
                          console.log("plan user auth:", res)
                          this.planServices.plan_mensual = res;
                          this.planServices.sueldo = this.planServices.plan_mensual.sueldo;

                          this.loading = false;
                          this.zone.run(() => this.router.navigate(['panel']));

                        },
                      error => {
                        console.log("wut? ", error)
                      })


                      }
                },

                error =>  {

                    this.error1 = error.error.w.toString()
                    this.error = this.error1
                    this.loading = false;


                    this.authenticationService.error_loggin_mess = this.error
                    this.authenticationService.error_login = true;

                    this.authenticationService.newRegex = this.error


                    this.snackBar.openFromComponent(SnackbarComponent, {
                      duration: 3000,
                    });

                    this.authenticationService.error_loggin_mess = "";

                    this.loading = false;


                });
    }


    openSnackBar() {
        this.snackBar.openFromComponent(SnackbarComponent, {
          duration: 3000,
        });

      }

      doGoogleLogin(){

        this.loading = true;
        this.authenticationService.doGoogleLogin()
        .then(res => {
            if (res.user) {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
                this.authenticationService.userDataGoogle = res.user
                this.authenticationService.login(this.authenticationService.userDataGoogle.email, this.authenticationService.userDataGoogle.uid)

        .pipe(first())
        .subscribe(

                data => {



                    this.authenticationService.userCurrent = data;

                    //this.authenticationService.username_get = this.authenticationService.userCurrent.name

                    this.authenticationService.userCurrent = JSON.parse(localStorage.getItem('currentUser'));

                    this.authenticationService.username_get = this.authenticationService.userCurrent.name

                    this.authenticationService.token = this.authenticationService.userCurrent.token;


                    //console.log(this.authenticationService.authenticated)

                    this.loading = false;
                    this.zone.run(() => this.router.navigate(['panel']));


                    this.authenticationService.authenticated = true;


                },

                error =>  {

              this.authenticationService.register(this.authenticationService.userDataGoogle.displayName, this.authenticationService.userDataGoogle.uid,
                this.authenticationService.userDataGoogle.email, this.authenticationService.userDataGoogle.uid)

                .subscribe(

                    data2 => {

                        this.authenticationService.if_register = true;

                        this.authenticationService.login(this.authenticationService.userDataGoogle.email, this.authenticationService.userDataGoogle.uid)
                        .pipe(first())
                        .subscribe(datalogin => {

                            this.authenticationService.userCurrent = datalogin;

                            //this.authenticationService.username_get = this.authenticationService.userCurrent.name

                            this.authenticationService.userCurrent = JSON.parse(localStorage.getItem('currentUser'));

                            this.authenticationService.username_get = this.authenticationService.userCurrent.name


                            //console.log(this.authenticationService.authenticated)


                            this.zone.run(() => this.router.navigate(['panel']));

                            this.authenticationService.contactsend(
                                this.authenticationService.userDataGoogle.displayName,
                                this.authenticationService.userDataGoogle.email,
                                0,
                                "Demaro Create",
                                "Nuevo Usuario Registrado!")


                                .pipe(first())

                                .subscribe(
                                  data => {
                                    this.loading = false;



                                    this.authenticationService.authenticated = true;

                                  },
                                  error => {
                                    console.log("error al enviar: ", error);
                                  }
                                )



                        })

                    },


                    error => {

                        console.log("error register: ",error)

                    }



                    );



                });


            }


          })


          .catch((error)=>{
            console.log(error);
            alert('loged Error!');
          })
      }

      doFacebookLogin(){
          //stop
      }
}

