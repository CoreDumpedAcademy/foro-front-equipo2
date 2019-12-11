import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoutesService {

  constructor(
    private http: HttpClient
  ) { }

  private adress = 'http://localhost:3000/';

    registerUser(user: User){
      return this.http.post(`${this.adress}user/signup`, user);
    }

}
