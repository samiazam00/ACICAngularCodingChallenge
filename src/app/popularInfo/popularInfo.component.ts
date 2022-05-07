import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { LineOfBusiness } from '../LineOfBusiness';
import { LineOfBusinessService } from '../lineOfBusiness.service';
import { RecentQuotes } from '../quotes/RecentQuotes';

@Component({
  selector: 'app-popularInfo',
  templateUrl: './popularInfo.component.html',
  styleUrls: [ './popularInfo.component.css' ]
})

// modified from dashboard
export class PopularInfoComponent implements OnInit {
  linesOfBusiness: LineOfBusiness[] = [];
  // Additional info for coding challenge:
  popularLines: LineOfBusiness[] = [];
  quotes: RecentQuotes[] = []; 

constructor(private lineOfBusinessService: LineOfBusinessService) { }

ngOnInit() : void {
    this.getLinesOfBusiness();
    this.getRecentQuotes();
    this.getPopularLines();
  }

getLinesOfBusiness(): void {
    this.lineOfBusinessService.getLinesOfBusiness()
      .subscribe(linesOfBusiness => this.linesOfBusiness = linesOfBusiness.slice(1, 4));
  }

getRecentQuotes(): void {
  this.lineOfBusinessService.getRecentQuotes()
      .subscribe(quotes => {
        this.quotes = quotes;
      });
}

// get popular lines: derive the two lines with the most quotes
getPopularLines(): void {
  let quotes1 = 0; // will hold the highest number of quotes
  let quotes2 = 0; // second highest number
  let line1 : LineOfBusiness = { // most popular line, default values at the start
    id: 0,
    name: 'Default',
    description: 'Placeholder',
    numQuotes: 0
  };
  let line2 = line1; // second most popular

  this.lineOfBusinessService.getLinesOfBusiness()
      .subscribe(allLines => {
          allLines.forEach(line => { //for each line, find the associated quotes
          let quoteCount = 0;
          this.quotes.forEach(q =>  { // check each quote in the list of all quotes
          if (q.lineOfBusiness === line.id) { // increment counter if quote found in list asscoated with this line's id
            quoteCount += 1;
          }});
          line.numQuotes = quoteCount; 

          if(line.numQuotes > quotes1) {
            line1 = line;
            quotes1 = line.numQuotes;
          }
          else if(line.numQuotes > quotes2){
            line2 = line;
            quotes2 = line.numQuotes;
          }
        }) 
          this.popularLines.push(line1);
          this.popularLines.push(line2);
      });
  }

}
