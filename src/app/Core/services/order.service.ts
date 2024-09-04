import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from '../../environments/environments';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private _HttpClient: HttpClient) {}


checkOut(id:string | null ,shipping:object):Observable<any>{
return this._HttpClient.post(
  `${environments.busUrl}/api/v1/orders/checkout-session/${id}?url=${environments.local}`,
  {
    "shippingAddress": shipping
  },
  {
  }
);
}
}
