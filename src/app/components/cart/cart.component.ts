import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../Core/services/cart.service';
import { Icart } from '../../Core/interface/icart';
import { CurrencyPipe } from '@angular/common';
import Swal from 'sweetalert2';
import { error } from 'console';
import { RouterLink } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  private readonly _CartService = inject(CartService);
  private readonly _NgxSpinnerService = inject(NgxSpinnerService);

  carDetails: Icart = {} as Icart;

  cartNumberCart: number = 0;
  cartItem: number = 0;

  ngOnInit() {
    this._NgxSpinnerService.show('loading');
    this._CartService.getCard().subscribe({
      next: (res) => {
        console.log(res, 'ag');
        this.carDetails = res.data;
        this.cartItem = res.numOfCartItems;
        this._NgxSpinnerService.hide('loading');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  //
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
  alertUpdate(): void {
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
      title: 'Update Item',
    });
  }

  removeItem(id: string): void {
    this._CartService.removeCart(id).subscribe({
      next: (res) => {
        this.alertRemove();
        console.log(res);
        this.carDetails = res.data;
        this.cartNumberCart = res.numOfCartItems;
        this._CartService.cartNumber.next(res.numOfCartItems);
        this.cartItem = res.numOfCartItems;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  UpdateCounter(id: string, count: number): void {
    if (count > 0) {
      this._CartService.UpdateCart(id, count).subscribe({
        next: (res) => {
          this.alertUpdate();
          console.log(res);
          this.carDetails = res.data;
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  removeAll(): void {
    this._CartService.clearAllCart().subscribe({
      next: (res) => {
        this.alertRemove();
        console.log('remove');
        if (res.message == 'success') {
          this.carDetails = {} as Icart;
          this.cartItem = 0;
          this.cartNumberCart = 0;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
