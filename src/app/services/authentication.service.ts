import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Injectable()
export class AuthenticationService {
    user: Observable<firebase.User>;
    constructor(private http: HttpClient, public http2: Http, public afAuth: AngularFireAuth, private router: Router, private route: ActivatedRoute) {
        this.afAuth.authState.subscribe(
            (auth) =>{
              if(auth !=null){
                this.user = afAuth.authState;
                this.authenticated = true;

              }

            }


          )
        }

    routernav: boolean = false;
    newRegex = "";
    newRegex_reg = "";
    newRegex_reg2 = "";
    loading: boolean = false;
    returnUrl: string;
    colornav: boolean = false;

    step1 = "step 1 :)";
    if_step1 = false;
    step2 = "step 2:D ";
    if_step2 = false;
    step3 = "step3:o";
    if_step3 = false;

    if_register: boolean = false;


    error_login: boolean = false;

    error_reg: boolean = false;

    error_loggin_mess = "";
    getlisproduct = []

    authenticated: boolean = false;

    userCurrent: any;
    userDataGoogle: any;
    sender: boolean = false;
    username_array = []
    username_get = "";
    token = "";


    login(email: string, password: string) {

      const Acceso_Token = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Token ',
          'Access-Control-Allow-Origin': '*'

        }),

      }

        return this.http.post('https://ekermet.herokuapp.com/api/usuarios/auth-token/', { email: email, password: password }, Acceso_Token)
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.authenticated = true;

                }

                return user;
            }));
    }

    register(first_name: string, username: string, email: string, password: string){

      const Acceso_Token = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Token ',
          "Access-Control-Allow-Credentials" : "true",
        }),

      }
        return this.http.post('https://ekermet.herokuapp.com/api/usuarios/registrar/',  { first_name: first_name, username: username, email: email, password: password }, Acceso_Token)
        .pipe(map(user => {


        }));
    }

    contactsend(name: string, email: string, fono: number, company: string, message: string){
        return this.http.post<any>('https://ekermet.herokuapp.com/api/usuarios/send_email/',  { name: name, email: email, fono: fono, company: company, message: message })
        .pipe(map(data => {

        }));
    }


    doFacebookLogin(){
        return new Promise<any>((resolve, reject) => {
          let provider = new firebase.auth.FacebookAuthProvider();
          this.afAuth.auth
          .signInWithPopup(provider)
          .then(res => {
            resolve(res);
          }, err => {
            console.log(err);
            reject(err);
          })
        })
     }

     doGoogleLogin(){

        return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());

        }

        logout() {
            // remove user from local storage to log user out
            localStorage.removeItem('currentUser');
            this.authenticated = false;
            return this.afAuth.auth.signOut();
        }


processUserName(userCurrentName){
    this.username_array = userCurrentName.split(" ");
    this.username_get = this.username_array[0];
    console.log("Usuario:", this.username_get)
  }


}
