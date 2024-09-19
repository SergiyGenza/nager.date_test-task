import { Component, inject, OnInit } from '@angular/core';
import { Country, Holiday } from '../../../common/models/country.model';
import { catchError, forkJoin, map, Observable, of, switchMap } from 'rxjs';
import { NagerDateService } from '../../../common/services/nager-date.service';
import { AsyncPipe } from '@angular/common';
import { HolidaysListComponent } from './holidays-list/holidays-list.component';
import { MatTabsModule } from '@angular/material/tabs';
import { CountryNameComponent } from '../../../shared/country-name/country-name.component';


@Component({
  selector: 'app-random-country-widget',
  standalone: true,
  imports: [AsyncPipe, HolidaysListComponent, MatTabsModule, CountryNameComponent],
  providers: [NagerDateService],
  templateUrl: './random-country-widget.component.html',
  styleUrl: './random-country-widget.component.scss',
})
export class RandomCountryWidgetComponent implements OnInit {
  nagerDateService = inject(NagerDateService);
  countriesInfoList$!: Observable<{ country: Country, holidays: Holiday[] }[]>;
  error: string | null = null;

  ngOnInit(): void {
    this.loadRandomCountriesWithHolidays(3);
    this.countriesInfoList$.subscribe(s => console.log(s)
    );
  }

  private loadRandomCountriesWithHolidays(numberOfCountries: number): void {
    let countries$ = this.nagerDateService.getRandomCountries(numberOfCountries).pipe(
      catchError(error => {
        this.error = 'Failed to load countries';
        return of([]);
      })
    );

    this.countriesInfoList$ = countries$.pipe(
      switchMap((countries: Country[]) => {
        const holidayRequests = countries.map(country =>
          this.nagerDateService.getNextPublicHolidays(country.countryCode).pipe(
            catchError(error => {
              this.error = 'Failed to load holidays for ' + country.name;
              return of([]);
            })
          )
        );
        return forkJoin(holidayRequests).pipe(
          map(holidays => countries.map((country, index) => ({
            country,
            holidays: holidays[index] as any[]
          })))
        );
      }),
      catchError(error => {
        this.error = 'Failed to load holidays';
        return of([]);
      })
    );
  }
}
