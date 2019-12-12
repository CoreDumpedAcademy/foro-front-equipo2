import { Component, OnInit } from '@angular/core';
import { RoutesService } from 'src/app/service/routes.service';
import { Router } from '@angular/router';
import { Globals } from 'src/app/globals';

@Component({
  selector: 'app-post-topic',
  templateUrl: './post-topic.component.html',
  styleUrls: ['./post-topic.component.css']
})
export class PostTopicComponent implements OnInit {
  public posts=[];
  constructor(private service: RoutesService, private router: Router, public globals: Globals) { }

  ngOnInit() {
    this.service.getPostTopic(this.globals.topicId).subscribe(data =>{
      this.posts = data;
    });
  }
  topicSelected(el){
    this.globals.postId = el.getAtribute('postId');
  }

}
