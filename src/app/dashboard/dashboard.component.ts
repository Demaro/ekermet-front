import { Component, OnInit, ElementRef ,  NgZone ,ChangeDetectorRef, AfterViewInit} from '@angular/core';
import * as Chart from 'chart.js';
import { PlanMensualService } from '../services/plan-mensual.service';
import { AuthenticationService } from '../services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(public planServices: PlanMensualService,
              private elementRef: ElementRef,
              private cdRef: ChangeDetectorRef,
              private auth: AuthenticationService,
            public router: Router,
            public snackBar: MatSnackBar,
            private zone: NgZone, ) { }

  canvas: any;
  myChart:any;

  fijos: any = [];
  plazo: any = [];
  ocio: any = [];
  educ: any = [];
  fina: any = [];
  dona; any = [];
  suma_total_gastos: any;
  suma_total_disponible: any;

  gastos1: any = 0;
  gastos2: any = 0;
  gastos3: any = 0;
  gastos4: any = 0;
  gastos5: any = 0;
  gastos6: any = 0;


  ngOnInit() {

    setTimeout (() => {
      this.auth.colornav = true;
  });


    window.scrollTo(0, 0);

    this.planServices.UserAuthPlan()
    .subscribe(res => {

      this.planServices.card1 = false;
      this.planServices.card2 = false;
      this.planServices.card3 = false;
      this.planServices.card4 = false;
      this.planServices.card5 = false;
      this.planServices.card6 = false;


      this.planServices.plan_mensual = res;

      let sueldo_api = this.planServices.plan_mensual.sueldo

        this.planServices.sueldo = sueldo_api;

        this.planServices.arrayinput = this.planServices.plan_mensual.gasto_general

        this.fijos = this.planServices.arrayinput.filter(gastos => gastos.sobre == 1)
        this.plazo = this.planServices.arrayinput.filter(gastos => gastos.sobre == 2)
        this.ocio = this.planServices.arrayinput.filter(gastos => gastos.sobre == 3)
        this.educ = this.planServices.arrayinput.filter(gastos => gastos.sobre == 4)
        this.fina = this.planServices.arrayinput.filter(gastos => gastos.sobre == 5)
        this.dona = this.planServices.arrayinput.filter(gastos => gastos.sobre == 6)

    this.planServices.percent_55 = (this.planServices.sueldo / 100)*55;


    this.planServices.percent_10 = (this.planServices.sueldo / 100)*10;

    this.planServices.percent_5 = (this.planServices.sueldo / 100)*5;


    this.total_reduce()

    this.pieChartResume()

    this.BarChartResume()

    this.pieChart()

    this.pieChart2()

    this.pieChart3()

    this.pieChart4()

    this.pieChart5()

    this.pieChart6()

    },
  error => {
    console.log("wut? ", error)
  })






}

total_reduce() {

//  General all Reduce
  // Gastos Fijos

  var result1 = this.fijos.map(a => a.value);

  let total1 = result1.reduce((a, b) => +a + +b, 0);

  this.planServices.totalgastos1 = total1;

  let resta1 = this.planServices.percent_55 - this.planServices.totalgastos1

  this.planServices.salary_less_total_gasto = resta1;


  var result2 = this.plazo.map(a => a.value);

    let total2 = result2.reduce((a, b) => +a + +b, 0);

    this.planServices.totalgastos2 = total2;

    let resta2 = this.planServices.percent_10 - this.planServices.totalgastos2

    this.planServices.salary_less_total_gasto2 = resta2;

    var result3 = this.ocio.map(a => a.value);

    let total3 = result3.reduce((a, b) => +a + +b, 0);

    this.planServices.totalgastos3 = total3;

    let resta3 = this.planServices.percent_10 - this.planServices.totalgastos3

    this.planServices.salary_less_total_gasto3 = resta3;


    var result4 = this.educ.map(a => a.value);

    let total4 = result4.reduce((a, b) => +a + +b, 0);

    this.planServices.totalgastos4 = total4;

    let resta4 = this.planServices.percent_10 - this.planServices.totalgastos4

    this.planServices.salary_less_total_gasto4 = resta4;


    var result5 = this.fina.map(a => a.value);

    let total5= result5.reduce((a, b) => +a + +b, 0);

    this.planServices.totalgastos5 = total5;

    let resta5 = this.planServices.percent_10 - this.planServices.totalgastos5

    this.planServices.salary_less_total_gasto5 = resta5;



      var result6 = this.dona.map(a => a.value);

      let total6= result6.reduce((a, b) => +a + +b, 0);


      this.planServices.totalgastos6 = total6;

      let resta6 = this.planServices.percent_5 - this.planServices.totalgastos6

      this.planServices.salary_less_total_gasto6 = resta6;


      this.suma_total_gastos = this.planServices.totalgastos1 + this.planServices.totalgastos2 + this.planServices.totalgastos3
                                + this.planServices.totalgastos4 + this.planServices.totalgastos5 + this.planServices.totalgastos6

      this.suma_total_disponible = this.planServices.salary_less_total_gasto + this.planServices.salary_less_total_gasto2 + this.planServices.salary_less_total_gasto3
                                    + this.planServices.salary_less_total_gasto4 + this.planServices.salary_less_total_gasto5 + this.planServices.salary_less_total_gasto6
}


