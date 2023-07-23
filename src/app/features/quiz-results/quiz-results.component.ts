import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { QuizMakerService } from '../quiz-maker/quiz-maker.service';

@Component({
  selector: 'app-quiz-results',
  templateUrl: './quiz-results.component.html',
  styleUrls: ['./quiz-results.component.scss'],
})
export class QuizResultsComponent {
  constructor(
    private router: Router,
    private quizMakerService: QuizMakerService
  ) {}

  quizAttemptedData: any;
  totalScore = 0;

  ngOnInit() {
    this.quizAttemptedData = this.quizMakerService.getQuizDataFromCache();

    this.totalScore = 0;
    this.quizAttemptedData.forEach((data: any) => {
      const isRightlySelection = data.options.some(
        (d: any) => d.isSelected === true && d.isCorrect === true
      );
      if (isRightlySelection) {
        this.totalScore += 1;
      }
    });
  }

  createNewQuiz() {
    this.router.navigate(['./quiz-maker']);
  }

  getClassToDisplay() {
    if (this.totalScore === 0 || this.totalScore === 1) {
      return 'low-score';
    } else if (this.totalScore === 2 || this.totalScore === 3) {
      return 'average-score';
    } else {
      return 'high-score';
    }
  }
}
