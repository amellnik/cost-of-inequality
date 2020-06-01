import { Component, OnInit } from '@angular/core';
import { DataService } from './data/data.service';
import { PlotHelperService, PlotObj } from './plots/plot-helper.service';
import { Data } from 'plotly.js';


import { DataRow } from './data/types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  income: number;
  distribution: PlotObj = {
    data: [],
    layout: {},
    config: {}
  };

  constructor(
    private dataService: DataService,
    private plotHelper: PlotHelperService
  ) { }

  ngOnInit() {
    this.dataService.ready.subscribe(ready => ready && this.drawDistribution());
  }

  drawDistribution() {
    const year = this.dataService.incomeYear(2014);
    const data: Data[] = [{
      type: 'scatter',
      x: year.map(r => r.start),
      y: year.map(r => r.value),
      mode: 'lines'
    }];
    if (this.income) {
      data.push({
        type: 'scatter',
        x: [],
        y: [],
        mode: 'markers'
      });
    }
    const layout = {
      ...this.plotHelper.defaultLayout,
      yaxis: {
        range: [1, 1000000]
      }
    };
    this.distribution = {
      data,
      layout,
      config: this.plotHelper.config
    };
  }
}
