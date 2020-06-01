import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PlotlyViaWindowModule } from 'angular-plotly.js';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ClarityModule,
    BrowserAnimationsModule,
    PlotlyViaWindowModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
