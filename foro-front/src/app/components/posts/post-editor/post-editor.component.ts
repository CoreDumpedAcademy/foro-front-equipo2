import { Topic } from 'src/app/interfaces/topic';
import { Post } from './../../../interfaces/post';
import { User } from './../../../interfaces/user';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { RoutesService } from './../../../service/routes.service';

import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-editor',
  templateUrl: './post-editor.component.html',
  styleUrls: ['./post-editor.component.css']
})
export class PostEditorComponent implements OnInit {

  user:User;
  post:Post;
  topics: Topic[];

  constructor(
    private api: RoutesService,
    private router: Router,
    private cookieService: CookieService,
  ) { }

  ngOnInit() {
        // check the token in the cookies service
        const token = this.cookieService.get('token');
        this.api.authToken(token).subscribe((response:{data: User}) => {
          this.user= response.data;

          this.api.getTopics().subscribe((response) => {
            this.topics = response['topics'];
          });
          
        }, (error: HttpErrorResponse) => {
          console.log('error tienes que iniciar sesion');
          alert('You should be logged for posting');
          this.router.navigateByUrl('/home');
        });
  }

  share(form){
    console.log(form.value);
    this.post=form.value;
    this.post.username = this.user.username;
    this.api.create(this.post).subscribe((response) => {
      console.log(response);
    }, (error: HttpErrorResponse) => {
      console.log(error);
    });
  }

  


}
