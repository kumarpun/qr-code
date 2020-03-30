import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

declare var gtag;

@Component({
  selector: 'app-angalytics',
  templateUrl: './angalytics.component.html',
  styleUrls: ['./angalytics.component.css']
})
export class AngalyticsComponent implements OnInit {

  constructor(
    private router: Router
  ) { 
  const navEndEvents = router.events.pipe(
      filter(event => event instanceof NavigationEnd),
    );
    navEndEvents.subscribe((event: NavigationEnd) => 
    {
        gtag('config', 'UA-162151893-2', 
        {
          'page_path': event.urlAfterRedirects
          
        });

    })
  } 

  ngOnInit() {
  }

}
