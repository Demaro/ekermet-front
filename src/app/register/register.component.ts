import { Component, OnInit } from '@angular/core';
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
        public planServices: PlanMensualService
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
                    

                    this.auth.login(this.registerForm.value.email, this.registerForm.value.password)
                    .subscribe(

                        data2 =>{

                            this.auth.userCurrent = JSON.parse(localStorage.getItem('currentUser'));
                            //console.log(this.auth.userCurrent)
                            this.auth.authenticated = true;

                            this.auth.username_get = this.auth.userCurrent.name
                            
                            //console.log(this.auth.authenticated)
   

                            

                            if(this.auth.authenticated){
                                this.planServices.UserAuthPlan().subscribe(res =>{
                                  console.log("plan user auth:", res)
                                  this.planServices.plan_mensual = res;
                                  this.planServices.sueldo = this.planServices.plan_mensual.sueldo;

                                  console.log()
                                  
                                  this.planServices.ListGasto()
                                  .pipe(first())
                                  .subscribe(data => {
                                    console.log("data api edit2 gastos stepper: ", data)
                                    this.planServices.arrayinput = data;
                            
                                    let v = this.planServices.arrayinput.filter(gastos => gastos.if_default == true)
                            
                                    this.planServices.arrayinput = v;
                            
                                    for (let item of this.planServices.arrayinput) { 
                                      this.planServices.AddGasto(item.name, item.value, 1).subscribe(objs => {
                                        console.log("objs post: ", objs)
                                        this.planServices.arrayinput = objs;
                            
                                        
                                      })
                                  }

                                  this.loading = false;
                                  this.router.navigate(['']);

                                })
                                },
                              error => {
                                console.log("wut? ", error)
                              })

      
                              }

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

