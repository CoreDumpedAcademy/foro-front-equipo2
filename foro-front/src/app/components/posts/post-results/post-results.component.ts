import { RoutesService } from './../../../service/routes.service';
import { Post } from '../../../interfaces/post';
import { Component, OnInit } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-post-results',
  templateUrl: './post-results.component.html',
  styleUrls: ['./post-results.component.css']
})
export class PostResultsComponent implements OnInit {

  posts: Post[] ;
  post: Post;

  constructor(
    private api: RoutesService,
    private router: Router,
  ) { }
// comunication beetwen componet app and result
  ngOnInit() {
    this.api.change.subscribe(posts => {
      this.posts = posts.result;
      
      for (let i = 0; i < this.posts.length; i++) {
        this.api.getusername(this.posts[i].usernameId).subscribe((response:{username:string}) =>{
          this.posts[i].username = response.username;
          
        });
        
      }
    });
  }

  responsePost(posts) {
    this.posts = posts;
    for (let i = 0; i < this.posts.length; i++) {
      this.api.getusername(this.posts[i].usernameId).subscribe((response:{username:string}) =>{
        this.posts[i].username = response.username;
      });
      
    }
}
goToPost(postId:string){
  this.api.postId = postId;
  this.router.navigateByUrl('post');

}

}
