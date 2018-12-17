import { Component, OnInit, NgZone, ViewChild, ElementRef , AfterViewInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { trigger, state, animate, transition, style } from '@angular/animations';
import {MatSnackBar} from '@angular/material';
import { SnackbarComponent } from 'src/app/snackbar/snackbar.component';
import { AuthenticationService } from '../services/authentication.service';
import {MatTableDataSource} from '@angular/material';
import { PlanMensualService } from '../services/plan-mensual.service';
import { first } from 'rxjs/operators';
import * as Chart from 'chart.js';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  animations: [
    trigger('flyInOut', [
      state('in', style({opacity: 1, transform: 'translateX(0)'})),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-100%)'
        }),
        animate('0.2s ease-in')
      ]),
      transition('* => void', [
        animate('0.2s 0.1s ease-out', style({
          opacity: 0,
          transform: 'translateX(100%)'
        }))
      ])
    ]),

    trigger('flipState', [
      state('active', style({
        transform: 'rotateY(179.9deg)'
      })),
      state('inactive', style({
        transform: 'rotateY(0)'
      })),
      transition('active => inactive', animate('500ms ease-out')),
      transition('inactive => active', animate('500ms ease-in'))
    ]),
    
    trigger('move', [
      state('in', style({transform: 'translateX(50%)'})),
      state('out', style({transform: 'translateX(100%)'})),
      transition('in => out', animate('1s linear')),
      transition('out => in', animate('1s linear'))
    ]),
  ]
    
  
})
export class StepperComponent implements OnInit {


  array: any[] = [];
  
  items: FormArray;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  gastodiarioFormGroup
  form: FormGroup
  isOptional = true;
  submitted = false;
  array_length = 0;
  debtinput: string = ""
  add_new: boolean =  true;
  add_value:boolean = false;
  id_actual: number;
  label_null: boolean = true;
  value_save: any;
  obj_get: any;
  result: any[] = []
  list: any[] = [];
  id_actual_post: any;

  editactivate: boolean = false;

  PieChart: any;
  number: string = "123123"

  number2: number =  0;

  EditRowID: any = '';
  newItem: any;
  classEditActive: boolean = false;
  loading: boolean = false;

  arrayinitial = [

  ]

  myChart:any;

  constructor(private formBuilder: FormBuilder,
              public auth: AuthenticationService,
              public snack: SnackbarComponent,
              public snackBar: MatSnackBar,
              private zone: NgZone,
              public planServices: PlanMensualService,
              private elementRef: ElementRef,
            private router: Router ) {

  }


  

