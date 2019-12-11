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

  ngOnInit() {
    this.api.change.subscribe(posts => {
      this.posts = posts;
    });
  }

  responsePost(posts) {
    this.posts = posts;
}

}
