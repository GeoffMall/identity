import { CommonModule } from "@angular/common";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import 'hammerjs';

import { AppComponent } from './app.component';
import { CoreModule } from "./core/core.module";
import { SharedModule } from "./shared/shared.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MaterialModule} from "./material/material.module";


@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    CoreModule,
    SharedModule,
    BrowserAnimationsModule,
    MaterialModule

  ],
  declarations: [ AppComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
