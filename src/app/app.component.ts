import { Component, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay, filter } from 'rxjs/operators';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  showComponent:boolean=true;

  constructor(private router: Router) {
    router.events.subscribe(
      (val)=>{
        if(val instanceof NavigationEnd){
          if(val.url=='/login'){
            this.showComponent=false;
          }
          if(val.url=='/register'){
            this.showComponent=false;
          }
          if(val.url=='/admin'){
            this.showComponent=false;
          }
          if(val.url==''){
            this.showComponent=false;
          }
        }
      }
    )
  }

  ngOnInit() {
    
  }

}