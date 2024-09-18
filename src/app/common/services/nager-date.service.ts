import { Injectable } from '@angular/core';
import { env } from '../../enviroments/enviroments';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Country } from '../models/country.model';

@Injectable({
  providedIn: 'root'
})
export class NagerDateService {
  url = env;

  constructor(private http: HttpClient) { }

  public getAllCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(this.url.availableCountries);
  }
  
  public getNextPublicHolidays(country: string) {
    return this.http.get(this.url.nextPublicHolidays + country);
  }

  public getRandomCountries(number: number): Observable<Country[]> {
    return this.http.get<Country[]>(this.url.availableCountries).pipe(
      map((countries: Country[]) => {
        const shuffled = countries.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, number);
      })
    );
  }

}
