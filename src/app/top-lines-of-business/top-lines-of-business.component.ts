import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { LineOfBusiness } from '../LineOfBusiness';
import { LineOfBusinessService } from '../lineOfBusiness.service';

@Component({
  selector: 'top-lines-of-business',
  templateUrl: './top-lines-of-business.component.html',
  styleUrls: ['./top-lines-of-business.component.css']
})
export class TopLinesOfBusinessComponent implements OnInit {
  topTwoLinesOfBusiness: LineOfBusiness[] = [];
  linesOfBusiness: LineOfBusiness[] = [];
  
  constructor(private lineOfBusinessService: LineOfBusinessService
    ,private router: Router) { }
  
  ngOnInit() {
    this.getTopTwoLinesOfBusiness(); 
  }

  isDisabled(): boolean {
    // The condition of checking if user is on lineOfBusiness detail section can be made more advanced in a case if we have different types of detail pages for example.
    return (this.router.url.indexOf('/detail/') > -1 )
  }

  onClick(lob: LineOfBusiness) {
    // Navigate to a certain detail page
    this.router.navigate(["/detail/" + lob.id]);
}
    
  getTopTwoLinesOfBusiness(): void {
    // Combine multiple requests and wait for them to finish
    forkJoin([
      this.lineOfBusinessService.getLinesOfBusiness(),
      this.lineOfBusinessService.getRecentQuotes() 
    ]).subscribe(([linesOfBusinessResponse, quotesResponse]) => {
      linesOfBusinessResponse.forEach(lob => {
        lob.quotes = quotesResponse.filter( q => q.lineOfBusiness == lob.id ).length;
      });
      this.topTwoLinesOfBusiness = linesOfBusinessResponse.sort((a, b) => b.quotes - a.quotes).slice(0, 2);
    });

    //This would be the only code change needed in this .ts in a case if #ServerSideCalculatedProperty method, described in InMemoryDataService, would be used.
    //this.lineOfBusinessService.getLinesOfBusiness()
    // .subscribe(linesOfBusiness => this.topTwoLinesOfBusiness = linesOfBusiness.sort((a, b) => b.quotes - a.quotes).slice(0, 2));
  }
}
