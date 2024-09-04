import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from '../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class BrandsService {
  public readonly _HttpClient = inject(HttpClient);

  AllBrands(): Observable<any> {
    return this._HttpClient.get(`${environments.busUrl}/api/v1/brands`);
  }
}
