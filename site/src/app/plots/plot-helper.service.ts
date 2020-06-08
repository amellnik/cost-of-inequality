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
    return this.percentFormat.format(1 - p);
  }

}

export interface PlotObj {
  layout: Partial<Layout>;
  data: Data[];
  config: Partial<Config>;
}
