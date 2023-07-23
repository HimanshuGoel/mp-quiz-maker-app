export interface IRelatedQuestion {
  question: string;
  options: IRelatedQuestionOption[];
}

export interface IRelatedQuestionOption {
  text: string;
  isCorrect: boolean;
  isSelected: boolean;
}
