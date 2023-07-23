import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { DataShareService } from '../../core/data-share.service';
import {
  IRelatedQuestion,
  IRelatedQuestionOption,
} from '../quiz-maker/related-question.interface';

@Component({
  selector: 'app-quiz-results',
  templateUrl: './quiz-results.component.html',
  styleUrls: ['./quiz-results.component.scss'],
})
export class QuizResultsComponent {
  constructor(
    private router: Router,
    private dataShareService: DataShareService
  ) {}

  totalScore = 0;
  relatedQuestions: IRelatedQuestion[] = [];

  ngOnInit() {
    this.relatedQuestions = this.dataShareService.getDataFromMemory();
    this.calculateTotalScore();
  }

  onCreateNewQuiz() {
    this.dataShareService.clearDataFromMemory();
    this.router.navigate(['./quiz-maker']);
  }

  getQuestionButtonClass(option: IRelatedQuestionOption) {
    if (option.isCorrect) {
      return 'correct-option';
    } else if (!option.isCorrect && option.isSelected) {
      return 'incorrect-selected-option';
    } else {
      return null;
    }
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

  private calculateTotalScore() {
    this.totalScore = this.relatedQuestions.reduce((score, question) => {
      const isQuestionCorrect = question.options.some(
        (option) => option.isSelected && option.isCorrect
      );
      return score + (isQuestionCorrect ? 1 : 0);
    }, 0);
  }
}
