import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { LineOfBusiness } from './LineOfBusiness';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const linesOfBusiness = [
      { id: 11, name: 'General Liability', description: 'Liability coverage for businesses.' },
      { id: 12, name: 'Commercial Property', description: 'Property coverage for businesses.' },
      { id: 13, name: 'Inland Marine', description: 'Coverage for tools and machinery on job sites.' },
      { id: 14, name: 'Ocean Marine', description: 'Coverage for dock and boat repair businesses.' },
      { id: 15, name: 'Garage', description: 'Coverage for auto repairs and car sales.' }
    ];


    const recentQuotes = [
      { id: 101, quoteNumber: 'AC123PC', lineOfBusiness: 11 },
      { id: 102, quoteNumber: 'AC124PC', lineOfBusiness: 12 },
      { id: 103, quoteNumber: 'AC125PC', lineOfBusiness: 13 },
      { id: 104, quoteNumber: 'AC126PC', lineOfBusiness: 14 },
      { id: 105, quoteNumber: 'AC127PC', lineOfBusiness: 15 },
      { id: 106, quoteNumber: 'AC125PC', lineOfBusiness: 13 },
      { id: 107, quoteNumber: 'AC126PC', lineOfBusiness: 13 },
      { id: 108, quoteNumber: 'AC127PC', lineOfBusiness: 15 }
    ];


/*
If I was looking at this requested test task in a real project, I would consider implementing a calculated property for the quotes number on the server side.
One of the options is to do it in the ORM itself. As an alternative, inside the backend API somewhere.
This gives a lot of benefits and reduces the needed amount of code on the client side, because client would receive already precalculated data.
BTW, we do use this approach in our products, when such fields are part of ORM.
For a demonstration, I will call this method #ServerSideCalculatedProperty.
Using this would allow to keep the code behind in lineOfBusiness.service.ts, lineOfBusiness-detail.component.js as is, without any changes.
Quotes number property value can be easily binded to the UI, for example in details screen.

This code commented below could be used for a demonstration, just comment out the linesOfBuseness declared above, and uncomment this code below. 
Plus, see the comments in top-lines-of-business.component.ts for the code that would be used in that case.
*/    
    /*
    const linesOfBusiness = [
      { id: 11, name: 'General Liability', description: 'Liability coverage for businesses.', quotes : recentQuotes.filter(x => x.lineOfBusiness==11).length },
      { id: 12, name: 'Commercial Property', description: 'Property coverage for businesses.', quotes : recentQuotes.filter(x => x.lineOfBusiness==12).length },
      { id: 13, name: 'Inland Marine', description: 'Coverage for tools and machinery on job sites.', quotes : recentQuotes.filter(x => x.lineOfBusiness==13).length },
      { id: 14, name: 'Ocean Marine', description: 'Coverage for dock and boat repair businesses.', quotes : recentQuotes.filter(x => x.lineOfBusiness==14).length },
      { id: 15, name: 'Garage', description: 'Coverage for auto repairs and car sales.', quotes : recentQuotes.filter(x => x.lineOfBusiness==15).length  }
    ];
*/

    return {linesOfBusiness, recentQuotes};
  }

  // Overrides the genId method to ensure that a line of business always has an id.
  // If the lines of business array is empty,
  // the method below returns the initial number (11).
  // if the lines of business array is not empty, the method below returns the highest
  // line of business id + 1.
  genId(linesOfBusiness: LineOfBusiness[]): number {
    return linesOfBusiness.length > 0 ? Math.max(...linesOfBusiness.map(lineOfBusiness => lineOfBusiness.id)) + 1 : 11;
  }
}
