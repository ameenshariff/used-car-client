import { Component, OnInit } from '@angular/core';
import { CarService } from '../service/car.service';
import { Router } from '@angular/router';
import { Vehicle } from '../model/vehicle';
import { forEach } from '@angular/router/src/utils/collection';
import { Cart } from '../model/addCart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  vehicles: Vehicle[] = [];
  cartTotal: number = 0;
  cartId: any;
  cartCount: number;

  constructor(private service: CarService, private router: Router) { }

  ngOnInit() {

    this.service.getCart(parseFloat(localStorage.getItem("customerId"))).subscribe(data => {
      this.vehicles = data;


     
      this.cartCount = this.vehicles.length;
      this.service.clearPurchaseDetails();

      for (let i = 0; i < this.vehicles.length; i++) {
        this.cartTotal = this.cartTotal + this.vehicles[i].price;
        
        let cart=new Cart();
        cart.customerId=parseInt(localStorage.getItem("customerId"));
        cart.vehicleNumber=this.vehicles[i].vehicleNumber;
        this.service.setPurchaseDetails(cart);
      }
    });



  }

  back() {
    this.router.navigate(["/vehicle-garage"]);
  }

  proceedForPayment() {
    // this.service.purchaseVehicles(this.vehicles);
    this.service.setCartTotal(this.cartTotal);

    this.router.navigate(["/payment"]);
  }

  remove(vehicle: Vehicle) {
    this.cartId = this.service.getCartId(vehicle.vehicleNumber).subscribe(data => {
      this.cartId = data;
      this.service.removeFromCart(this.cartId).subscribe();
      window.location.reload();
    });

    

  }

}
