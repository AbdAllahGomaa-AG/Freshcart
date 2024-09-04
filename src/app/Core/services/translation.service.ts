import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private readonly _TranslationService = inject(TranslateService);

  constructor() {
    let saveLang = localStorage.getItem('lang');
    this._TranslationService.setDefaultLang('en');
    this._TranslationService.use(saveLang!);
    this.changeDirection()
  }

  changeDirection() {
    let saveLang = localStorage.getItem('lang');

    if (saveLang === 'en') {
      document.documentElement.dir = 'ltr';
    }else if (saveLang === 'ar') {
      document.documentElement.dir = 'rtl';
    }
  }
}
