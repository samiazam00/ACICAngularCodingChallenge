import { Component } from '@angular/core';
import { LineOfBusiness } from './LineOfBusiness';
import { LineOfBusinessService } from './lineOfBusiness.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent {
  title = 'Agency Authority - Insurance Coverages Allowed to be Rated';

  linesOfBusiness: LineOfBusiness[] = [];
  topTwoLinesOfBusiness: LineOfBusiness[] = [];
  lowTwoLinesOfBusiness: LineOfBusiness[] = [];

  


  // ngOnInit() {
  //   this.getLinesOfBusiness();
  // }



  // Getting the top two lines of business
getTopTwoLineOfBusiness(): void{
  this.topTwoLinesOfBusiness = this.linesOfBusiness.sort((a,b) => b.quotes - a.quotes).slice(0,2);
}

// Getting the two least popular lines of business
getLowTwoLineOfBusiness(): void{
  this.lowTwoLinesOfBusiness = this.linesOfBusiness.sort((a,b) => a.quotes - b.quotes).slice(0,2);

// In kinda misunderstood part of the assignment, and thought that when they were saying they wanted to know which lines of business weren't being quotes a bunch, they wanted 
// an explicit showing.  Upon further analysis, I think they just meant that as an extension of wanting to see how many times things were quoted in the description page.
// I'll leave it here though as a quick fix in case someone would like the bottom two shown with the top two



}
}
  // getLinesOfBusiness(): void {
  //   this.lineOfBusinessService.getLinesOfBusiness()
  //   .subscribe((linesOfBusiness: LineOfBusiness[]) => this.linesOfBusiness = linesOfBusiness);
  // }
  // constructor(public lineOfBusinessService: LineOfBusinessService) { } 