ngAfterViewInit() {
  setTimeout (() => {

        this.auth.colornav = true;
      this.cdRef.detectChanges();

    });

  }


  stepperSnack(id) {

    if (id == 1){
      this.openSnackBar("Esta cantidad debe cubrir tus necesidades básicas: alquiler, comida, facturas, entre otros.", "cerrar");
    }
    if (id == 2){
      this.openSnackBar("Con o sin sabes exactamente en qué lo gastarás aún, Tal vez lo uses para comprar un coche, un ordenador o irte de viaje.", "cerrar");
    }
    if (id == 3){
      this.openSnackBar("destinado a actividades de ocio, ya sea conciertos, teatro, cine, salir con amigos…lo que tú elijas. Lo importante es que te lo gastes en ti mismo y en divertirte.", "cerrar");
    }
    if (id == 4){
      this.openSnackBar("Si quieres ganar más, formarte!, titulos, cursos, talleres, aprender a tocar un instrumento, etc", "cerrar");
    }
    if (id == 5){
      this.openSnackBar("lo que te dara beneficios con el tiempo. Puedes invertirlo o hacer cualquier cosa que vaya a generar ingresos pasivos.", "cerrar");
    }
    if (id == 6){
      this.openSnackBar("Con poco dinero que donen muchas personas a la vez se cambia el mundo (o por lo menos el mundo de una persona) y, además, esa pequeña donación ayuda a mejorar de alguna manera el sistema en el que vivimos.", "cerrar");
    }


  }


  openSnackBar(errorText: string, action: string): void {
    this.zone.run(() => {
      const snackBar = this.snackBar.open(errorText, action, {
        verticalPosition: 'bottom',
        horizontalPosition: 'left',
        duration: 10000,
      });
      snackBar.onAction().subscribe(() => {
        snackBar.dismiss();
      })
    });
  }


adminCard(number){
  console.log(number)

  if (number == 1){

        this.planServices.card1 = true;

      }
      if (number == 2){

            this.planServices.card2 = true;

          }
          if (number == 3){

                this.planServices.card3 = true;

              }
              if (number == 4){

                    this.planServices.card4 = true;

                  }
                  if (number == 5){

                        this.planServices.card5 = true;

                      }

                      if (number == 6){

                            this.planServices.card6 = true;

                          }

                          this.router.navigate(['panel'])
}

currencyMoney(value) {


}