  @ViewChild("salary") nameField: ElementRef;
  ngOnInit() {

    

    if (this.auth.if_register) {

      this.planServices.card1 = true;

      this.nameField.nativeElement.focus();

      this.loading = true;

      this.planServices.ListGasto()
      .pipe(first())
      .subscribe(data => {
        this.planServices.arrayinputinitial = data;

        let v = this.planServices.arrayinputinitial.filter(gastos => gastos.if_default == true)

        this.planServices.arrayinputdefault = v;

      for (let item of this.planServices.arrayinputdefault) { 
      
          this.planServices.AddGasto(item.name, item.value, 1).subscribe(objs => {
        
          this.arrayinitial.push(objs)
      

          })
        
        
             
            }
    })


    setTimeout(() => {

      console.log("arrayinput  init post push: ", this.arrayinitial)
      
          var officersIds = this.arrayinitial.map(function (items) {
            return items.id
          });
      
          console.log("officersIds :",officersIds)
          
                  this.planServices.UpdateGastos(officersIds)
                  .pipe(first()).subscribe(data => {
                    console.log("to put for api:", data)
                    const obj_save = data;
                  }, error => {
                    console.log(error)
                  }
                  ) 
      
      
  
            console.log("arrayinput init post push: ", this.arrayinitial)
                  
            this.planServices.arrayinput = this.arrayinitial
      
      
            console.log("arrayinput post push: ", this.planServices.arrayinput)
  
            this.loading = false;

            this.auth.if_register = false;
      
            this.patch()

            

    }, 1000 )
    
    
      
    }


  
  //Initial Else


    else {

      this.loading = true;

      this.planServices.UserAuthPlan()
      .subscribe(res => {

        this.planServices.card1 = true;
        console.log("plan user auth:", res)
        this.planServices.plan_mensual = res;

        let sueldo_api = this.planServices.plan_mensual.sueldo

        let v = this.planServices.plan_mensual.gasto_general;

        this.planServices.arraygastosApi = v;

        console.log("all gastos: ", this.planServices.arraygastosApi)

        this.planServices.sueldo = sueldo_api;

        this.loading = false;

        if (this.planServices.card6) {

                    
          
                    this.planServices.card1 = false;

                    this.planServices.card_Actual = 6;
          
                    let v = this.planServices.arraygastosApi.filter(gastos => gastos.sobre == 6)
                    
                     this.planServices.arrayinput = v;
                    
                      console.log("card 2 donaciones  true", this.planServices.arrayinput)


                     
                      this.patch()
          
                  }

        if (this.planServices.card5) {
          
                    this.planServices.card1 = false;

                    this.planServices.card_Actual = 5;
          
                    let v = this.planServices.arraygastosApi.filter(gastos => gastos.sobre == 5)
                    
                     this.planServices.arrayinput = v;
                    
                      console.log("card 2 finanzas true", this.planServices.arrayinput)

                      this.patch()
          
                  }

        if (this.planServices.card4) {
          
                    this.planServices.card1 = false;

                    this.planServices.card_Actual = 4;
          
                    let v = this.planServices.arraygastosApi.filter(gastos => gastos.sobre == 4)
                    
                     this.planServices.arrayinput = v;
                    
                      console.log("card 4 educacion true", this.planServices.arrayinput)

                      this.patch()
          
                  }

        if (this.planServices.card3) {
          
                    this.planServices.card1 = false;

                    this.planServices.card_Actual = 3;
          
                    let v = this.planServices.arraygastosApi.filter(gastos => gastos.sobre == 3)
                    
                     this.planServices.arrayinput = v;
                    
                      console.log("card 3 ocio true", this.planServices.arrayinput)

                      this.patch()
          
                  }
          
        if (this.planServices.card2) {

          this.planServices.card1 = false;

          this.planServices.card_Actual = 2;

          let v = this.planServices.arraygastosApi.filter(gastos => gastos.sobre == 2)

          console.log()
          
           this.planServices.arrayinput = v;
          
            console.log("card 2 ahorro plazo true", this.planServices.arrayinput)

            this.patch()

        }

        if (this.planServices.card1) {

          this.planServices.card_Actual = 1;

          

          let v = this.planServices.arraygastosApi.filter(gastos => gastos.sobre == 1)

          this.planServices.arrayinput = v;

          console.log("card 1 gastos fijos true", this.planServices.arrayinput)

          this.patch()

        }
        

    this.planServices.percent_55 = (this.planServices.sueldo / 100)*55;
    
      console.log(" %55 del sueldo:", this.planServices.percent_55)
    
      this.planServices.percent_10 = (this.planServices.sueldo / 100)*10;
    
      console.log(" 10% ahorro of salary: ", this.planServices.percent_10)
    
      this.planServices.percent_5 = (this.planServices.sueldo / 100)*5;
    
    
      console.log(" 5% ahorro of salary: ", this.planServices.percent_5)

      this.total_reduce()

      },
    error => {
      console.log("wut? ", error)
    })

    }

//Fin ELSE

    this.firstFormGroup = this.formBuilder.group({
      salary: [, Validators.required]
  });

    this.form = this.formBuilder.group({
      debts     : this.formBuilder.array([
       
      ])
   });

  this.list = this.form.controls.debts.value

  
  }


