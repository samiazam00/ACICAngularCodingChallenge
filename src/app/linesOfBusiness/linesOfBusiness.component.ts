import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';

import { LineOfBusiness } from '../LineOfBusiness';
import { LineOfBusinessService } from '../lineOfBusiness.service';

@Component({
  selector: 'app-linesOfBusiness',
  templateUrl: './linesOfBusiness.component.html',
  styleUrls: ['./linesOfBusiness.component.css']
})
export class LineOfBusinessComponent implements OnInit {
  linesOfBusiness: LineOfBusiness[] = [];

  constructor(private lineOfBusinessService: LineOfBusinessService) { } 

  ngOnInit() {
    this.getLinesOfBusiness();
  }

  getLinesOfBusiness(): void {
    // for coding challenge:
    // using fork join to associate each line with its quotes
     
    forkJoin([
        this.lineOfBusinessService.getLinesOfBusiness(),
        this.lineOfBusinessService.getRecentQuotes(),
      ]).subscribe(([linesOfBusiness, quotesList]) => {
        this.linesOfBusiness = linesOfBusiness;

        linesOfBusiness.forEach( line => {
          let quoteCount = 0;
          quotesList.forEach(q =>  { 
            if (q.lineOfBusiness === line.id) { 
              quoteCount += 1; 
            }
          })
          line.numQuotes = quoteCount; 
        });
      });
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

  // for displaying by popularity:
  sortByPopularity(): void {
    this.linesOfBusiness.sort((l1, l2) => l1.numQuotes > l2.numQuotes ? 
      -1 : l1.numQuotes < l2.numQuotes ? 1 : 0);
  }

  // for displaying by id:
  sortByID(): void {
    this.linesOfBusiness.sort((l1, l2) => l1.id < l2.id ? -1 : l1.id > l2.id ? 1 : 0);
  }

}
