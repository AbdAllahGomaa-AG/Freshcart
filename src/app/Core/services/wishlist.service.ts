import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environments } from '../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  public readonly _HttpClient = inject(HttpClient);

  //
  cartNumber: BehaviorSubject<number> = new BehaviorSubject(0);
  //

  addToWishlist(id: string): Observable<any> {
    return this._HttpClient.post(
      `${environments.busUrl}/api/v1/wishlist`,
      {
        productId: id,
      },
      {}
    );
  }

  getCart(): Observable<any> {
    return this._HttpClient.get(`${environments.busUrl}/api/v1/wishlist`, {});
  }

  removeCart(id:string): Observable<any> {
    return this._HttpClient.delete(`${environments.busUrl}/api/v1/wishlist/${id}`)
  }
}
