import {ErrorHandler, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NhtsaApiService {

  baseUrl = 'https://vpic.nhtsa.dot.gov/api/vehicles/'

  constructor() {
  }

  // Get all vehicles type car for the make name
  async getAllCarData() {
    let carsData: any = [];
    await this.getMakesForVehicleType().then(vehiclesData => {
      return vehiclesData.Results.forEach((data:any) => {
        let carDetails: any = {
          'MakeId': data.MakeId,
          'MakeName': data.MakeName,
          'VehicleTypeId': data.VehicleTypeId,
          'VehicleTypeName': data.VehicleTypeName,
          'models': []
        }
        // carDetails.models = this.getModelsForMake(data.Make_Name)
        carsData.push(carDetails);
      })
    })

    return carsData;
  }

  // Get all vehicles type car for the make name
  async getMakesForVehicleType() {
    return await fetch(this.baseUrl + 'GetMakesForVehicleType/car?format=json')
      .then(response => response.json())
  }

  // Get all models based on make name
  async getModelsForMake(makeName: string) {
    // console.log(this.baseUrl + 'GetModelsForMake/' + encodeURIComponent(makeName) + '?format=json')
    let getModelsForMakeUrl = this.baseUrl + 'GetModelsForMake/' + encodeURIComponent(makeName) + '?format=json'
    return await fetch(getModelsForMakeUrl)
      .then(response => response.json())
  }

}
