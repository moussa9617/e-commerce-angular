import { State } from './../common/state';
import { Country } from './../common/country';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceShopFormService {

  private urlBase = 'http://localhost:8080/api' ;


  private uri = 'http://localhost:8080/api/states/search/findByCountryCode?code=US'
  constructor( private httpClient  : HttpClient) { }

  getCreditCardMonths(startMonth : number) : Observable<number[]>{
      let data : number[] = [];

      for (let themonth = startMonth ; themonth<= 12 ; themonth++){
        data.push(themonth);
      }
    return of(data);
  }

  getCreditCartYear() : Observable<number[]>{

    let data : number[] = [];
    const startYear : number = new Date().getFullYear();
    const endYear : number = startYear+10 ;
    for (let theyear = startYear ; theyear<= endYear ; theyear++){
      data.push(theyear);
    }
    return of(data);
  }


  getCountries() : Observable<GetResponseCountry>{

    return this.httpClient.get<GetResponseCountry>(this.urlBase+'/countries');

  }
  getStateByCodeCountry( code : String )  : Observable<GetResponseState>{
    return this.httpClient.get<GetResponseState>(this.urlBase + `/states/search/findByCountryCode?code=${code}`);
  }
}
interface GetResponseCountry{
  _embedded :{
    countries : Country[];
  }
}
interface GetResponseState{
  _embedded :{
    states : State[];
  }
}
