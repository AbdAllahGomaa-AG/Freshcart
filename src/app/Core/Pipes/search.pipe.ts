import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true,
})
export class SearchPipe implements PipeTransform {
  transform(ArrayProduct: any[], terms: string): any[] {

    return ArrayProduct.filter((items) => items.title.toLowerCase().includes(terms.toLowerCase()));
  }
}
