import { Post } from './../../../interfaces/post';
import { User } from './../../../interfaces/user';
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

  user: User;
  posts: Post[] ;
  post: Post;

  constructor(
    private api: RoutesService,
    private router: Router,
    private cookieService: CookieService,
  ) { }

  ngOnInit() {
    // check the token in the cookies service
    const token = this.cookieService.get('token')    
    this.api.authToken(token).subscribe((response:{data: User}) => {
      this.user= response.data;
      // post made by the user
      this.api.userPosts(this.user.username).subscribe((response: Post[]) => {
        this.posts = response;
      }, (error: HttpErrorResponse) => {
        console.log('there are no posts');
      });

    }, (error: HttpErrorResponse) => {
      this.router.navigateByUrl('/home');
    });
  }

}
