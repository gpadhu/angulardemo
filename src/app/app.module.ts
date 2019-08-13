import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MainSearchComponent } from './main-search/main-search.component';
import { TranscriptsListComponent } from './main-search/transcripts-list/transcripts-list.component';
import { TranscriptItemComponent } from './main-search/transcripts-list/transcript-item/transcript-item.component';
import { UserInputsComponent } from './main-search/user-inputs/user-inputs.component';

@NgModule({
  declarations: [
    AppComponent,
    MainSearchComponent,
    TranscriptsListComponent,
    TranscriptItemComponent,
    UserInputsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
