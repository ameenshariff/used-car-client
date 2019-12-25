import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { CustomerHomeComponent } from './customer-home/customer-home.component';
import { TrafficChallanComponent } from './traffic-challan/traffic-challan.component';
import { VehicleGarageComponent } from './vehicle-garage/vehicle-garage.component';
import { CartComponent } from './cart/cart.component';
import { PaymentComponent } from './payment/payment.component';
import { CanActivateRouteGuard } from './service/prevent-login.guard';

const routes: Routes = [
  { path: '', redirectTo: '/homepage', pathMatch: 'full' },
  { path: 'homepage', component: HomeComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'customerhome', component: CustomerHomeComponent, canActivate: [CanActivateRouteGuard]},
  { path: 'traffic-challans', component: TrafficChallanComponent, canActivate: [CanActivateRouteGuard]},
  { path: 'vehicle-garage', component: VehicleGarageComponent, canActivate: [CanActivateRouteGuard]},
  { path: 'cart', component: CartComponent, canActivate: [CanActivateRouteGuard]},
  { path: 'payment', component: PaymentComponent, canActivate: [CanActivateRouteGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
