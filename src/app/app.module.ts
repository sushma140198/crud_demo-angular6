import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ModalModule } from "ngx-bootstrap";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateTableComponent } from './create-table/create-table.component';
import { TabeService } from './tabe.service';
import { DatePipe } from '@angular/common';
import { CustomFormsModule } from 'ng2-validation';
import { FilterPipe } from './shared/_pipe/filter-pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter'; //importing the module

@NgModule({
  declarations: [
    AppComponent,
    CreateTableComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    CustomFormsModule,
    AppRoutingModule,
    ModalModule.forRoot(),
    ReactiveFormsModule, FormsModule,
    Ng2SearchPipeModule 
  ],
  providers: [TabeService, DatePipe],
  bootstrap: [AppComponent],
  exports: [
    ModalModule
  ]
})
export class AppModule { }
