import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/user/register/register.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { PostComponent } from './components/posts/post/post.component';
import { PostResultsComponent } from './components/posts/post-results/post-results.component';
import { PostTopicComponent } from './components/posts/post-topic/post-topic.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { FormsModule } from '@angular/forms';
import { RoutesService } from './service/routes.service';
import {  HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    ProfileComponent,
    PostComponent,
    PostResultsComponent,
    PostTopicComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [ RoutesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
