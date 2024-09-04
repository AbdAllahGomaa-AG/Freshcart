import { Component, inject, OnInit } from '@angular/core';
import { CategoryService } from '../../Core/services/category.service';
import { ICategory } from '../../Core/interface/icategory';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements OnInit {
  private readonly _CategoryService = inject(CategoryService);
  private readonly _NgxSpinnerService = inject(NgxSpinnerService);

  Category: ICategory[] = [];
  getAllProducts!: Subscription;

  ngOnInit() {
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
}
