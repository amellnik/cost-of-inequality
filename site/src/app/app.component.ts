import { Component, OnInit } from '@angular/core';
import { DataService } from './data/data.service';
import { DataRow } from './data/types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  income: number;

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.dataService.ready.subscribe(ready => ready && this.drawGraph());
  }

  drawGraph() {

  }
}
