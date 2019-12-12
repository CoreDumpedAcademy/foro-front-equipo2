import { Component, OnInit } from '@angular/core';
import { RoutesService } from 'src/app/service/routes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-topic',
  templateUrl: './post-topic.component.html',
  styleUrls: ['./post-topic.component.css']
})
export class PostTopicComponent implements OnInit {
  public topics=[];
  constructor(private service: RoutesService, private router: Router) { }

  ngOnInit() {
    this.service.getTopics().subscribe(data =>{
      this.topics = data;
    });
  }

}
