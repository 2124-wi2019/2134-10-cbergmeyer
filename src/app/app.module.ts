import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { EmployeeDetailDialog } from './app.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpClientModule, MatDialogModule, BrowserAnimationsModule],
  declarations: [ AppComponent, EmployeeDetailDialog],
  entryComponents: [AppComponent, EmployeeDetailDialog],
  bootstrap:    [ AppComponent]
})
export class AppModule { }
