import { CookieService } from 'ngx-cookie-service';
import { RoutesService } from './../../service/routes.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Topic } from 'src/app/interfaces/topic';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  topics: Topic[];

  constructor(
    private router: Router,
    private api: RoutesService,
    private cookieService: CookieService,
  ) { }

  ngOnInit() {
    this.api.getTopics().subscribe((response) => {
      this.topics = response['topics'];
    });
  }

  new(){
    this.router.navigateByUrl('/post/create');
  }

  goToTopic(topicId:string) {
    this.api.topicId = topicId;
    this.router.navigateByUrl('topic');
  }

}
