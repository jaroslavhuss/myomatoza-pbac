import { IQuestionnaire } from "./questionnaireDocument.interface";

export interface IQuestionsDoneByPatient {
  _id?: string;
  name: string;
  description: string;
  maxrange: number;
  questions: {
    question: string;
    answer: number;
  }[];
  supervisingDoctor: string;
}

export interface IPatient {
  _id: string;
  name: string;
  surname: string;
  privateId: string;
  email: string;
  fulltext: string;
  questionnairesDoneByPatient?: IQuestionsDoneByPatient[];
  assignedQuestionnaires?: IQuestionnaire[];
  createdAt?: Date;
  supervisingDoctor: string;
}
