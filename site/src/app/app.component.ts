import { Component, OnInit } from '@angular/core';
import Debounce from 'debounce-decorator';

import { DataService } from './data/data.service';
import { PlotHelperService, PlotObj } from './plots/plot-helper.service';
import { Data, Layout } from 'plotly.js';


import { DataRow } from './data/types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  income: number;
  percentileIndex: number;
  currentYear: DataRow[];
  distribution: PlotObj = {
    data: [],
    layout: {},
    config: {}
  };
  logPlot = false;
  step = 0;
  // Steps are:
  // 0: Initial page load, just income
  // 1: Show plot, log scale button
  // 2: Log switch has been triggered at least once, show further text

  constructor(
    private dataService: DataService,
    private plotHelper: PlotHelperService
  ) { }

  ngOnInit() {
    this.dataService.ready.subscribe(ready => ready && this.drawDistribution());
  }

  @Debounce()
  newIncome() {
    this.step = Math.max(this.step, 1);
    // Bisect to find the first row where start <= income
    this.percentileIndex = this.bisect(this.currentYear, 0, this.currentYear.length - 1);
    console.log(this.currentYear);
    this.drawDistribution();
  }

  formattedPercentile() {
    return this.plotHelper.percentileAxisFormatter(1 - this.currentYear[this.percentileIndex].start);
  }

  logToggled() {
    this.step = Math.max(this.step, 2);
    this.drawDistribution();
  }

  drawDistribution() {
    if (!this.currentYear) {
      this.currentYear = this.dataService.incomeYear(2014);
    }
    const data: Data[] = [{
      type: 'scatter',
      x: this.currentYear.map(r => 1 - r.start),
      y: this.currentYear.map(r => r.value),
      mode: 'lines',
      showlegend: false
    }];
    if (this.income) {
      data.push({
        type: 'scatter',
        x: [1 - this.currentYear[this.percentileIndex].start],
        y: [this.income],
        text: ['You'],
        mode: 'text+markers',
        textposition: 'top left',
        showlegend: false
      });
    }
    const ticks = this.logPlot ? this.plotHelper.logAxis() : this.plotHelper.linearAxis();
    const layout: Partial<Layout> = {
      ...this.plotHelper.defaultLayout,
      xaxis: {
        ...ticks,
        type: this.logPlot ? 'log' : undefined,
        autorange: 'reversed',
        title: 'Top percentile of post-tax income'
      },
      yaxis: {
        range: this.logPlot ? undefined : [1, 30000000],
        type: this.logPlot ? 'log' : undefined,
        title: 'Post-tax disposable income ($)'
      }
    };
    this.distribution = {
      data,
      layout,
      config: this.plotHelper.config
    };
    console.log(this.distribution);
  }

  private bisect(arr: DataRow[], left: number, right: number) {
    const mid = Math.floor((right + left) / 2);
    if (mid === left) {
      return mid;
    }
    return this.income > arr[mid].value ?
      this.bisect(arr, mid, right) : this.bisect(arr, left, mid);
  }
}
