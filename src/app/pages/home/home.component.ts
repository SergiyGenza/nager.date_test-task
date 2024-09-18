import { Component, OnInit } from '@angular/core';
import { NagerDateService } from '../../common/services/nager-date.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  providers: [NagerDateService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  constructor(private nagerDateService: NagerDateService) { }

  ngOnInit(): void {
    // this.nagerDateService.getData().subscribe(s => console.log(s))
  }

}
