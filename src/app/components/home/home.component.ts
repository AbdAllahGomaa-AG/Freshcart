import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../Core/services/products.service';
import { IProducts } from '../../Core/interface/iproducts';
import { Subscription } from 'rxjs';
import { CategoryService } from '../../Core/services/category.service';
import { ICategory } from '../../Core/interface/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { SearchPipe } from '../../Core/Pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../Core/services/cart.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { WishlistService } from '../../Core/services/wishlist.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule, RouterLink, SearchPipe, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  TermsText: string = '';
  private readonly _ProductsService = inject(ProductsService);
  private readonly _CategoryService = inject(CategoryService);
  private readonly _CartService = inject(CartService);
  private readonly _NgxSpinnerService = inject(NgxSpinnerService);
  private readonly _WishlistService = inject(WishlistService);

  userName:any =''
  //customOptionsCat
  customOptionsCat: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    autoplay: true,
    autoplayHoverPause: true,
    autoplayTimeout: 4000,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
    nav: false,
  };

  customOptionsMain: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    autoplay: true,
    autoplayHoverPause: true,
    autoplayTimeout: 3000,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: false,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      740: {
        items: 1,
      },
      940: {
        items: 1,
      },
    },
  };

  //
  getAllProducts!: Subscription;
  pro: IProducts[] = [];
  Category: ICategory[] = [];
  userData: any = null;

  //
  ngOnInit() {
    // getAllProducts
    this.saveTokenPass();
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

    //getAllCategory
    this._CategoryService.getAllCategory().subscribe({
      next: (res) => {
        console.log(res.data);
        this.Category = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  //
  ngOnDestroy() {
    this.getAllProducts?.unsubscribe();
  }
  //
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
  //
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
      title: 'Add To Wishlist',
    });
  }
  saveTokenPass(): void {
    if (localStorage.getItem('token') !== null) {
      this.userData = jwtDecode(localStorage.getItem('token')!);
      this.userName = this.userData.name;

    }
  }
}
