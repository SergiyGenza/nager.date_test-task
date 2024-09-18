import { Pipe, PipeTransform } from '@angular/core';
import { Country } from '../models/country.model';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(list: Country[] | undefined | null, searchItem: string | undefined): Country[] | undefined | null {
    if (!list || !searchItem) return list;

    const searchTerm = searchItem.toLowerCase();

    return list.filter(item => {
      return item.name!.toLowerCase().includes(searchTerm) ||
        item.name === searchItem;
    });
  }

}
