import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TodolistComponent } from './todolist/todolist.component';
import { CRUDService } from './services/crud.service'

@NgModule({
  declarations: [
    AppComponent,
    TodolistComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [CRUDService],
  bootstrap: [AppComponent]
})
export class AppModule { }
