import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarService } from '../service/car.service';
import { Customer } from '../model/customer';
import { Login } from '../model/login';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  customer: Customer;
  login: Login;

  constructor(private router: Router, private service: CarService) {
    this.login = new Login();
    this.customer = new Customer();
  }

  ngOnInit() {
  }

  register() {
    this.service.checkIfEmailExist(this.customer.email).subscribe(data => {
      if (!data) {
        this.login.email = this.customer.email;
        this.login.password = this.customer.confirmPassword;
        this.service.registerCustomer(this.customer).subscribe();
        this.service.saveLogin(this.login).subscribe();
        alert("Registration seccesfull");
      }
      else
        alert("Email already exists try logging in");
    })
  }

  cancel() {
    this.router.navigate(["/homepage"]);
  }

}
