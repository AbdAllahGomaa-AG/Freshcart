import { Component, inject, OnInit } from '@angular/core';
import { WishlistService } from '../../Core/services/wishlist.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { IWishlist } from '../../Core/interface/iwishlist';
import { CurrencyPipe } from '@angular/common';
import Swal from 'sweetalert2';
import { CartService } from '../../Core/services/cart.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss',
})
export class WishlistComponent implements OnInit {
  private readonly _WishlistService = inject(WishlistService);
  private readonly _NgxSpinnerService = inject(NgxSpinnerService);
  private readonly _CartService = inject(CartService);

  carWishlist: IWishlist[] = []; // This should be an array.

  ngOnInit(): void {
    this._NgxSpinnerService.show('loading');
    this._WishlistService.getCart().subscribe({
      next: (res) => {
        console.log(res.data);
        this.carWishlist = res.data;
        this._NgxSpinnerService.hide('loading');
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  // alertSuccess
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

  alertRemove(): void {
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
      icon: 'error',
      title: 'Remove Item',
    });
  }
  //

  addToCartCount(id: string): void {
    this._CartService.addToCart(id).subscribe({
      next: (res) => {
        this.alertSuccessLogin();
        this.removeWishList(id);
        console.log('done');
      },
      error: (err) => {
        console.log('err');
      },
    });
  }

  removeWishList(id: string): void {
    this._WishlistService.removeCart(id).subscribe({
      next: (res) => {

        this.carWishlist = this.carWishlist.filter((item) => item._id !== id);
        this.alertRemove()
        console.log(res.data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
