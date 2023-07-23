import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, map } from 'rxjs';
import { IOption } from '../../common/option.interface';

@Injectable({
  providedIn: 'root',
})
export class QuizMakerService {
  private quizUrl = 'https://opentdb.com';

  constructor(private http: HttpClient) {}

  getAllCategories$(): Observable<IOption[]> {
    return this.http
      .get<ICategoryData>(`${this.quizUrl}/api_category.php`)
      .pipe(map((data) => data.trivia_categories || []));
  }

  getAllQuestions$(
    category: string,
    difficulty: difficulty,
    amount = 5
  ): Observable<IQuestion[]> {
    const params = new HttpParams({
      fromObject: { category, difficulty, amount },
    });
    return this.http
      .get<IQuestionData>(`${this.quizUrl}/api.php`, { params })
      .pipe(map((data) => data.results || []));
  }
}

interface ICategoryData {
  trivia_categories: { id: string; name: string }[];
}

interface IQuestionData {
  response_code: number;
  results: IQuestion[];
}

export interface IQuestion {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export type difficulty = 'easy' | 'medium' | 'hard';
