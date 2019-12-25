import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from '../model/login';
import { Customer } from '../model/customer';
import { Observable } from 'rxjs';
import { Vehicle } from '../model/vehicle';
import { Cart } from '../model/addCart';
import { CardDetails } from '../model/CardDetails';


@Injectable({
  providedIn: 'root'
})
export class CarService {
  checkBalance(cartTotal: number) {
    return this.http.get(`${this.baseUrl}/validateBal/${cartTotal}`);
  }
  validateCardDetails(cardDetails: CardDetails) {
    return this.http.post(`${this.baseUrl}/validateCard/`,cardDetails);
  }
  cartTotal: number;
  custId: number;
  cartVehicles:any=[];

  purchaseDetails:Cart[]=[];

  setPurchaseDetails(purchaseDetails) {
    this.purchaseDetails.push(purchaseDetails);
    console.log(purchaseDetails);
    
  }

  clearPurchaseDetails() {
    this.purchaseDetails=[];
  }

  


  getCartId(vehicleNumber: string) {
    return this.http.get(`${this.baseUrl}/getCartId/${vehicleNumber}`);
  }
  
  setCartTotal(cartTotal: number) {
    this.cartTotal=cartTotal;
  }

  getCartTotal() {
    return this.cartTotal;
  }
  
  setCustomerId(customerId: number) {
    console.log(customerId);
    
    this.custId=customerId;
  }

  getCustomerId() {
    return this.custId;
  }

  

  getCart(customerId: number) :Observable<any> {
    return this.http.get(`${this.baseUrl}/getCart/${customerId}`);
  }

  addToCart(customerId: number, vehicleNumber: string) {
    return this.http.get(`${this.baseUrl}/addToCart/${vehicleNumber}/${customerId}`);
  }

  removeFromCart(cartId:number) {
    return this.http.delete(`${this.baseUrl}/removeFromCart/${cartId}`);
  }

  filterVehicles(city: string, brand: string) :Observable<any> {
    return this.http.get(`${this.baseUrl}/filteredVehicles/${city}/${brand}`);
  }
  findByBrand(brand: string) :Observable<any>{
    return this.http.get(`${this.baseUrl}/findByBrand/${brand}`);
  }
  findByCity(city: string) :Observable<any> {
    return this.http.get(`${this.baseUrl}/findByCity/${city}`);
  }
  getCustomerVehicles(customerId: number):Observable<any> {
    console.log(customerId);
    
    return this.http.get(`${this.baseUrl}/customerOwnedVehicles/${customerId}`);
  }
  purchaseVehicles() {
    // console.log(customerId);
    // console.log(vehicleNumber);
    console.log(this.purchaseDetails);
    
    
    return this.http.post(`${this.baseUrl}/saveAllPurchasedVehicle/`,this.purchaseDetails);
  }

  purchaseVehicle(customerId,vehicleNumber) {
    // console.log(customerId);
    // console.log(vehicleNumber);
    
    return this.http.get(`${this.baseUrl}/savePurchasedVehicle/${customerId}/${vehicleNumber}`);
  }

  vehicle:Vehicle;

  cartDetails:Cart[]=[];
  setVehicle(vehicle: Vehicle) {
    console.log(vehicle);
    
    this.vehicle=vehicle;
    // this.cartDetails[0].customerId=parseFloat(localStorage.getItem("custId"));
    // this.cartDetails[0].vehicleNumber=vehicle.vehicleNumber;
  }

  getCartDetails() {
    return this.cartDetails;
  }

  getVehicle() {
    console.log("getVehicleCalled    ");
    
    return this.vehicle;
  }

  
  vehicles() :Observable<any> {
    return this.http.get(`${this.baseUrl}/vehicles`);
  }
  challans(vehicleNumber: string) :Observable<any> {
    let url='http://localhost:8000'
    return this.http.get(`${url}/challans/${vehicleNumber}`);
  }
  getCustomer(customerEmail: string):Observable<any> {
    return this.http.get(`${this.baseUrl}/customer/${customerEmail}`);
  }
  checkIfEmailExist(email: string) {
    return this.http.get(`${this.baseUrl}/checkIfEmailExist/${email}`);
  }

  constructor(private http:HttpClient) {
    this.vehicle=new Vehicle();
   }

  private baseUrl:string="http://localhost:8001";

  registerCustomer(customer: Customer) {
    console.log(customer);
    return this.http.post(`${this.baseUrl}` + `/addCustomer/`, customer);
  }

  saveLogin(login:Login) {
    console.log(login);
    
    return this.http.post(`${this.baseUrl}` + `/addLoginForCustomer/`, login);
  }

  validateLogin(loginDetails: Login) {
    console.log(loginDetails);
    return this.http.post(`${this.baseUrl}` + `/validateLogin/`, loginDetails);
  }

  
}
