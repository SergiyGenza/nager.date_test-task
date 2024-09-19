import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { NagerDateService } from '../../common/services/nager-date.service';
import { AsyncPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { CardComponent } from '../../shared/card/card.component';
import { Holiday } from '../../common/models/country.model';

@Component({
  selector: 'app-country',
  standalone: true,
  imports: [AsyncPipe, MatButtonModule, CardComponent],
  providers: [NagerDateService],
  templateUrl: './country.component.html',
  styleUrl: './country.component.scss',
})
export class CountryComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private nagerDateService = inject(NagerDateService);
  year$ = new BehaviorSubject<number>(new Date().getFullYear());
  holidays$!: Observable<Holiday[]>;

  years = Array.from({ length: 11 }, (_, i) => 2020 + i);

  ngOnInit(): void {
    this.holidays$ = this.year$.pipe(
      switchMap(year => {
        const id = this.route.snapshot.paramMap.get('id')!;
        return this.nagerDateService.getPublicHolidaysByYear(year, id);
      })
    );
  }

  public setYear(year: number): void {
    this.year$.next(year);
  }

}
