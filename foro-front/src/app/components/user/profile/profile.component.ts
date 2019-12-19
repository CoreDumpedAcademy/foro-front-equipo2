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
    console.log(token)
    this.api.authToken(token).subscribe((response:{data: User}) => {
      this.user= response.data;
      console.log(response)
      // post made by the user
      this.api.userPosts(this.user.username).subscribe((response:{posts}) => {
        console.log(response)
        this.posts = response.posts;
        console.log(this.posts);
      }, (error: HttpErrorResponse) => {
        console.log('there are no posts');
      });

    }, (error: HttpErrorResponse) => {
      this.router.navigateByUrl('/home');
    });
  }

  update(form){
    console.log(form.value);
    const username = this.user.username
    this.api.editUser(username, form.value).subscribe((response) => {
      if(form.value.password != "" || form.value.username != ""){
        alert("You must login again");
        this.logout();
      }else
      this.router.navigateByUrl('/home');
    }, (error: HttpErrorResponse) => {
      alert("Error al actualizar");
    });
  }
  goToPost(postId:string){
    this.api.postId = postId;
    this.router.navigateByUrl('post');
  }
  logout(){
    this.cookieService.delete('token');
    this.router.navigateByUrl('/home');
    this.cookieService.delete('token');
    location.reload();
  }
}
