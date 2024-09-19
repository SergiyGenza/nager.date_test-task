import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from '../../models/country.model';
import { CountryNameComponent } from '../../../shared/country-name/country-name.component';
import { SearchPipe } from '../../pipes/search.pipe';
import { CardComponent } from '../../../shared/card/card.component';

@Component({
  selector: 'app-country-list',
  standalone: true,
  imports: [AsyncPipe, CountryNameComponent, SearchPipe, CardComponent],
  templateUrl: './country-list.component.html',
  styleUrl: './country-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CountryListComponent {
  @Input() countryList!: Observable<Country[]>;
  @Input() searchItem: string | undefined;
}