pieChart() {

  const formatter = new Intl.NumberFormat('de-DE', {

    currency: 'USD',
    minimumFractionDigits: 0
  })

  let x = formatter.format(this.planServices.totalgastos1)

  let z = formatter.format(this.planServices.salary_less_total_gasto)


  this.planServices.totalgastos1 = x;

  this.planServices.salary_less_total_gasto = z;



      let htmlRef = this.elementRef.nativeElement.querySelector(`#myChart`);
      this.myChart = new Chart(htmlRef, {
        type: 'doughnut',
        data: {
            labels: ["Gastado", "Disponible",],
            datasets: [{
                label: '',
                data: [this.planServices.totalgastos1, this.planServices.salary_less_total_gasto],
                backgroundColor: [
                    '#e0cade',
                    '#7cd8a0'
                ],

                borderWidth: 1
            }]
        },
        options: {
          responsive: false,

      }
      });

    }

    pieChartResume() {


        const formatter = new Intl.NumberFormat('de-DE', {

          currency: 'USD',
          minimumFractionDigits: 0
        })


        if(this.suma_total_gastos >= 1000000 ){

          this.planServices.total_gasto = this.suma_total_gastos
          this.planServices.total_disponible = this.suma_total_disponible
        }
        else {

          this.planServices.total_gasto = formatter.format(this.suma_total_gastos)

          this.planServices.total_disponible = formatter.format(this.suma_total_disponible)


        }



            let htmlRef = this.elementRef.nativeElement.querySelector(`#pieChartResume`);
            this.myChart = new Chart(htmlRef, {
              type: 'doughnut',
              data: {
                  labels: ["Total Gastado", "Total Disponible",],
                  datasets: [{
                      label: '',
                      data: [this.planServices.total_gasto,  this.planServices.total_disponible],
                      backgroundColor: [
                          '#e0cade',
                          '#7cd8a0'
                      ],

                      borderWidth: 1
                  }]
              },
              options: {
                responsive: false,

            }
            });

          }


          BarChartResume() {


                    const formatter = new Intl.NumberFormat('de-DE', {

                      currency: 'USD',
                      minimumFractionDigits: 0
                    })


                    let x1 = formatter.format(this.planServices.totalgastos1)

                    let x2 = formatter.format(this.planServices.totalgastos2)

                    let x3 = formatter.format(this.planServices.totalgastos3)

                    let x4 = formatter.format(this.planServices.totalgastos4)

                    let x5 = formatter.format(this.planServices.totalgastos5)

                    let x6 = formatter.format(this.planServices.totalgastos6)



                    this.gastos1 = x1;
                    this.gastos2 = x2;
                    this.gastos3 = x3;
                    this.gastos4 = x4;
                    this.gastos5 = x5;
                    this.gastos6 = x6;

                    let z1 = formatter.format(this.planServices.salary_less_total_gasto)
                    let z2 = formatter.format(this.planServices.salary_less_total_gasto2)
                    let z3 = formatter.format(this.planServices.salary_less_total_gasto3)
                    let z4 = formatter.format(this.planServices.salary_less_total_gasto4)
                    let z5 = formatter.format(this.planServices.salary_less_total_gasto5)
                    let z6 = formatter.format(this.planServices.salary_less_total_gasto6)


                    var gastadoData = {
                      label: 'Total Gastado',
                      data: [this.gastos1, this.gastos2, this.gastos3, this.gastos4, this.gastos5, this.gastos6],
                      backgroundColor: '#e0cade',



                    };

                    var disponibleData = {
                      label: 'Total Disponible',
                      data: [z1, z2, z3, z4, z5, z6],
                      backgroundColor: '#7cd8a0'


                    };

                    var modulosData = {
                      labels: ["Gastos fijos", "Ahorro", "Ocio", "Educacion", "Finanzas", "Donaciones"],
                      datasets: [gastadoData, disponibleData]
                    };

                    let htmlRef = this.elementRef.nativeElement.querySelector(`#BarChartResume`);
                    this.myChart = new Chart(htmlRef, {
                      type: 'horizontalBar',
                      data: modulosData,

                    });


                      }

    pieChart2() {

        const formatter = new Intl.NumberFormat('de-DE', {

          currency: 'USD',
          minimumFractionDigits: 0
        })

        let x = formatter.format(this.planServices.totalgastos2)

        let z = formatter.format(this.planServices.salary_less_total_gasto2)


        this.planServices.totalgastos2 = x;

        this.planServices.salary_less_total_gasto2 = z;

        console.log("formated 2 : ", x)




            let htmlRef = this.elementRef.nativeElement.querySelector(`#myChart2`);
            this.myChart = new Chart(htmlRef, {
              type: 'doughnut',
              data: {
                  labels: ["Gastado", "Disponible",],
                  datasets: [{
                      label: '',
                      data: [this.planServices.totalgastos2, this.planServices.salary_less_total_gasto2],
                      backgroundColor: [
                          '#e0cade',
                          '#7cd8a0'
                      ],

                      borderWidth: 1
                  }]
              },
              options: {
                responsive: false,

            }
            });

          }




          pieChart3() {

              const formatter = new Intl.NumberFormat('de-DE', {

                currency: 'USD',
                minimumFractionDigits: 0
              })

              let x = formatter.format(this.planServices.totalgastos3)

              let z = formatter.format(this.planServices.salary_less_total_gasto3)


              this.planServices.totalgastos3 = x;

              this.planServices.salary_less_total_gasto3 = z;

              console.log("formated: ", x)




                  let htmlRef = this.elementRef.nativeElement.querySelector(`#myChart3`);
                  this.myChart = new Chart(htmlRef, {
                    type: 'doughnut',
                    data: {
                        labels: ["Gastado", "Disponible",],
                        datasets: [{
                            label: '',
                            data: [this.planServices.totalgastos3, this.planServices.salary_less_total_gasto3],
                            backgroundColor: [
                                '#e0cade',
                                '#7cd8a0'
                            ],

                            borderWidth: 1
                        }]
                    },
                    options: {
                      responsive: false,

                  }
                  });

                }



                pieChart4() {

                    const formatter = new Intl.NumberFormat('de-DE', {

                      currency: 'USD',
                      minimumFractionDigits: 0
                    })

                    let x = formatter.format(this.planServices.totalgastos4)

                    let z = formatter.format(this.planServices.salary_less_total_gasto4)


                    this.planServices.totalgastos4 = x;

                    this.planServices.salary_less_total_gasto4 = z;

                    console.log("formated: ", x)




                        let htmlRef = this.elementRef.nativeElement.querySelector(`#myChart4`);
                        this.myChart = new Chart(htmlRef, {
                          type: 'doughnut',
                          data: {
                              labels: ["Gastado", "Disponible",],
                              datasets: [{
                                  label: '',
                                  data: [this.planServices.totalgastos4, this.planServices.salary_less_total_gasto4 ],
                                  backgroundColor: [
                                      '#e0cade',
                                      '#7cd8a0'
                                  ],

                                  borderWidth: 1
                              }]
                          },
                          options: {
                            responsive: false,

                        }
                        });

                      }


                      pieChart5() {

                          const formatter = new Intl.NumberFormat('de-DE', {

                            currency: 'USD',
                            minimumFractionDigits: 0
                          })

                          let x = formatter.format(this.planServices.totalgastos5)

                          let z = formatter.format(this.planServices.salary_less_total_gasto5)


                          this.planServices.totalgastos5 = x;

                          this.planServices.salary_less_total_gasto5 = z;

                          console.log("formated: ", x)




                              let htmlRef = this.elementRef.nativeElement.querySelector(`#myChart5`);
                              this.myChart = new Chart(htmlRef, {
                                type: 'doughnut',
                                data: {
                                    labels: ["Gastado", "Disponible",],
                                    datasets: [{
                                        label: '',
                                        data: [this.planServices.totalgastos5, this.planServices.salary_less_total_gasto5],
                                        backgroundColor: [
                                            '#e0cade',
                                            '#7cd8a0'
                                        ],

                                        borderWidth: 1
                                    }]
                                },
                                options: {
                                  responsive: false,

                              }
                              });

                            }

                            pieChart6() {

                                const formatter = new Intl.NumberFormat('de-DE', {

                                  currency: 'USD',
                                  minimumFractionDigits: 0
                                })

                                let x = formatter.format(this.planServices.totalgastos6)

                                let z = formatter.format(this.planServices.salary_less_total_gasto6)


                                this.planServices.totalgastos6 = x;

                                this.planServices.salary_less_total_gasto6 = z;

                                console.log("formated: ", x)




                                    let htmlRef = this.elementRef.nativeElement.querySelector(`#myChart6`);
                                    this.myChart = new Chart(htmlRef, {
                                      type: 'doughnut',
                                      data: {
                                          labels: ["Gastado", "Disponible",],
                                          datasets: [{
                                              label: '',
                                              data: [this.planServices.totalgastos6, this.planServices.salary_less_total_gasto6],
                                              backgroundColor: [
                                                  '#e0cade',
                                                  '#7cd8a0'
                                              ],

                                              borderWidth: 1
                                          }]
                                      },
                                      options: {
                                        responsive: false,

                                    }
                                    });

                                  }


}
