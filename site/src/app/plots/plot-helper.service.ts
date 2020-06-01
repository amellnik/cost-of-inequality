import { Injectable } from '@angular/core';
import { Layout, Data, Config } from 'plotly.js';

import { DataRow } from './data/types';

@Injectable({
  providedIn: 'root'
})
export class PlotHelperService {

  percentFormat = new Intl.NumberFormat('en-US', { style: 'percent' });

  config = {
    responsive: true
  };

  defaultLayout = {
    autosize: true,
    plot_bgcolor: '#FAFAFA',
    paper_bgcolor: '#FAFAFA'
  };

  constructor() { }

  percentileAxisFormatter(p: number) {
    return this.percentFormat.format(1 - p);
  }

  findPercentile(income: number, year: DataRow[], accessor) {

  }
}

export interface PlotObj {
  layout: Partial<Layout>;
  data: Data[];
  config: Partial<Config>;
}
