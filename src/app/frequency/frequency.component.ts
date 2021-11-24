import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LineOfBusiness } from '../LineOfBusiness';
import { LineOfBusinessService } from '../lineOfBusiness.service';
import { RecentQuotes } from '../RecentQuotes';

@Component({
  selector: 'app-frequency',
  templateUrl: './frequency.component.html',
  styleUrls: ['./frequency.component.css']
})
export class FrequencyComponent implements OnInit {
  linesOfBusiness: LineOfBusiness[] = [];
  recentQuotes: RecentQuotes[] = [];
  popularLines: LineOfBusiness[] = [];

  constructor(
    private lineOfBusinessService: LineOfBusinessService,
  ) { }

  ngOnInit() {
    this.getLinesOfBusiness();
    this.getRecentQuotes();
  }

  getLinesOfBusiness(): void {
    this.lineOfBusinessService.getLinesOfBusiness()
      .subscribe(linesOfBusiness => this.linesOfBusiness = linesOfBusiness.slice(1, 4));
  }

  getRecentQuotes(): void {
    this.lineOfBusinessService.getRecentQuotes()
      .subscribe(recentQuotes => {
        this.recentQuotes = recentQuotes
        this.calcPopularLinesOfBusiness();
      });
  }

  calcPopularLinesOfBusiness() {
    // get most popular line of business
    let id = this.findMode(this.recentQuotes);

    // get Line of Business from service
    this.lineOfBusinessService.getLineOfBusiness(id)
      .subscribe(lineofBusiness => {
        // push line of business to popularity array
        this.popularLines.push(lineofBusiness);
      })

    // remove all quotes with ID {id} from array
    this.recentQuotes.forEach((quote, index) => {
      if (quote.lineOfBusiness == id) {
        this.recentQuotes.splice(index, 1);
      }
    })

    // get second most popular line of business
    id = this.findMode(this.recentQuotes);

    // get Line of Business from service
    this.lineOfBusinessService.getLineOfBusiness(id)
      .subscribe(lineofBusiness => {
        // push line of business to popularity array
        this.popularLines.push(lineofBusiness);
      })
  }

  private findMode(arr: RecentQuotes[]): number {
    let frequency: any[] = [];
    let maxFreq = 0;
    let mode: number = 0;


    for (let i = 0; i < arr.length; i++) {
      frequency[arr[i].lineOfBusiness] = (frequency[arr[i].lineOfBusiness] || 0) + 1;

      if (frequency[arr[i].lineOfBusiness] > maxFreq) {
        maxFreq = frequency[arr[i].lineOfBusiness]
      }
    }

    for (var i in frequency) {
      if (frequency[i] == maxFreq) {
        mode = +i
      }
    }

    return mode;
  }
}
