import {Component} from '@angular/core';
import {NhtsaApiService} from "./service/nhtsa-api.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'car-fraud-detection';
  carDetails: any;

  constructor(private nhtsaApiService: NhtsaApiService) {
    this.nhtsaApiService.getAllCarData().then(data => {
      console.log(data)
      this.carDetails = data;
    })
  }
}