  goDashboard() {

    
    this.next()
    if (this.firstFormGroup.invalid) {

      this.nameField.nativeElement.focus();

      return  
  }



    console.log("Go dashboard?")
    this.router.navigate(['dashboard']);
  }

  saveSueldo(salary) {
    
    this.next()
        if (this.firstFormGroup.invalid) {

          this.nameField.nativeElement.focus();
          
          return;
      } else{

         
      }
    
          this.planServices.EditPlan(salary).subscribe(res => {
    
          this.planServices.plan_mensual = res;
          console.log(this.planServices.plan_mensual)
          this.planServices.sueldo = this.planServices.plan_mensual.sueldo;
    
    
    
          this.planServices.percent_55 = (this.planServices.sueldo / 100)*55;
      
          console.log(" %55 del sueldo:", this.planServices.percent_55)
      
          this.planServices.percent_10 = (this.planServices.sueldo / 100)*10;
      
          console.log(" 10% ahorro of salary: ", this.planServices.percent_10)
      
          this.planServices.percent_5 = (this.planServices.sueldo / 100)*5;
      
      
          console.log(" 5% ahorro of salary: ", this.planServices.percent_5)
    
          this.total_reduce()
    
    
        },
        error => {
          console.log(error)
        })
      }


      
  flip: string = 'inactive';
 

