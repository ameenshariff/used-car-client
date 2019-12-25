import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Customer } from '../model/customer';
import { CarService } from '../service/car.service';
import { Router } from '@angular/router';
import { Vehicle } from '../model/vehicle';

@Component({
  selector: 'app-customer-home',
  templateUrl: './customer-home.component.html',
  styleUrls: ['./customer-home.component.css']
})
export class CustomerHomeComponent implements OnInit {
  challans = [34]
  customerEmail: string;
  customer: Customer;
  fullName: string;
  customerVehicles: Vehicle[];
  cartVehicles: Vehicle[]=[];
  cartCount:number=0;

  constructor(private service: CarService, private router: Router) {
    this.customer = new Customer();
    this.customerEmail = sessionStorage.getItem("customer");

  }

  displayedColumns: string[] = ['index','image', 'brand', 'model', 'vehicleNumber', 'regDate', 'colour', 'action'];
  dataSource

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.service.getCustomer(this.customerEmail).subscribe(data => {
      this.customer = data;
      localStorage.setItem("customerId", this.customer.customerId + "");
      this.fullName = this.customer.firstName + " " + this.customer.lastName;
      this.service.getCart(this.customer.customerId).subscribe(data=>{
        this.cartVehicles=data;

        this.cartCount=this.cartVehicles.length;
      });
      // this.service.setCustomerId(this.customer.customerId);

      this.service.getCustomerVehicles(this.customer.customerId).subscribe(data => {
        this.customerVehicles = data;
        console.log(this.customerVehicles);
        

        this.dataSource = new MatTableDataSource(this.customerVehicles);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });


    })

  }

  logOut() {
    let userInput = confirm("Are u sure?");
    if (userInput) {
      sessionStorage.removeItem("customer");
      localStorage.removeItem("customerId");
      this.router.navigate(["/homepage"]);
    }

  }

  viewChallan(vehicle:Vehicle) {
    console.log(vehicle);
    
    this.service.setVehicle(vehicle);
    this.router.navigate(["/traffic-challans"]);
  }

  buyCar() {
    this.router.navigate(["/vehicle-garage"]);
  }

  cart() {
    this.router.navigate(["/cart"])
  }

}
