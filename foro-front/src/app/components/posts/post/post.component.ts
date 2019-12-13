import { Component, OnInit } from '@angular/core';
import { RoutesService } from 'src/app/service/routes.service';
import { Router } from '@angular/router';
import { Post } from 'src/app/interfaces/post';
import { User } from 'src/app/interfaces/user';
import { Comment } from 'src/app/interfaces/comment';
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

  constructor(private api: RoutesService, private router: Router, private cookieService: CookieService) { }

  ngOnInit() {
    this.postTitle= 'Title';
    this.postContent= 'Content';
    // Get the post
    console.log(this.api.postId);
    
    this.api.getPostById(this.api.postId).subscribe((response)=>{
      this.post= response['post'];
      this.postTitle = this.post['title'];
      this.postContent = this.post['content'];
      this.postId = this.post['id'];
    });
    // Get the comments by postId
  this.api.getComments(this.api.postId).subscribe(data =>{
    this.comments = data['comments'];
    console.log(this.comments);
  });
      // Check the token in cookies
      const token = this.cookieService.get('token');
      this.api.authToken(token).subscribe((response:{data: User}) => {
        this.user= response.data;
      }, (error: HttpErrorResponse) => {
        console.log('No puedes comentar sin logearte');
        alert('You must be logged to comment in posts');
      });
  }
  response(form): void{
    console.log(form.value);
    this.comment = form.value;
    this.comment.postId = this.api.postId;
    console.log(this.comment.postId);
    this.comment.userEmail = this.user.email;
    this.comment.username = this.user.username;
    
    this.api.commentPost(this.comment).subscribe(res =>{
      this.api.getPostById(this.api.postId).subscribe((response)=>{
        this.post= response['post'];
        this.postTitle = this.post['title'];
        this.postContent = this.post['content'];
        this.postId = this.post['id'];
      });
      // Get the comments by postId
    this.api.getComments(this.api.postId).subscribe(data =>{
      this.comments = data['comments'];
      console.log(this.comments);
    });
    });
    console.log(form.value);
  }

}
