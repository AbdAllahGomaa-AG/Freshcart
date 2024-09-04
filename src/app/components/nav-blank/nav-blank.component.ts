import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthenticationApiService } from '../../Core/services/Authentication/authentication-api.service';
import { CartService } from '../../Core/services/cart.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.scss',
})
export class NavBlankComponent implements OnInit {
  userName: any = '';
  
  userData: any = null;
  readonly _AuthenticationApiService = inject(AuthenticationApiService);
  readonly _CartService = inject(CartService);

  countNumber: number = 10;
  ngOnInit() {
    this.saveTokenPass();
    this._CartService.getCard().subscribe({
      next: (data) => this._CartService.cartNumber.next(data.numOfCartItems),
    });
    //
    this._CartService.cartNumber.subscribe({
      next: (data) => {
        this.countNumber = data;
      },
    });
  }

  saveTokenPass(): void {
    if (localStorage.getItem('token') !== null) {
      this.userData = jwtDecode(localStorage.getItem('token')!);
      this.userName = this.userData.name;
    }
  }
}
