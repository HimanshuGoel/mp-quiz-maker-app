import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizMakerComponent } from './features/quiz-maker/quiz-maker.component';
import { QuizResultsComponent } from './features/quiz-results/quiz-results.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'quiz-maker',
    pathMatch: 'full',
  },
  {
    path: 'quiz-maker',
    title: 'Quiz Maker Page',
    component: QuizMakerComponent,
  },
  {
    path: 'quiz-results',
    title: 'Quiz Results Page',
    component: QuizResultsComponent,
  },
  {
    path: '**',
    redirectTo: 'quiz-maker',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
