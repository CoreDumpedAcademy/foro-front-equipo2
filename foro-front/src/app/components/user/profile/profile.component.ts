import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { RoutesService } from './../../../service/routes.service';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(
    private api: RoutesService,
    private router: Router,
    private cookieService: CookieService,
  ) { }

  ngOnInit() {
    // check the token in the cookies service
    const token = this.cookieService.get('token')    
    this.api.authToken(token).subscribe((response) => {
    }, (error: HttpErrorResponse) => {
      console.log('error tienes que iniciar sesion');
      this.router.navigateByUrl('/home');
    });
  }

  

}
