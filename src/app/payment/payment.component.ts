import { Component, OnInit } from '@angular/core';
import { CardDetails } from '../model/CardDetails';
import { Router } from '@angular/router';
import { CarService } from '../service/car.service';
import { Vehicle } from '../model/vehicle';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  cardDetails: CardDetails;

  vehiclePrice: number;
  cartTotal: number;
  vehicle: Vehicle;

  constructor(private router: Router, private service: CarService) {
    this.cardDetails = new CardDetails();
  }

  ngOnInit() {

    this.vehicle = this.service.getVehicle();
    console.log(this.vehicle);

    // this.vehiclePrice=this.vehicle.price;
    // console.log(this.vehiclePrice); 

    this.vehiclePrice = this.service.getCartTotal();
  }

  makePayment() {
    // this.service.validateCardDetails(this.cardDetails).subscribe(data => {
    //   if (data) {
    //     this.service.checkBalance(this.cartTotal).subscribe(data => {
    //       if (data) {
    //         let confir = confirm("Are you sure?")
    //         if (confir) {
    //           this.service.purchaseVehicles().subscribe();
    //           alert("Payment Successful");
    //           this.router.navigate(["/vehicle-garage"]);
    //           console.log(this.cardDetails);
    //         }
    //       }
    //       else{
    //         alert("Insufficient Funds");
    //       }
    //     })
    //   }
    //   else{
    //     alert("Card details are not valid.");
    //   }
    // })

    this.service.purchaseVehicles().subscribe();
    alert("Payment Successful");
    this.router.navigate(["/vehicle-garage"]);




  }

  back() {
    this.router.navigate(["/vehicle-garage"])
  }

}
