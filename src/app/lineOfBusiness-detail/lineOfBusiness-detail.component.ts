import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { forkJoin } from 'rxjs';

import { LineOfBusiness } from '../LineOfBusiness';
import { LineOfBusinessService } from '../lineOfBusiness.service';

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
    forkJoin([
      this.lineOfBusinessService.getLineOfBusiness(id),
      this.lineOfBusinessService.getQuotesByLineOfBusinessId(id) 
    ]).subscribe(([lineOfBusinessResponse, quotesResponse]) => {
      // This check of undefined quotes result will still allow to display rest of details information with just quotes number=0 in this exceptional case
      lineOfBusinessResponse.quotes = quotesResponse == undefined ? 0 : quotesResponse.length;     
      this.lineOfBusiness = lineOfBusinessResponse;
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
