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
export class AppComponent {



 constructor(
   private router: Router,
   private api: RoutesService,
   private cookieService: CookieService,
   ) {}
// Go home page
  home(){
    this.router.navigateByUrl('/home');
  }
// Go register page
  register(){
    this.router.navigateByUrl('/user/register');
  }
// go profile page
  profile(){
    this.router.navigateByUrl('/user');
  }


// Search engine to find matches in the different post of the database
    postSearch(form){
    this.api.findPost(form.value.data).subscribe((response: {posts: Post[]}) => {
      this.api.send(response.posts);
      this.router.navigateByUrl('post/results');
    }, (error: HttpErrorResponse) => {
      console.log(error);
    });
  }
// login function
  login(data) {
    console.log(data.value);
    this.api.loginUser(data.value).subscribe((response: {token: string}) => {
      console.log(response);
      this.cookieService.set('token', response.token);
      this.api.token(response.token);
    }, (error: HttpErrorResponse) => {
      console.log(error);

    });
}

}
