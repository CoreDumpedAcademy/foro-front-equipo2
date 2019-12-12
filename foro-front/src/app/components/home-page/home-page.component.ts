import { CookieService } from 'ngx-cookie-service';
import { RoutesService } from './../../service/routes.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(
    private router: Router,
    private api: RoutesService,
    private cookieService: CookieService,
  ) { }

  ngOnInit() {
  }
  new(){
    this.router.navigateByUrl('/post/create');
  }

}
