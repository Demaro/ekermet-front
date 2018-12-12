import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { AuthSaveComponent} from '../app/auth-save/auth-save.component';
import { BackendsComponent, fakeBackendProvider } from './backends/backends.component';
import { ServicesComponent } from './services/services.component';
import { UserService }  from './services/user_service';
import { User } from './models/user';
import { AuthenticationService} from './services/authentication.service';
import { JwtInterceptor } from './backends/jwt_interceptor';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

import {MatButtonModule, 
  MatCheckboxModule, 
  MatListModule, 
  MatStepperModule, 
  MatInputModule, 
  MatTableModule,
  MatTooltipModule} from '@angular/material';

import {MatSidenavModule} from '@angular/material/sidenav';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { ContactComponent } from './contact/contact.component';
import { environment } from '../environments/environment';
import { AuthSaveComponent2 } from './auth-save/auth-save2.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule} from '@angular/material';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { StepperComponent } from './stepper/stepper.component';
import { PanelComponent } from './panel/panel.component';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { DashboardComponent } from './dashboard/dashboard.component';
import {MAT_DATE_LOCALE} from '@angular/material';
import { ServiceWorkerModule } from '@angular/service-worker';


@NgModule({
  declarations: [
    AppComponent,
    ServicesComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AuthSaveComponent,
    AuthSaveComponent2,
    ContactComponent,
    SnackbarComponent,
    StepperComponent,
    PanelComponent,
    DashboardComponent,


    

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    HttpClientModule,
    AppRoutingModule,
    HttpModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatSelectModule,
    MatStepperModule,
    MatInputModule,
    MatTableModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MDBBootstrapModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    CurrencyMaskModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    
    
    
  ],
  entryComponents: [SnackbarComponent],

  providers: [
    AuthSaveComponent,
    AuthSaveComponent2,
    BackendsComponent,
    AuthenticationService,
    UserService,

    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
  },

  { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },

  User,
  SnackbarComponent,
  HttpModule,



  //fakeBackendProvider,
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
