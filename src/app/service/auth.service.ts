import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }
  
  isUserValid(): boolean {
    const loggedInUser = sessionStorage.getItem("customer");
    if (loggedInUser!=null) {
      return true;
    }
    else
      return false;
  }

  

  
}
