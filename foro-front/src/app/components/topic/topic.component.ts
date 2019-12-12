import { CookieService } from 'ngx-cookie-service';
import { RoutesService } from './../../service/routes.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Post } from 'src/app/interfaces/post';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})
export class TopicComponent implements OnInit {

  posts: Post[];

  constructor(
    private router: Router,
    private api: RoutesService,
    private cookieService: CookieService,
  ) { }

  ngOnInit() {
    this.api.getPostsByTopicId(this.api.topicId).subscribe((response)=>{
      this.posts = response['posts'];
    });
  }

}
