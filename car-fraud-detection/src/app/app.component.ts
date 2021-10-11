import {Component, OnInit} from '@angular/core';
import {NhtsaApiService} from "./service/nhtsa-api.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'car-fraud-detection';

  carDetails: any;
  modelDetails: any = []

  carFormula = {
    id: null,
    makeName: null,
    modelName: null,
    yearComparisonType: null,
    year: null,
    fuelType: null,
    risk: 'low',
  }
  errorMessage = {
    responseCode: null,
    response: []
  }


  //use a map to prevent duplication of formula
  formulasDataMap = new Map()

  constructor(private nhtsaApiService: NhtsaApiService) {
  }

  ngOnInit() {
    this.nhtsaApiService.getAllCarData().then(response => {
      if (response.responseCode) {
        this.errorMessage.responseCode = response.responseCode
        this.errorMessage.response = response.response.message
      } else {
        this.errorMessage = {
          responseCode: null,
          response: []
        }
        this.carDetails = response;
      }

    })

    console.log(this.carDetails);
  }

  get getFormulas() {
    return Array.from(this.formulasDataMap.entries());
  }

  createFormulas(formula: any) {
    let timestampID = Math.floor(new Date().getTime());

    let data = {
      id: formula.id ? formula.id : '',
      makeName: formula.makeName ? formula.makeName : '',
      modelName: formula.modelName ? formula.modelName : '',
      yearComparisonType: formula.yearComparisonType ? formula.yearComparisonType : null,
      year: formula.year ? formula.year : null,
      fuelType: formula.fuelType ? formula.fuelType : '',
      risk: formula.risk ? formula.risk : 'low',
    };

    // use stingified data as id to prevent duplication when added by user
    let dataId = JSON.stringify(data)
    console.log(data)
    this.formulasDataMap.set(dataId, data)
  }

  removeRow(formula: any) {
    this.formulasDataMap.delete(formula)
  }

  updateCarModelList(event: any) {
    this.carFormula.makeName = event;
    this.nhtsaApiService.getModelsForMake(event).then(result => {
      this.modelDetails = result.Results
    })
  }
}
