export interface IPatient {
  _id: string;
  name: string;
  surname: string;
  privateId: string;
  email: string;
  fulltext: string;
  questionnairesDoneByPatient?: any[];
  createdAt?: Date;
  supervisingDoctor: string;
}
