import { Component, OnInit, OnChanges, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { AuthenticationService,  } from '../services/authentication.service';
import { PlanMensualService } from '../services/plan-mensual.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit, AfterViewInit {

  constructor(public auth: AuthenticationService, public planServices: PlanMensualService, public cdRef: ChangeDetectorRef
 ) {  }



 ngOnInit () { 
  setTimeout (() => { 
      this.auth.colornav = true;
  }); 
} 



 ngAfterViewInit() {
  setTimeout (() => { 
   
        this.auth.colornav = true;
      this.cdRef.detectChanges();

    }); 
  
  }



}
