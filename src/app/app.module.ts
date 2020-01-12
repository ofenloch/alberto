import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here

import { AppComponent } from './app.component';
import { InputComponent } from './input/input.component';
import { MessagesComponent } from './messages/messages.component';
import { WorkbookComponent } from './workbook/workbook.component';

@NgModule({
  declarations: [
    AppComponent,
    InputComponent,
    MessagesComponent,
    WorkbookComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
