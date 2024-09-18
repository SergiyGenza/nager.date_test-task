import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Country, Holiday } from '../../../common/models/country.model';
import { catchError, forkJoin, map, Observable, of, switchMap } from 'rxjs';
import { NagerDateService } from '../../../common/services/nager-date.service';
import { AsyncPipe } from '@angular/common';
import { HolidaysListComponent } from './holidays-list/holidays-list.component';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-random-country-widget',
  standalone: true,
  imports: [AsyncPipe, HolidaysListComponent, MatTabsModule],
  providers: [NagerDateService],
  templateUrl: './random-country-widget.component.html',
  styleUrl: './random-country-widget.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RandomCountryWidgetComponent implements OnInit {
  nagerDateService = inject(NagerDateService);
  // countries$!: Observable<Country[]>;
  countriesInfoList$!: Observable<{ country: Country, holidays: Holiday[] }[]>;
  isLoading = true;
  error: string | null = null;


  ngOnInit(): void {
    this.loadRandomCountriesWithHolidays(3);
    this.countriesInfoList$.subscribe(s => console.log(s)
    );
  }

  loadRandomCountriesWithHolidays(numberOfCountries: number): void {
    let countries$ = this.nagerDateService.getRandomCountries(numberOfCountries).pipe(
      catchError(error => {
        this.error = 'Failed to load countries';
        this.isLoading = false;
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
        this.isLoading = false;
        return of([]);
      })
    );

    this.countriesInfoList$.subscribe(() => this.isLoading = false);
  }
}
