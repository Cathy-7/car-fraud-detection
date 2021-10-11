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

    let response = await this.getMakesForVehicleType()
    if(response.status === 200) {
      response.json()
        .then(vehiclesData => {
          console.log(vehiclesData)
          return vehiclesData.Results.forEach((data: any) => {
            let carDetails: any = {
              'MakeId': data.MakeId,
              'MakeName': data.MakeName,
              'VehicleTypeId': data.VehicleTypeId,
              'VehicleTypeName': data.VehicleTypeName,
              'models': []
            }
            carsData.push(carDetails);
          })
        })
      return carsData;
    }else{
      console.log(response.status)
      let errorObj = {
        responseCode: response.status,
        response: await response.json()
      }

      return errorObj
    }
  }

  // Get all vehicles type car for the make name
  async getMakesForVehicleType() {
    return await fetch(this.baseUrl + 'GetMakesForVehicleType/car?format=json')
      .then(response => response)
  }

  // Get all models based on make name
  async getModelsForMake(makeName: string) {
    let getModelsForMakeUrl = this.baseUrl + 'GetModelsForMake/' + encodeURIComponent(makeName) + '?format=json'
    return await fetch(getModelsForMakeUrl)
      .then(response => response.json())
  }

}
