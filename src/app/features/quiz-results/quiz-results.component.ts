import { Component } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz-results',
  templateUrl: './quiz-results.component.html',
  styleUrls: ['./quiz-results.component.scss'],
})
export class QuizResultsComponent {
  constructor(private router: Router) {}

  createNewQuiz() {
    this.router.navigate(['./quiz-maker']);
  }
}
