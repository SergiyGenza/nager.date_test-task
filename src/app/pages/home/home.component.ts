import { Component, inject, OnInit } from '@angular/core';
import { NagerDateService } from '../../common/services/nager-date.service';
import { Country } from '../../common/models/country.model';
import { Observable } from 'rxjs';
import { InputComponent } from '../../common/components/input/input.component';
import { CountryListComponent } from '../../common/components/country-list/country-list.component';
import { RandomCountryWidgetComponent } from '../../features/widgets/random-country-widget/random-country-widget.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [InputComponent, CountryListComponent, RandomCountryWidgetComponent],
  providers: [NagerDateService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  nagerDateService = inject(NagerDateService);

  searchCountry!: string;
  countryList!: Observable<Country[]>;

  constructor() { }

  ngOnInit(): void {
    this.countryList = this.nagerDateService.getAllCountries();
  }

  public checkValue(value: string): void {
    this.searchCountry = value;
  }

}
