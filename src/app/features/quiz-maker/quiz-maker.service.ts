import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuizMakerService {
  private categoriesUrl = `https://opentdb.com/api_category.php`;
  private quizDataUrl = `https://opentdb.com/api.php`;

  constructor(private http: HttpClient) {}

  getAllCategories$(): Observable<any> {
    return this.http
      .get<ICategory>(this.categoriesUrl)
      .pipe(map((data) => data.trivia_categories || []));
  }

  getAllQuizData$(queryParams: any): Observable<any> {
    return this.http
      .get<IQuizData>(this.quizDataUrl, { params: queryParams })
      .pipe(map((data) => data.results || []));
  }
}

interface ICategory {
  trivia_categories: { id: string; name: string }[];
}

interface IQuizData {
  response_code: number;
  results: {
    category: string;
    correctAnswer: string;
    difficulty: 'easy' | 'medium' | 'hard';
    incorrectAnswers: string[];
    question: string;
    type: string;
  }[];
}
