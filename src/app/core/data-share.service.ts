import { Injectable } from '@angular/core';

import { IRelatedQuestion } from '../features/quiz-maker/related-question.interface';

@Injectable({
  providedIn: 'root',
})
export class DataShareService {
  private data: IRelatedQuestion[] = [];

  saveDataInMemory(relatedQuestions: IRelatedQuestion[]) {
    this.data = relatedQuestions;
  }

  getDataFromMemory() {
    return this.data;
  }

  clearDataFromMemory() {
    this.data = [];
  }
}
