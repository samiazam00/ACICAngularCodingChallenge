import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { LineOfBusiness } from '../LineOfBusiness';
import { LineOfBusinessService } from '../lineOfBusiness.service';

import { forkJoin } from 'rxjs/internal/observable/forkJoin';

@Component({
  selector: 'app-lineOfBusiness-detail',
  templateUrl: './lineOfBusiness-detail.component.html',
  styleUrls: [ './lineOfBusiness-detail.component.css' ]
})
export class LineOfBusinessDetailComponent implements OnInit {
  lineOfBusiness: LineOfBusiness | undefined;


  constructor(
    private route: ActivatedRoute,
    private lineOfBusinessService: LineOfBusinessService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getLineOfBusiness();
  }

  getLineOfBusiness(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    // for coding challenge:
    // using fork join to save two observable variables
    // this way, we can retrieve and store the number of quotes for a line, too
    // (i also commented out the original code that was here)

    /*this.lineOfBusinessService.getLineOfBusiness(id)
      .subscribe(lineOfBusiness => this.lineOfBusiness = lineOfBusiness); */
     
    forkJoin([
        this.lineOfBusinessService.getLineOfBusiness(id),
        this.lineOfBusinessService.getRecentQuotes(),
      ]).subscribe(([lineOfBusiness, quotesList]) => {   
        this.lineOfBusiness = lineOfBusiness;
        let quoteCount = 0;
        quotesList.forEach(q =>  { // check each quote in the list of all quotes
          if (q.lineOfBusiness === id) { // increment counter if quote found in list asscoated with this line's id
            quoteCount += 1; 
          }
        })
        lineOfBusiness.numQuotes = quoteCount; 
      });

  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.lineOfBusiness) {
      this.lineOfBusinessService.updateLineOfBusiness(this.lineOfBusiness)
        .subscribe(() => this.goBack());
    }
  }
}
