import { Component, inject, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BrandsService } from '../../Core/services/brands.service';
import { error } from 'console';
import { Ibrands } from '../../Core/interface/ibrands';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss',
})
export class BrandsComponent implements OnInit {
  //
  CartBrands: Ibrands[] = [{} as Ibrands];

  //
  private readonly _NgxSpinnerService = inject(NgxSpinnerService);
  private readonly _BrandsService = inject(BrandsService);
  //
  ngOnInit() {
    this._NgxSpinnerService.show('loading');
    this._BrandsService.AllBrands().subscribe({
      next: (res) => {
        console.log(res.data);
        this.CartBrands = res.data;
        this._NgxSpinnerService.hide('loading');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
