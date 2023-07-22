import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { QuizMakerService } from './quiz-maker.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-quiz-maker',
  templateUrl: './quiz-maker.component.html',
  styleUrls: ['./quiz-maker.component.scss'],
})
export class QuizMakerComponent {
  categoryControl = new FormControl('', Validators.required);
  difficultyControl = new FormControl('', Validators.required);

  difficulties = [
    { id: 'easy', name: 'Easy' },
    { id: 'medium', name: 'Medium' },
    { id: 'hard', name: 'Hard' },
  ];
  categories$: Observable<{ id: string; name: string }[]> | undefined;
  quizData$: any;

  constructor(
    private router: Router,
    private quizMakerService: QuizMakerService
  ) {}

  ngOnInit() {
    this.categories$ = this.quizMakerService.getAllCategories$();
  }

  submitQuiz() {
    this.router.navigate(['./quiz-results']);
  }

  createQuiz() {
    this.quizData$ = this.quizMakerService.getAllQuizData$({
      amount: 5,
      category: this.categoryControl.value,
      difficulty: this.difficultyControl.value,
    });
  }
}
