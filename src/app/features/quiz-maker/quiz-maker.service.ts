import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuizMakerService {
  private categoriesUrl = `https://opentdb.com/api_category.php`;
  private quizDataUrl = `https://opentdb.com/api.php`;

  quizData: any[] = [];

  constructor(private http: HttpClient) {}

  getAllCategories$(): Observable<{ id: string; name: string }[]> {
    return this.http
      .get<ICategory>(this.categoriesUrl)
      .pipe(map((data) => data.trivia_categories || []));
  }

  getAllQuizData$(queryParams: any): Observable<
    {
      category: string;
      correct_answer: string;
      difficulty: 'easy' | 'medium' | 'hard';
      incorrect_answers: string[];
      question: string;
      type: string;
    }[]
  > {
    return this.http
      .get<IQuizData>(this.quizDataUrl, { params: queryParams })
      .pipe(map((data) => data.results || []));
  }

  saveQuizDataInCache(data: any) {
    this.quizData = data;
  }

  getQuizDataFromCache() {
    return this.quizData;
  }
}

interface ICategory {
  trivia_categories: { id: string; name: string }[];
}

interface IQuizData {
  response_code: number;
  results: {
    category: string;
    correct_answer: string;
    difficulty: 'easy' | 'medium' | 'hard';
    incorrect_answers: string[];
    question: string;
    type: string;
  }[];
}
