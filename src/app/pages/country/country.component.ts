import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, map, Observable, switchMap } from 'rxjs';
import { NagerDateService } from '../../common/services/nager-date.service';
import { AsyncPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-country',
  standalone: true,
  imports: [AsyncPipe, MatButtonModule],
  providers: [NagerDateService],
  templateUrl: './country.component.html',
  styleUrl: './country.component.scss'
})
export class CountryComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private nagerDateService = inject(NagerDateService);
  private currentYear: number;

  year$ = new BehaviorSubject<number>(new Date().getFullYear());
  holidays!: Observable<any>;

  constructor() {
    this.currentYear = this.year$.getValue();
  }

  ngOnInit(): void {
    this.setHolidays();
    this.holidays.subscribe((s) => console.log(s)
    )
  }

  public incrementYear(): void {
    if (this.currentYear < 2030) {
      this.currentYear++;
      this.year$.next(this.currentYear);
      this.setHolidays();
    }
  }

  public decrementYear(): void {
    if (this.currentYear > 2020) {
      this.currentYear--;
      this.year$.next(this.currentYear);
      this.setHolidays();
    }
  }

  private setHolidays() {
    this.holidays = this.route.paramMap.pipe(
      switchMap(params => {
        return this.nagerDateService.getPublicHolidaysByYear(this.currentYear, params.get('id')!);
      })
    );

  }


}
