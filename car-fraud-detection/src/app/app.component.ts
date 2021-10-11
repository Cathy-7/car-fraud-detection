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
    risk: null,
  }
  errorMessage: string = '';

  //use a map to prevent duplication of formula
  formulasDataMap = new Map()

  constructor(private nhtsaApiService: NhtsaApiService) {
  }

  ngOnInit() {
    this.nhtsaApiService.getAllCarData().then(response => {
      this.carDetails = response;
    }).catch(error => {
      this.errorMessage = error.message
    })
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
      risk: formula.risk ? formula.risk : '',
    };
    this.formulasDataMap.set(data, data)
    console.log(this.formulasDataMap)
  }

  removeRow(formula: any) {
    console.log(formula)
    this.formulasDataMap.delete(formula)
  }

  updateCarModelList(event: any) {
    this.carFormula.makeName = event;
    console.log("Hello" + this.carFormula.modelName)
    this.nhtsaApiService.getModelsForMake(event).then(result => {
      this.modelDetails = result.Results
    })
  }
}
