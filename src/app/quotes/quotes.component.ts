import { Component, OnInit } from '@angular/core';
import { LineOfBusinessService } from '../lineOfBusiness.service';
import { CombinedQuotes } from '../combinedQuotes';


@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css']
})
export class QuotesComponent implements OnInit {

  //checking final result quotes with interface CombinedQuotes
  quotes: CombinedQuotes[] = [];
  
  constructor(
    private lineOfBusinessService: LineOfBusinessService) {
  }

  ngOnInit() {
    this.getrecentQuotes();
  }

  getrecentQuotes(): void {
    this.lineOfBusinessService.getrecentQuotes()
      .subscribe(linesOfBusiness => {
        //sort array to show top two popular
        var sortArr = linesOfBusiness.sort(function(a, b){
        return b.count - a.count;
      });
        this.quotes = sortArr;
    });
  }
}

