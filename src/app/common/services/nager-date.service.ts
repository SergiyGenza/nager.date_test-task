import { Injectable } from '@angular/core';
import { env } from '../../enviroments/enviroments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NagerDateService {
  url = env;

  constructor(private http: HttpClient) { }

  public getAllCountries(): Observable<any> {
    return this.http.get(this.url.availableCountries);
  }

}
