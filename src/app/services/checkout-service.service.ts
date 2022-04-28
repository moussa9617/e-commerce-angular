import { Observable } from 'rxjs';
import { Purchase } from './../common/purchase';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckoutServiceService {


  private purchaseUrl = 'http://localhost:8080/api/checkout/purchase';
  constructor(private httpClient : HttpClient) { }

placeOrder(purchase : Purchase ) :Observable<any> {

  return this.httpClient.post<Purchase>(this.purchaseUrl,purchase);

}


}