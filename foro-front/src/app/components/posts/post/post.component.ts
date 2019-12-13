import { Component, OnInit } from '@angular/core';
import { RoutesService } from 'src/app/service/routes.service';
import { Router } from '@angular/router';
import { Post } from 'src/app/interfaces/post';
import { User } from 'src/app/interfaces/user';
import {Comment } from 'src/app/interfaces/comment';
import { CookieService } from 'ngx-cookie-service';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  comments: Comment[];
  comment: Comment;
  post: Post;
  postId: string;
  postTitle: string;
  postContent: string;
  user:User;

  constructor(private respServices: RoutesService, private router: Router, private cookieService: CookieService) { }

  ngOnInit() {
    this.postTitle= 'Title';
    this.postContent= 'Content';
    // Get the post
    this.respServices.getPostById(this.respServices.postId).subscribe((response)=>{
      this.post= response['post'];
      this.postTitle = this.post['title'];
      this.postContent = this.post['content'];
      this.postId = this.post['id'];
    });
    // Get the comments by postId
  this.respServices.getComments(this.respServices.postId).subscribe(data =>{
    this.comments = data['comments'];
    console.log(this.comments);
  });
      // Check the token in cookies
      const token = this.cookieService.get('token');
      this.respServices.authToken(token).subscribe((response:{data: User}) => {
        this.user= response.data;
      }, (error: HttpErrorResponse) => {
        console.log('No puedes comentar sin logearte');
        alert('You must be logged to comment in posts');
      });
  }
  response(form): void{
    this.comment = form.value;
    this.comment.postId = this.postId;
    this.comment.userEmail = this.user.email;
    this.comment.username = this.user.username;
    this.respServices.commentPost(this.comment).subscribe(res =>{
      this.router.navigateByUrl('/post');
      console.log(res);
    });
    console.log(form.value);
  }

}
