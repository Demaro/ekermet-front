import { Injectable } from '@angular/core';
import {  PlanMensual } from '../models/panel_mensual';
import { AuthenticationService } from '../services/authentication.service';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import * as Chart from 'chart.js';

@Injectable({
  providedIn: 'root'
})
export class PlanMensualService {

  plan_mensual: any;
  sueldo: any = null
  planUserApi: any;
  arraygastosApi: any = [
    
           ]
  obj_save: any;

  salary_less_total_gasto:  any = 0;
  totalgastos: any = 0;
  totalgastos1: any = 0;
  totalgastos2: any = 0;
  totalgastos3: any = 0;
  totalgastos4: any = 0;
  totalgastos5: any = 0;
  totalgastos6: any = 0;

  salary_less_total_gasto2:  any = 0;
  salary_less_total_gasto3: any = 0
  salary_less_total_gasto4: any = 0
  salary_less_total_gasto5: any = 0;
  salary_less_total_gasto6: any = 0;

  total_gasto: any = 0;
  total_disponible: any = 0;

  percent_55: any = 0;
  card_Actual: number = null;
  
  percent_10: any;
  
  percent_5: any;
  presup: any;
  presup2: any;
  

  arrayinputuser: any = [

    
   
          ]
        
    arrayinput: any = [ ]
    arrayinputinitial: any = []
    arrayinputdefault: any = []
    myChart: any;

    card1:  boolean = false;
    card2: boolean = false;
    card3: boolean = false;
    card4:  boolean = false;
    card5: boolean = false;
    card6: boolean = false;


  listAccount: PlanMensual
  URL_BASE = 'https://ekermet.herokuapp.com/api/plan_mensual'

  constructor(public http: HttpClient, public auth: AuthenticationService) { }


// obtiene json del Plan segun id de usuario
  getlist(){

    return this.http.get(this.URL_BASE)

  }

  UserPlanGastos(){

        const Acceso_Token = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + this.auth.userCurrent.token
            
          }),
        }
    
        return this.http.put(this.URL_BASE + '/edit2/' + this.auth.userCurrent.id, {user : this.auth.userCurrent.id}, Acceso_Token)
        
      }

  UserAuthPlan(){
    
        const Acceso_Token = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + this.auth.userCurrent.token
            
          }),
        }
    
        return this.http.put(this.URL_BASE + '/edit/' + this.auth.userCurrent.id, {user : this.auth.userCurrent.id}, Acceso_Token)
        
      }

      


  EditPlan(sueldo: number){

    const Acceso_Token = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + this.auth.userCurrent.token
        
      }),
    }

    return this.http.put(this.URL_BASE + '/edit/' + this.auth.userCurrent.id, { user: this.auth.userCurrent.id, sueldo: sueldo },  Acceso_Token)
    
  }


  ListGasto(){

    console.log("user current in PLan services list gastos ", this.auth.userCurrent)
    
        const Acceso_Token = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + this.auth.userCurrent.token
            
          }),
        }
    
        return this.http.get(this.URL_BASE + '/gasto/list/',  Acceso_Token)
        
      }

  AddGasto(name: string, value: number, sobre: number){
    
        const Acceso_Token = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + this.auth.userCurrent.token
            
          }),
        }
        return this.http.post(this.URL_BASE + '/gasto/add/', {name : name , value: value, sobre: sobre },  Acceso_Token)
        
      }

EditGasto(id, name, value, sobre ){

  const Acceso_Token = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + this.auth.userCurrent.token
      
    }),
  }
  return this.http.put(this.URL_BASE + '/gasto/edit/' + id , {name : name , value: value, sobre: sobre },   Acceso_Token)

}


  UpdateGastos(gasto_general){

    
        const Acceso_Token = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + this.auth.userCurrent.token
            
          }),
        }
    
        return this.http.put(this.URL_BASE + '/edit2/' + this.auth.userCurrent.id, { user: this.auth.userCurrent.id, gasto_general: gasto_general },  Acceso_Token)
        
      }
}
