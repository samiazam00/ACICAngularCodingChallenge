import { Component } from '@angular/core';
import { InMemoryDataService } from './in-memory-data.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  //was trying to assign f and g to indivudal variables with the values of each key, and then 
  //displaying them as the popularity on the front page.
  
  f = 0;
  g = 0;
  title = 'Agency Authority - Insurance Coverages Allowed to be Rated'; 
  ngOnInit() {
    this.inlandMarine();
    this.garage()
  }
  garage(){
     this.g = InMemoryDataService.getSortedID(); //this will get the garage popularity 
  }
  inlandMarine(){
    
     //this will get the inland marine popularity
     
  }
}
