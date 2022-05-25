import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student } from './_models/student';
import { Speaker } from './_models/speaker';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

    baseUrl = "http://localhost:5500"

  constructor(public http : HttpClient) { }

  //login and signUp methods
  signUp(user:object){
    return this.http.post<{message:string, data:Student|Speaker}>(this.baseUrl+"/signUp", user)
  }

  login(user: object){
    return this.http.post<{message:string, token:string}>(this.baseUrl+"/login", user)
  }

  //token methods
  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  // public saveUser(user: any): void {
  //   window.sessionStorage.removeItem(USER_KEY);
  //   window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  // }

  // public getUser(): any {
  //   const user = window.sessionStorage.getItem(USER_KEY);
  //   if (user) {
  //     return JSON.parse(user);
  //   }
  //   return {};
  // }










}
