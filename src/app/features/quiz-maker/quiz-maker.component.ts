import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable, catchError, map, of } from 'rxjs';

import { IQuestion, QuizMakerService } from './quiz-maker.service';
import { IOption } from '../../common/option.interface';
import {
  IRelatedQuestion,
  IRelatedQuestionOption,
} from './related-question.interface';
import { UtilityService } from '../../core/utility.service';
import { DataShareService } from '../../core/data-share.service';

@Component({
  selector: 'app-quiz-maker',
  templateUrl: './quiz-maker.component.html',
  styleUrls: ['./quiz-maker.component.scss'],
})
export class QuizMakerComponent implements OnInit {
  categoryControl = new FormControl<string>('', {
    validators: Validators.required,
    nonNullable: true,
  });
  difficultyControl = new FormControl<'easy' | 'medium' | 'hard'>('easy', {
    validators: Validators.required,
    nonNullable: true,
  });

  difficultyOptions: IOption[] = [];

  categoryOptions$: Observable<IOption[]> = of([]);
  relatedQuestions$: Observable<IRelatedQuestion[]> = of([]);

  constructor(
    private router: Router,
    private quizMakerService: QuizMakerService,
    private dataShareService: DataShareService
  ) {}

  ngOnInit() {
    this.difficultyOptions = this.getDifficultyOptions();
    this.categoryOptions$ = this.quizMakerService.getAllCategories$().pipe(
      catchError((error) => {
        console.error('Failed to fetch category options:', error);
        return [];
      })
    );
  }

  onSubmit(relatedQuestions: IRelatedQuestion[]) {
    this.dataShareService.saveDataInMemory(relatedQuestions);
    this.router.navigate(['./quiz-results']);
  }

  onCreate() {
    this.relatedQuestions$ = this.quizMakerService
      .getAllQuestions$(
        this.categoryControl.value,
        this.difficultyControl.value
      )
      .pipe(
        map((data) => this.mapToRelatedQuestions(data)),
        catchError((error) => {
          console.error('Failed to fetch related questions for quiz:', error);
          return [];
        })
      );
  }

  onSelect(
    relatedQuestion: IRelatedQuestion,
    selectedOption: IRelatedQuestionOption
  ) {
    relatedQuestion.options.forEach(
      (option) => (option.isSelected = option === selectedOption)
    );
  }

  isVisible(relatedQuestions: IRelatedQuestion[]) {
    if (relatedQuestions.length === 0) {
      return false;
    }

    return relatedQuestions.every((relatedQuestion) =>
      relatedQuestion.options.some((option) => option.isSelected)
    );
  }

  private mapToRelatedQuestions(data: IQuestion[]): IRelatedQuestion[] {
    return data.map((d) => ({
      question: d.question,
      options: UtilityService.shuffleArray([
        { text: d.correct_answer, isCorrect: true, isSelected: false },
        ...d.incorrect_answers.map((i) => ({
          text: i,
          isCorrect: false,
          isSelected: false,
        })),
      ]),
    }));
  }

  private getDifficultyOptions() {
    return [
      { id: 'easy', name: 'Easy' },
      { id: 'medium', name: 'Medium' },
      { id: 'hard', name: 'Hard' },
    ];
  }
}
