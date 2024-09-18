import { Component, inject, OnInit } from '@angular/core';
import { NagerDateService } from '../../common/services/nager-date.service';
import { Country } from '../../common/models/country.model';
import { Observable } from 'rxjs';
import { InputComponent } from '../../common/components/input/input.component';
import { CountryListComponent } from '../../common/components/country-list/country-list.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [InputComponent, CountryListComponent],
  providers: [NagerDateService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  searchCountry!: string;
  countryList!: Observable<Country[]>;
  nagerDateService = inject(NagerDateService);

  constructor() {
  }

  ngOnInit(): void {
    this.countryList = this.nagerDateService.getAllCountries();
  }

  checkValue(value: string): void {
    this.searchCountry = value;
  }

}
