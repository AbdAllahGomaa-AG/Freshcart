import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../Core/services/order.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent implements OnInit {
  //
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _OrderService = inject(OrderService);
  //
  isLading: boolean = false;
  cardId: string | null = '';
  ngOnInit() {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.cardId = params.get('id');
        console.log(this.cardId);
      },
    });
  }
  orders: FormGroup = new FormGroup({
    details: new FormControl(null, Validators.required),
    phone: new FormControl(null, Validators.required),
    city: new FormControl(null, Validators.required),
  });

  ordersSubmit(): void {
    this.isLading = true;
    console.log(this.orders.value);
    this._OrderService.checkOut(this.cardId, this.orders.value).subscribe({
      next: (res) => {
        this.isLading = false;

        console.log(res);
        if (res.status == 'success') {
          window.open(res.session.url ,'_self');
        }
      },
      error: (err) => {
        console.log(err);
        this.isLading = false;
      },
    });
  }
}
