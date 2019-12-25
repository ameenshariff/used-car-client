import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { CarService } from '../service/car.service';
import { Vehicle } from '../model/vehicle';
import { Router } from '@angular/router';
import { Cart } from '../model/addCart';

@Component({
  selector: 'app-vehicle-garage',
  templateUrl: './vehicle-garage.component.html',
  styleUrls: ['./vehicle-garage.component.css']
})
export class VehicleGarageComponent implements OnInit {
  allVehicles: Vehicle[];
  vehicles: Vehicle[] = [];
  city: string = null;
  brand: string = null;
  customerId: number;

  cartVehicles:Vehicle[]=[];
  cartCount:number;

  cartDetails:Cart[]=[];

  constructor(private service: CarService, private router: Router) { }


  ngOnInit() {
    this.customerId=parseFloat(localStorage.getItem("customerId"));

    
    this.service.vehicles().subscribe(data => {
      this.allVehicles = data;

      for (let i = 0; i < this.allVehicles.length; i++) {
        if (!(this.allVehicles[i].isSold)) {
          this.vehicles.push(this.allVehicles[i]);
        }
      }
      console.log(this.vehicles);

      this.service.getCart(this.customerId).subscribe(data=>{
        this.cartVehicles=data;
        this.cartCount=this.cartVehicles.length;
        
        this.compare();
        
      });
    })



    
  }

  compare() {
    for (let i = 0; i < this.vehicles.length; i++) {
      for (let j = 0; j < this.cartVehicles.length; j++) {
        if(this.vehicles[i].vehicleNumber==this.cartVehicles[j].vehicleNumber){
          this.vehicles.splice(i,1);
        }
        
      }
      
    }
  }

  citySelection() {
    this.vehicles = [];

    this.city = (<HTMLSelectElement>document.getElementById("city")).value;

    if(this.city=="Select City"){
      this.ngOnInit();
    }

    else {
      this.service.findByCity(this.city).subscribe(data => {
        this.allVehicles = data;
        for (let i = 0; i < this.allVehicles.length; i++) {
          if (!(this.allVehicles[i].isSold)) {
            this.vehicles.push(this.allVehicles[i]);
          }
        }
        this.compare();

      });
    }


    if (this.city != null) {
      
      this.service.filterVehicles(this.city, this.brand).subscribe(data => {
        this.vehicles = [];
        this.allVehicles = data;
        for (let i = 0; i < this.allVehicles.length; i++) {
          if (!(this.allVehicles[i].isSold)) {
            this.vehicles.push(this.allVehicles[i]);
          }
        }

        this.compare();
      });
    }
    
  }

  brandSelection() {
    this.vehicles = [];
    console.log("brand called");
    this.brand = (<HTMLSelectElement>document.getElementById("brand")).value;
    if(this.brand=="Select Brand"){
      this.ngOnInit();
    }
    else{
      this.service.findByBrand(this.brand).subscribe(data => {
        this.allVehicles = data;
        for (let i = 0; i < this.allVehicles.length; i++) {
          if (!(this.allVehicles[i].isSold)) {
            this.vehicles.push(this.allVehicles[i]);
          }
        }

        this.compare();
      });
    }
    

    if (this.city != null) {
      
      this.service.filterVehicles(this.city, this.brand).subscribe(data => {
        this.vehicles = [];
        this.allVehicles = data;
        for (let i = 0; i < this.allVehicles.length; i++) {
          if (!(this.allVehicles[i].isSold)) {
            this.vehicles.push(this.allVehicles[i]);
          }
        }

        this.compare();
      });
    }


  }

  back() {
    this.router.navigate(["/customerhome"])
  }

  cart() {
    this.router.navigate(["/cart"]);
  }

  buy(vehicle:Vehicle) {
    this.service.clearPurchaseDetails();
    let cart=new Cart();
    cart.customerId=parseInt(localStorage.getItem("customerId"));
    cart.vehicleNumber=vehicle.vehicleNumber;
    this.service.setPurchaseDetails(cart);


    console.log(vehicle);
    this.service.setCartTotal(vehicle.price);
    this.service.setVehicle(vehicle);
    this.router.navigate(["/payment"]);
  }

  addToCart(vehicle:Vehicle) {
    this.service.addToCart(this.customerId,vehicle.vehicleNumber).subscribe();
    this.ngOnInit();
    alert(vehicle.brand+" "+vehicle.model+" Added to cart");

  }

}
