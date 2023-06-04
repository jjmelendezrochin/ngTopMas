import { Injectable } from '@angular/core';
import { usuario } from './Objetos/usuario';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private isUserLoggedIn;
  public usserLogged:usuario;

  constructor() { 
  	this.isUserLoggedIn = false;
  }

  setUserLoggedIn(user:usuario) {
    this.isUserLoggedIn = true;
    this.usserLogged = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
    //console.log("usuario fijado, ", user);
  }

  getUserLoggedIn() {
  	return JSON.parse(localStorage.getItem('currentUser'));
  }

  public setLogout(){
    this.isUserLoggedIn = false;
    this.usserLogged = null;
    localStorage.setItem('currentUser', JSON.stringify(null));    
  }
}
