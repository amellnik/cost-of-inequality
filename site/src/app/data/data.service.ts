import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { DataRow } from './types';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  income: Array<DataRow> = [];
  ready: Subject<boolean> = new Subject();

  constructor(
    private http: HttpClient
  ) {
    this.http.get<Array<DataRow>>('assets/fourTiersIncome.json')
      .subscribe(
        data => this.income = data,
        error => console.log(error),
        () => this.ready.next(true)
      );
  }

  incomeYear(year: number) {
    return this.income.filter(r => r.year === year)
      .map(r => {
        r.value = Math.max(r.value, 1);
        return r;
      });
  }

}