  toggleFlip() {
    this.flip = (this.flip == 'inactive') ? 'active' : 'inactive';
  }


total_reduce_for_edit(id, name, value){

    this.add_new = true;

    console.log("id apuntando: ", id)
    const control = <FormArray>this.form.controls.debts;
    let total = control.value.reduce((a, b) => +a + +b.value, 0);

    this.okDebt(id, name, value);
  
  
    if(this.planServices.card1){
  
      this.planServices.totalgastos = total;
  
      this.planServices.presup = this.planServices.percent_55;
  
      let resta = this.planServices.percent_55 - this.planServices.totalgastos;
      
      this.planServices.salary_less_total_gasto = resta;
      
      console.log("resta salario y total gastos :", this.planServices.salary_less_total_gasto)
  
  
    }
  
    if(this.planServices.card2) {
  
      this.planServices.totalgastos2 = total;
  
      this.planServices.presup = this.planServices.percent_10;
      
      let resta = this.planServices.percent_10 - this.planServices.totalgastos2
          
      this.planServices.salary_less_total_gasto2 = resta;
          
      console.log("resta salario y total gastos :", this.planServices.salary_less_total_gasto2)
      
      }
  
        if(this.planServices.card3) {
  
          this.planServices.totalgastos3 = total;
          
          this.planServices.presup = this.planServices.percent_10;
              
          let resta = this.planServices.percent_10 - this.planServices.totalgastos3
                  
          this.planServices.salary_less_total_gasto3 = resta;
                  
          console.log("resta salario y total gastos :", this.planServices.salary_less_total_gasto3)
              
        }
  
                if(this.planServices.card4) {
  
                  this.planServices.totalgastos4 = total;
                  
                      this.planServices.presup = this.planServices.percent_10;
                      
                          let resta = this.planServices.percent_10 - this.planServices.totalgastos4
                          
                            this.planServices.salary_less_total_gasto4= resta;
                          
                            console.log("resta salario y total gastos :", this.planServices.salary_less_total_gasto4)
                      
                        }
              
                        if(this.planServices.card5) {
  
                          this.planServices.totalgastos5 = total;
                          
                              this.planServices.presup = this.planServices.percent_10;
                              
                                  let resta = this.planServices.percent_10 - this.planServices.totalgastos5
                                  
                                    this.planServices.salary_less_total_gasto5 = resta;
                                  
                                    console.log("resta salario y total gastos :", this.planServices.salary_less_total_gasto5)
                              
                                }
  
        if(this.planServices.card6){
  
          this.planServices.totalgastos3 = total;
  
          this.planServices.presup = this.planServices.percent_5;
          
              let resta = this.planServices.percent_5 - this.planServices.totalgastos6
              
                this.planServices.salary_less_total_gasto6 = resta;
              
                console.log("resta salario y total gastos :", this.planServices.salary_less_total_gasto6)
          
            }

}


total_reduce() {
  const control = <FormArray>this.form.controls.debts;
  let total = control.value.reduce((a, b) => +a + +b.value, 0);


  if(this.planServices.card1){

    this.planServices.totalgastos = total;

    this.planServices.presup = this.planServices.percent_55;

    let resta = this.planServices.percent_55 - this.planServices.totalgastos;
    
    this.planServices.salary_less_total_gasto = resta;
    
    console.log("resta salario y total gastos :", this.planServices.salary_less_total_gasto)

  }

  if(this.planServices.card2) {

    this.planServices.totalgastos2 = total;

    this.planServices.presup = this.planServices.percent_10;
    
    let resta = this.planServices.percent_10 - this.planServices.totalgastos2
        
    this.planServices.salary_less_total_gasto2 = resta;
        
    console.log("resta salario y total gastos :", this.planServices.salary_less_total_gasto2)
    
    }

      if(this.planServices.card3) {

        this.planServices.totalgastos3 = total;
        
        this.planServices.presup = this.planServices.percent_10;
            
        let resta = this.planServices.percent_10 - this.planServices.totalgastos3
                
        this.planServices.salary_less_total_gasto3 = resta;
                
        console.log("resta salario y total gastos :", this.planServices.salary_less_total_gasto3)
            
      }

              if(this.planServices.card4) {

                this.planServices.totalgastos4 = total;
                
                    this.planServices.presup = this.planServices.percent_10;
                    
                        let resta = this.planServices.percent_10 - this.planServices.totalgastos4
                        
                          this.planServices.salary_less_total_gasto4= resta;
                        
                          console.log("resta salario y total gastos :", this.planServices.salary_less_total_gasto4)
                    
                      }
            
                      if(this.planServices.card5) {

                        this.planServices.totalgastos5 = total;
                        
                            this.planServices.presup = this.planServices.percent_10;
                            
                                let resta = this.planServices.percent_10 - this.planServices.totalgastos5
                                
                                  this.planServices.salary_less_total_gasto5 = resta;
                                
                                  console.log("resta salario y total gastos :", this.planServices.salary_less_total_gasto5)
                            
                              }

      if(this.planServices.card6){

        this.planServices.totalgastos3 = total;

        this.planServices.presup = this.planServices.percent_5;
        
            let resta = this.planServices.percent_5 - this.planServices.totalgastos6
            
              this.planServices.salary_less_total_gasto6 = resta;
            
              console.log("resta salario y total gastos :", this.planServices.salary_less_total_gasto6)
        
          }
}

openSnackBar(errorText: string, action: string): void {
  this.zone.run(() => {
    const snackBar = this.snackBar.open(errorText, action, {
      verticalPosition: 'bottom',
      horizontalPosition: 'left',
      duration: 5000,
    });
    snackBar.onAction().subscribe(() => {
      snackBar.dismiss();
    })
  });
}

  patch() {

  
    // the formarray
    const control = <FormArray>this.form.controls.debts;
    // iterate your object and pushes new values
    this.planServices.arrayinput.forEach(x => {
      var z = control.push(this.patchValues(x.id, x.name, x.value))

      console.log("foreach: ", z)

    })

    console.log("control post push patch(): ", control)
  }


  patchValues(id, name, value) {
    return this.formBuilder.group({
      id:   [id],
      name: [name],
      value: [value]
    })    
  }

  
  initDebtFields() : FormGroup
  {
     return this.formBuilder.group({
        id: [ this.id_actual_post ],
        name : ['Gasto #' +  this.array_length , Validators.required],
        value : [this.value_save  , Validators.required],

     });
     

  }

