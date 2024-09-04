import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environments } from '../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public readonly _HttpClient = inject(HttpClient);

  //
  cartNumber: BehaviorSubject<number> = new BehaviorSubject(0);
  //
  addToCart(id: string): Observable<any> {
    return this._HttpClient.post(
      `${environments.busUrl}/api/v1/cart`,
      {
        productId: id,
      },
      {}
    );
  }

  getCard(): Observable<any> {
    return this._HttpClient.get(`${environments.busUrl}/api/v1/cart`, {});
  }

  removeCart(id: string): Observable<any> {
    return this._HttpClient.delete(
      `${environments.busUrl}/api/v1/cart/${id}`,
      {}
    );
  }

  UpdateCart(id: string, count: number): Observable<any> {
    return this._HttpClient.put(
      `${environments.busUrl}/api/v1/cart/${id}`,
      {
        count: count,
      },
      {}
    );
  }

  clearAllCart(): Observable<any> {
    return this._HttpClient.delete(`${environments.busUrl}/api/v1/cart`);
  }
}
