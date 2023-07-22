import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuizMakerComponent } from './features/quiz-maker/quiz-maker.component';
import { QuizResultsComponent } from './features/quiz-results/quiz-results.component';

@NgModule({
  declarations: [
    AppComponent,
    QuizMakerComponent,
    QuizResultsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
