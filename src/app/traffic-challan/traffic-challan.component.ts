import { Component, OnInit, ViewChild } from '@angular/core';
import { CarService } from '../service/car.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { TrafficChallan } from '../model/trafficChallan';
import { Router } from '@angular/router';

@Component({
  selector: 'app-traffic-challan',
  templateUrl: './traffic-challan.component.html',
  styleUrls: ['./traffic-challan.component.css']
})
export class TrafficChallanComponent implements OnInit {
  challans:TrafficChallan[]=[];

  constructor(private service:CarService, private router:Router) { }

  displayedColumns: string[] = ['index', 'vehicleNumber', 'challanGeneratedDate', 'description', 'area', 'challanPaidDate','amount'];
  dataSource

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.service.challans(this.service.getVehicle().vehicleNumber).subscribe(data=>{
      this.challans=data;

      this.dataSource = new MatTableDataSource(this.challans);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        if(this.challans.length==0)
          (<HTMLParagraphElement>document.getElementById("msg")).hidden=false;
    })



    
  }

  back() {
    this.router.navigate(["/customerhome"]);
  }

}
