import { Component, OnInit } from '@angular/core';

import { LineOfBusiness } from '../LineOfBusiness';
import { LineOfBusinessService } from '../lineOfBusiness.service';

@Component({
  selector: 'app-linesOfBusiness',
  templateUrl: './linesOfBusiness.component.html',
  styleUrls: ['./linesOfBusiness.component.css']
})
export class LineOfBusinessComponent implements OnInit {
  linesOfBusiness: LineOfBusiness[] = [];
  topTwoLinesOfBusiness: LineOfBusiness[] = [];
  lowTwoLinesOfBusiness: LineOfBusiness[] = [];

  constructor(private lineOfBusinessService: LineOfBusinessService) { } 

  ngOnInit() {
    this.getLinesOfBusiness();
  }

  getLinesOfBusiness(): void {
    this.lineOfBusinessService.getLinesOfBusiness()
    .subscribe(linesOfBusiness => this.linesOfBusiness = linesOfBusiness);
  }

  // Getting the top two lines of business
getTopTwoLineOfBusiness(): void{
  this.topTwoLinesOfBusiness = this.linesOfBusiness.sort((a,b) => b.quotes - a.quotes).slice(0,2);
}

// Getting the two least popular lines of business
getLowTwoLineOfBusiness(): void{
  this.lowTwoLinesOfBusiness = this.linesOfBusiness.sort((a,b) => a.quotes - b.quotes).slice(0,2);
}

  add(name: string, description: string): void {
    name = name.trim();
    if (!name) { return; }
    this.lineOfBusinessService.addLineOfBusiness({ name, description } as LineOfBusiness)
      .subscribe(lineOfBusiness => {
        this.linesOfBusiness.push(lineOfBusiness);
      });
  }

  delete(lineOfBusiness: LineOfBusiness): void {
    this.linesOfBusiness = this.linesOfBusiness.filter(lob => lob !== lineOfBusiness);
    this.lineOfBusinessService.deleteLineOfBusiness(lineOfBusiness.id).subscribe();
  }

}
