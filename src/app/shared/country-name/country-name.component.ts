import { Component, Input } from '@angular/core';
import { Country } from '../../common/models/country.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-country-name',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './country-name.component.html',
  styleUrl: './country-name.component.scss'
})
export class CountryNameComponent {
  @Input() country!: Country;
}
