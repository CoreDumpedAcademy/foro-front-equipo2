import { PostEditorComponent } from './components/posts/post-editor/post-editor.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { RegisterComponent } from './components/user/register/register.component';
import { PostResultsComponent } from './components/posts/post-results/post-results.component';
import { PostTopicComponent } from './components/posts/post-topic/post-topic.component';
import { PostComponent } from './components/posts/post/post.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { TopicComponent } from './components/topic/topic.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path:'home',component: HomePageComponent},
  {path:'post',component: PostComponent},
  {path:'post/topic',component: PostTopicComponent},
  {path:'post/results',component: PostResultsComponent},
  {path:'post/create',component: PostEditorComponent},
  {path:'user',component: ProfileComponent},
  {path:'user/register',component: RegisterComponent},
  {path:'topic',component: TopicComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
