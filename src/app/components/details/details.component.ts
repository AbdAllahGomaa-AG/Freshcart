import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { log } from 'console';
import { ProductsService } from '../../Core/services/products.service';
import { IProducts } from '../../Core/interface/iproducts';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { CartService } from '../../Core/services/cart.service';
import Swal from 'sweetalert2';
import { WishlistService } from '../../Core/services/wishlist.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit, OnDestroy {
  //
  details: IProducts | null = null;

  //
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _ProductsService = inject(ProductsService);
  private readonly _CartService = inject(CartService);
  private readonly _WishlistService = inject(WishlistService);

  _NgxSpinnerService = inject(NgxSpinnerService);

  private _subscription: Subscription | null = null;
  //
  ngOnInit() {
    this._NgxSpinnerService.show('loading');
    this._ActivatedRoute.paramMap.subscribe({
      next: (p) => {
        let data = p.get('id');
        this._subscription = this._ProductsService
          .getAllProductSpecific(data)
          .subscribe({
            next: (res) => {
              console.log(res.data);
              this.details = res.data;
              this._NgxSpinnerService.hide('loading');
            },
            error: (err) => {
              console.log(err);
            },
          });
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
  currentImage: string = this.details?.imageCover!;
  //
  onImageClick(imageSrc: string): void {
    if (this.details) {
      this.details.imageCover = imageSrc;
    }
  }
  ngOnDestroy() {
    // Unsubscribe to prevent memory leaks
    if (this._subscription) {
      console.log('exit');

      this._subscription.unsubscribe();
    }
  }

  addToCartCount(id: string): void {
    this._CartService.addToCart(id).subscribe({
      next: (res) => {
        this.alertSuccessLogin();
        this._CartService.cartNumber.next(res.numOfCartItems);
        console.log(res.numOfCartItems);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  alertSuccessLogin(): void {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-right',
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: 'success',
      title: 'Add To Cart',
    });
  }

  addToWishlist(id: string): void {
    this._WishlistService.addToWishlist(id).subscribe({
      next: (res) => {
        this.alertSuccessLogin();
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }


}