  stepperSnack() {

    this.openSnackBar("Ingrese Gastos basicos del mes, con nombre y monto considerado ", "cerrar");

  }

  addNewInputField() : void
  {

   

    var lengthto5 = this.f2.debts.value.length;
    const control = <FormArray>this.form.controls.debts;
    console.log("control :",control.value)
    
    var x = control.value.length

        const z = this.array_length = x + 1;
        
                console.log("actual:", z)
      
                let obj_new = control.value.pop()

                this.planServices.AddGasto("Gasto #" + z,  null, this.planServices.card_Actual)
                .pipe(first())
                .subscribe(
                  data => {
                      console.log(data)
        
                      x = data
        
                      this.id_actual_post = x.id

                      this.EditRowID = this.id_actual_post;
  
        
                      console.log("id actual post: ", this.id_actual_post)
        
                      const push = this.planServices.arraygastosApi.push({id : this.id_actual_post, name: "Gasto #" + z, value: null, is_default: false, sobre: this.planServices.card_Actual})
                      this.newItem = push

                      control.push(this.initDebtFields());

                      this.add_new = false;
        
                      console.log("Arrayinput actual: ", this.planServices.arraygastosApi)
                      
                      var officersIds = this.planServices.arraygastosApi.map(function (items) {
                        return items.id
                      });

                      console.log("officersIds :",officersIds)
                      
                              this.planServices.UpdateGastos(officersIds)
                              .pipe(first()).subscribe(data => {
                                console.log("to put for api:", data)
                                const obj_save = data;
                              }, error => {
                                console.log(error)
                              }
                              )        
                  },
                  error =>
                  console.log("err: ", error)
                )


  }

  editDebt(val){
    this.EditRowID = val;

    this.add_new = false;
 
    console.log(val)

    const control = <FormArray>this.form.controls.debts;
    console.log("control :",control.value)
    
    var x = control.value.length
    
      this.id_actual = val;
    
         
  }

 okDebt(id, name, value){

console.log("id_actual al editar: ", this.id_actual_post)
  this.EditRowID = '';
  const control = <FormArray>this.form.controls.debts;
  console.log("id actual Save btn: ", id);

    this.id_actual_post = id;

    console.log(this.id_actual_post)
  

  this.planServices.EditGasto(this.id_actual_post, name, value, this.planServices.card_Actual)

  .subscribe(data =>{
    console.log("gasto update: ", data)
  } )

  let z = control.value.filter(item => item.id === id)
  

  this.array_length

  console.log(z)

  console.log("control to ok btn", control.value)


}

  removeInputField(i : number, id) : void
  {
  

    if(!this.add_new){

      this.add_new = true;

    }


    console.log("id of remove: ", id)
     const control = <FormArray>this.form.controls.debts;

     control.removeAt(i);

    var index = this.planServices.arraygastosApi.findIndex(item => item.id === id)

    this.planServices.arraygastosApi.splice(index, 1, )

    var officersIds = this.planServices.arraygastosApi.map(function (items) {
      return items.id
    });
    

    this.total_reduce()

    this.planServices.UpdateGastos(officersIds)
    .pipe(first()).subscribe(data => {
      console.log("to delete for api:", data)
    }, error => {
      console.log(error)
    }
    )





     var x = control.value.length

     if(x == 0){
       this.add_new = true;
     } 
  }

removeofArray(array, element) {
  const index = array.indexOf(element);
  array.splice(index, element)
}
  
  manage(val : any) : void
  {
     console.dir(val);
  }


  get f2() { return this.form.controls }

  get formData() { return <FormArray>this.form.get('debts'); }

  get f() { return this.firstFormGroup.controls }



  next(){
    this.submitted = true;
    if (this.firstFormGroup.invalid) {
      console.log(this.firstFormGroup.invalid)
      return;
  } else{
    this.submitted = false;
  }


  }



 moneyFormat() {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  })
}


 

}


