import { RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/user/register/register.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { PostComponent } from './components/posts/post/post.component';
import { PostResultsComponent } from './components/posts/post-results/post-results.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { PostEditorComponent } from './components/posts/post-editor/post-editor.component';
import { TopicComponent } from './components/topic/topic.component';
import { RoutesService } from './service/routes.service';
import { MDComponent } from './components/messages/md/md.component';
import { ContactsComponent } from './components/messages/contacts/contacts.component';
import { MensajeriaComponent } from './mensajeria/mensajeria.component';
import { SocketService } from './socket.service.service';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    ProfileComponent,
    PostComponent,
    PostResultsComponent,
    HomePageComponent,
    PostEditorComponent,
    TopicComponent,
    MDComponent,
    ContactsComponent,
    MensajeriaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  exports: [RouterModule],
  providers: [CookieService, SocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }