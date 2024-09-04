import { Routes } from '@angular/router';
import { LayoutAuthComponent } from './layout/layout-auth/layout-auth.component';
import { LayoutBlankComponent } from './layout/layout-blank/layout-blank.component';
import { loginGuard } from './Core/Guards/login.guard';
import { loginActiveGuard } from './Core/Guards/login-active.guard';

export const routes: Routes = [
  {
    path: '',
    component: LayoutAuthComponent,
    canActivate: [loginActiveGuard],
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'login',
        loadComponent: () =>
          import('./components/login/login.component').then(
            (m) => m.LoginComponent
          ),
        title: 'login',
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./components/register/register.component').then(
            (m) => m.RegisterComponent
          ),
        title: 'register',
      },
      {
        path: 'forget',
        loadComponent: () =>
          import('./components/forget/forget.component').then(
            (m) => m.ForgetComponent
          ),
        title: 'forget',
      },
    ],
  },
  {
    path: '',
    component: LayoutBlankComponent,
    canActivate: [loginGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        loadComponent: () =>
          import('./components/home/home.component').then(
            (m) => m.HomeComponent
          ),
        title: 'home',
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('./components/cart/cart.component').then(
            (m) => m.CartComponent
          ),
        title: 'cart',
      },
      {
        path: 'Wishlist',
        loadComponent: () =>
          import('./components/wishlist/wishlist.component').then(
            (m) => m.WishlistComponent
          ),
        title: 'cart',
      },
      {
        path: 'brands',
        loadComponent: () =>
          import('./components/brands/brands.component').then(
            (m) => m.BrandsComponent
          ),
        title: 'brands',
      },
      {
        path: 'Categories',
        loadComponent: () =>
          import('./components/categories/categories.component').then(
            (m) => m.CategoriesComponent
          ),
        title: 'Categories',
      },
      {
        path: 'product',
        loadComponent: () =>
          import('./components/product/product.component').then(
            (m) => m.ProductComponent
          ),
        title: 'product',
      },
      {
        path: 'details/:id',
        loadComponent: () =>
          import('./components/details/details.component').then(
            (m) => m.DetailsComponent
          ),
        title: 'details',
      },
      {
        path: 'allorders',
        loadComponent: () =>
          import('./components/allorders/allorders.component').then(
            (m) => m.AllordersComponent
          ),
        title: 'allorders',
      },
      {
        path: 'orders/:id',
        loadComponent: () =>
          import('./components/orders/orders.component').then(
            (m) => m.OrdersComponent
          ),
        title: 'orders',
      },
    ],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./components/not-found/not-found.component').then(
        (m) => m.NotFoundComponent
      ),
  },
];
