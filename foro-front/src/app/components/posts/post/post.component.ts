import { Component, OnInit } from '@angular/core';
import { RoutesService } from 'src/app/service/routes.service';
import { Router } from '@angular/router';
import { Comment } from '../../../interfaces/comment';
import {PostResultsComponent } from '../post-results/post-results.component';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  public comments=[];
  public post=[];

  constructor(private respServices: RoutesService, private router: Router) { }
  ngOnInit() {
    this.respServices.getPost().subscribe(info =>{
      this.post= info;
    });
    this.respServices.getComments().subscribe(data =>{
      this.comments = data;
      console.log(this.comments);
    });
  }
  response(form): void{
    this.respServices.commentPost(form.value);
    console.log(form.value);
  }
}
