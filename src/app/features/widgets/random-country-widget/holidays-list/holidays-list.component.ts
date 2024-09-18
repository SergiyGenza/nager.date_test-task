import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Holiday } from '../../../../common/models/country.model';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-holidays-list',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './holidays-list.component.html',
  styleUrl: './holidays-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HolidaysListComponent {
  @Input()
  holidays!: Holiday[];
  displayedColumns: string[] = ['name', 'localName', 'date']
}
