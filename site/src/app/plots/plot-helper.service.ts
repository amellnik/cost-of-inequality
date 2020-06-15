import { Injectable } from '@angular/core';
import { Layout, Data, Config } from 'plotly.js';

import { DataRow } from '../data/types';

@Injectable({
  providedIn: 'root'
})
export class PlotHelperService {

  percentFormat = new Intl.NumberFormat('en-US', { style: 'percent', maximumSignificantDigits: 3 });

  config = {
    responsive: true,
  };

  defaultLayout: Partial<Layout> = {
    autosize: true,
    plot_bgcolor: '#FAFAFA',
    paper_bgcolor: '#FAFAFA',
    hovermode: 'closest'
  };

  constructor() { }

  percentileAxisFormatter(p: number) {
    return this.percentFormat.format(p);
  }

  linearAxis() {
    const tickvals = [...Array(9).keys()].map(x => (x + 1) / 10);
    return {
      tickvals,
      ticktext: tickvals.map(x => this.percentileAxisFormatter(x))
    };
  }

  logAxis() {
    const tickvals = [.99, .3, .1, .03, .01, .003, .001, .0003, .0001, .00003, .00001];
    return {
      tickvals,
      ticktext: tickvals.map(x => this.percentileAxisFormatter(x))
    };
  }
}

export interface PlotObj {
  layout: Partial<Layout>;
  data: Data[];
  config: Partial<Config>;
}
