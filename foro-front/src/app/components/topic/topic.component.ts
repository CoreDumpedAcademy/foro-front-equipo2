import { CookieService } from 'ngx-cookie-service';
import { RoutesService } from './../../service/routes.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Post } from 'src/app/interfaces/post';
import { timingSafeEqual } from 'crypto';
import { Topic } from 'src/app/interfaces/topic';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})
export class TopicComponent implements OnInit {

  posts: Post[];
  topic: Topic;
  topicTitle: string;

  constructor(
    private router: Router,
    private api: RoutesService,
    private cookieService: CookieService,
  ) {}

  ngOnInit() {
    this.topicTitle = 'Topic';

    // Get the posts of this topic
    this.api.getPostsByTopicId(this.api.topicId).subscribe((response)=>{
      this.posts = response['posts'];
    });

    // Get the topic
    this.api.getTopicById(this.api.topicId).subscribe((response)=>{
      this.topic = response['topic'];
    });

    this.topicTitle = this.topic['title'];
  }

  goToPost(postId:string){
    alert('Unimplemented');
  }

}
