import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz-maker',
  templateUrl: './quiz-maker.component.html',
  styleUrls: ['./quiz-maker.component.scss'],
})
export class QuizMakerComponent {
  categoryControl = new FormControl('', Validators.required);
  difficultyControl = new FormControl('', Validators.required);

  difficulties = ['Easy', 'Medium', 'Hard'];
  categories = ['Category 1', 'Category 2', 'Category 3'];

  constructor(private router: Router) {}

  submitQuiz() {
    this.router.navigate(['./quiz-results']);
  }
}
