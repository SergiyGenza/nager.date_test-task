import { Injectable } from '@angular/core';
import { env } from '../../enviroments/enviroments';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Country, Holiday } from '../models/country.model';

const url = env

@Injectable({
  providedIn: 'root'
})
export class NagerDateService {

  constructor(private http: HttpClient) { }

  public getAllCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(url.availableCountries);
  }

  public getPublicHolidaysByYear(year: number, code: string) {
    return this.http.get<Holiday[]>(url.publicHolidays + year + '/' + code);
  }

  public getNextPublicHolidays(country: string) {
    return this.http.get(url.nextPublicHolidays + country);
  }

  public getRandomCountries(number: number): Observable<Country[]> {
    return this.http.get<Country[]>(url.availableCountries).pipe(
      map((countries: Country[]) => {
        const shuffled = countries.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, number);
      })
    );
  }

}
