import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { QuizMakerService } from './quiz-maker.service';
import { Observable, map } from 'rxjs';

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
  quizData$!: Observable<any>;

  constructor(
    private router: Router,
    private quizMakerService: QuizMakerService
  ) {}

  ngOnInit() {
    this.categories$ = this.quizMakerService.getAllCategories$();
  }

  submitQuiz(data: any) {
    this.quizMakerService.saveQuizDataInCache(data);
    this.router.navigate(['./quiz-results']);
  }

  createQuiz() {
    this.quizData$ = this.quizMakerService
      .getAllQuizData$({
        amount: 5,
        category: this.categoryControl.value,
        difficulty: this.difficultyControl.value,
      })
      .pipe(
        map((data) => {
          return data.map((d) => {
            return {
              question: d.question,
              type: d.type,
              options: this.shuffleArray([
                {
                  text: d.correct_answer,
                  isCorrect: true,
                  isSelected: false,
                },
                ...d.incorrect_answers.map((i) => ({
                  text: i,
                  isCorrect: false,
                  isSelected: false,
                })),
              ]),
            };
          });
        })
      );
  }

  // Custom shuffle function using Fisher-Yates (Knuth) algorithm
  shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  onSelect(quiz: any, selectedOption: any) {
    quiz.options.forEach(
      (option: any) => (option.isSelected = option === selectedOption)
    );
  }

  isVisible(quiz: any) {
    return quiz.every((q: any) =>
      q.options.some((option: any) => option.isSelected)
    );
  }
}
