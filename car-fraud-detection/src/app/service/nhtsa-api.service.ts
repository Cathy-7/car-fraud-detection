import {Injectable} from '@angular/core';

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
      console.log(vehiclesData)
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
      console.log(carsData)
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
    return await fetch(this.baseUrl + 'GetModelsForMake/' + encodeURIComponent(makeName) + '?format=json')
      .then(response => response.json())
  }


}
