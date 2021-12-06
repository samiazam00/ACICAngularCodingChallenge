import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { LineOfBusiness } from './LineOfBusiness';
var sortedMap = new Map(); //this map will be used to sort
var sortedFirst = sortedMap.get(13);




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

    //instantiating a new Hashmap which will store the lineOfBusiness as a key and their frequency as a value. I found this to be the best solution due to
    //the fact that hashmaps have a O(1) time complexity for insertion and deletion 
    var map = new Map();
    var sortedMap = new Map();
    
    

    recentQuotes.sort((a, b) => a.lineOfBusiness - b.lineOfBusiness); //This will sort the elements from least to greatest for simplicity
    for(let i=0; i<recentQuotes.length; i++){ //this cycles through each quote 
      const currentLine = recentQuotes[i].lineOfBusiness  
      const lineInMap = map.get(currentLine); //abstracts the variable outside the if statement 
          map.set(currentLine, lineInMap + 1); 
          if (lineInMap) {                   //checks if the variable is defined
      } else {
          map.set(currentLine, 1);
          
      }
      
      sortedMap = new Map([...map.entries()].sort(([key1, value1], [key2, value2]) => value2 - value1)); // this will sort the keys and values by the most popular first
      
      }
      
      
      
      
    //returns the value into the console 
    console.log(sortedMap);
    console.log("the most popular is Inland Marine with "+sortedMap.get(13) +" recent quotes");
    console.log("the second most popular is garage with "+sortedMap.get(15) +" recent quotes");
    
    
    
    
    return {linesOfBusiness};
    
    
    
  }

  // Overrides the genId method to ensure that a line of business always has an id.
  // If the lines of business array is empty,
  // the method below returns the initial number (11).
  // if the lines of business array is not empty, the method below returns the highest
  // line of business id + 1.
  genId(linesOfBusiness: LineOfBusiness[]): number {
    return linesOfBusiness.length > 0 ? Math.max(...linesOfBusiness.map(lineOfBusiness => lineOfBusiness.id)) + 1 : 11;
    
  }
  static getSortedID(){
    sortedFirst = sortedMap.get(13);
   
   return sortedFirst;
    
  }
}
