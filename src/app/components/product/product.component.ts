import { Component, inject, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { ProductsService } from '../../Core/services/products.service';
import { IProducts } from '../../Core/interface/iproducts';
import { CartService } from '../../Core/services/cart.service';
import Swal from 'sweetalert2';
import { WishlistService } from '../../Core/services/wishlist.service';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../Core/Pipes/search.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [FormsModule , SearchPipe , RouterLink],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent implements OnInit {
  TermsText: string = '';

  private readonly _NgxSpinnerService = inject(NgxSpinnerService);
  private readonly _ProductsService = inject(ProductsService);
  private readonly _CartService = inject(CartService);
  private readonly _WishlistService = inject(WishlistService);

  pro: IProducts[] = [];

  getAllProducts!: Subscription;

  ngOnInit() {
    this._NgxSpinnerService.show('loading');
    this.getAllProducts = this._ProductsService.getAllProducts().subscribe({
      next: (res) => {
        console.log(res);
        this.pro = res.data;
        this._NgxSpinnerService.hide('loading');
      },
      error: (err) => {
        console.log(err);
      },
    });
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
      title: 'Add To Wishlist',
    });
  }
}
