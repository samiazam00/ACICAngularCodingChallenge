import { Component, OnInit } from '@angular/core';
import { LineOfBusiness } from '../LineOfBusiness';
import { LineOfBusinessService } from '../lineOfBusiness.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  linesOfBusiness: LineOfBusiness[] = [];

  constructor(private lineOfBusinessService: LineOfBusinessService) { }

  ngOnInit() {    
  }
}
