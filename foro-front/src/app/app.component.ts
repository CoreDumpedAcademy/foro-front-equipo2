import { RoutesService } from './service/routes.service';

import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Post } from './interfaces/post';
import { EventEmitter, Output, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  logged:boolean = false;

  constructor(
    private router: Router,
    private api: RoutesService,
    private cookieService: CookieService,
  ) { }

   ngOnInit(){
    const token = this.cookieService.get('token');
    this.api.authToken(token).subscribe((response) => {
      this.logged=true;
      this.router.navigateByUrl('/home');
   }, (error: HttpErrorResponse) => {
     this.logged=false;
     this.router.navigateByUrl('/home');
   });
  }
  // Go home page
  home() {
    this.router.navigateByUrl('/home');
  }
  // Go register page
  register() {
    this.router.navigateByUrl('/user/register');
  }
  // go profile page
  profile() {
    this.router.navigateByUrl('/user');
  }
  // Search engine to find matches in the different post of the database
  postSearch(form) {
    console.log(form.value);
    this.router.navigateByUrl('post/results');
    this.api.findPost(form.value.data).subscribe((response: { posts: Post[] }) => {
      console.log(response);
      this.api.send(response);
    }, (error: HttpErrorResponse) => {
      console.log(error);
    });
  }
  // login function
  login(data) {
    console.log(data.value);
    this.api.loginUser(data.value).subscribe((response: { token: string }) => {
      console.log(response);
      this.cookieService.set('token', response.token);
      this.api.token(response.token);
      location.reload();
    }, (error: HttpErrorResponse) => {
      console.log(error);
    });
  }
  logout(){
    this.cookieService.delete('token');
    location.reload();
    location.reload();
  }


}
