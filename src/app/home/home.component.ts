import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../model/login';
import { CarService } from '../service/car.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  items=[1,2,3,4,5,6];
  loginDetails:Login;

  constructor(private router:Router, private service:CarService) {
    this.loginDetails=new Login();
   }

  ngOnInit() {
  }

  login(){
    this.service.validateLogin(this.loginDetails).subscribe(data=>{
      if(data){
        sessionStorage.setItem("customer",this.loginDetails.email);
        this.router.navigate(["/customerhome"]);
      }
      else
        alert("Email or Password incorrect")
    });
    
  }

  register(){
    this.router.navigate(["/register"]);
  }

}
