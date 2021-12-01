import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { LineOfBusiness } from './LineOfBusiness';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {


    const recentQuotes = [
      { id: 101, quoteNumber: 'AC123PC', lineOfBusiness: 11 },
      { id: 102, quoteNumber: 'AC124PC', lineOfBusiness: 12 },
      { id: 103, quoteNumber: 'AC125PC', lineOfBusiness: 13 },
      { id: 104, quoteNumber: 'AC126PC', lineOfBusiness: 14 },
      { id: 105, quoteNumber: 'AC127PC', lineOfBusiness: 15 },
      { id: 106, quoteNumber: 'AC125PC', lineOfBusiness: 13 }, // so theres 3 13's, 2 15'2, and 1*(11,12,14)
      { id: 107, quoteNumber: 'AC126PC', lineOfBusiness: 13 },
      { id: 108, quoteNumber: 'AC127PC', lineOfBusiness: 15 }
    ];


/* Coming from a matlab background, I immediately wanted to simply tac a counter on the end of each of these statements that would simply add 1 to a variable every time it was called.  
 I couldnt find an effective way to do this in angular, most likely becausae I did not know what to look URLSearchParams.  In a video series I was watching though, they used this "filter"
 function, to sort through an array and find if a value was a number or Notification.  I then thought this could be used to find a specific Number, and after some research, I'm pretty sure
 it Will.  I'm having some trouble figuring out how to run the code though outside of just testing specific pages in a live server.  But basically this is just taking the  
 recentQuotes object and just filtering through saying, "which ones equal the id im looking for," then it slaps them in an array, and the length of that array is the number of times
 a type of quote was quoted.  right now I'm using this as a sort of a vaulting board to get my feet under me for understanding how java/angular work and to use these variable in
 this object to code the rest of it.  I'll try to figure out a way thats more unique to me once i get more comfortable with the ideas of CSS,TS, and html*/

    const linesOfBusiness = [
      { id: 11, name: 'General Liability', description: 'Liability coverage for businesses.', quotes : recentQuotes.filter(quotes => quotes.lineOfBusiness==11).length },
      { id: 12, name: 'Commercial Property', description: 'Property coverage for businesses.', quotes : recentQuotes.filter(quotes => quotes.lineOfBusiness==12).length },
      { id: 13, name: 'Inland Marine', description: 'Coverage for tools and machinery on job sites.', quotes : recentQuotes.filter(quotes => quotes.lineOfBusiness==13).length },
      { id: 14, name: 'Ocean Marine', description: 'Coverage for dock and boat repair businesses.', quotes : recentQuotes.filter(quotes => quotes.lineOfBusiness==14).length },
      { id: 15, name: 'Garage', description: 'Coverage for auto repairs and car sales.', quotes : recentQuotes.filter(quotes => quotes.lineOfBusiness==15).length  }
    ];

// ********************************************************************************************************************************************************
// ********************************************************************************************************************************************************  
// ********************************************************* MY ATTEMPT AT SORTING CODE *******************************************************************
// ******************************************************************************************************************************************************** 
//   const quotesArray = [{}];
//     for (let i = 0; i < length(linesOfBusiness); i++){
//       for (let x = 0; x < length(recentQuotes), x++){
    
//       if recentQuotes.lineOfBusiness(x) == linesOfBusiness.id(i){
//       const quotesArray(i) = [quotesArray(i),recentQuotes.lineOfBusiness(x)]; // this doesnt even have to be anything specific now that i think of it because im just going to mesaure its lenght
//       }
//      }
// }

// const numberOfQuotes = [
//   for (let x = 0; x < length(quotesArray); x++){}
//   {quotes: length(quotesArray(x))}
// }
// ];

// so I made this above but I'm pretty sure this isnt how angular works, but this is how i would've made a counter variable in something like python or matlab. I know its fairly rudamentary, 
// but its straightforward.  It just goes through the arrays or objects (lines of business and recent quotes in this case), and finds where the id's match the line of business.
// Then its just reads the length of the array and boom, youve got the number of times the line of business was quoted.  I think for this assignment though, at least in this case, I'll
// stick with a function that works for angular and is a little more slick until I have a better understanding of typescript

// ********************************************************************************************************************************************************
// ********************************************************************************************************************************************************
// ******************************************************************************************************************************************************** 
// ********************************************************************************************************************************************************  

    
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

/*
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


This code commented below could be used for a demonstration, just comment out the linesOfBuseness declared above, and uncomment this code below. 
Plus, see the comments in top-lines-of-business.component.ts for the code that would be used in that case.
*/    

/*
// Overrides the genId method to ensure that a line of business always has an id.
// If the lines of business array is empty,
// the method below returns the initial number (11).
// if the lines of business array is not empty, the method below returns the highest
// line of business id + 1.
genId(linesOfBusiness: LineOfBusiness[]): number {
  return linesOfBusiness.length > 0 ? Math.max(...linesOfBusiness.map(lineOfBusiness => lineOfBusiness.id)) + 1 : 11;
}
}
*/