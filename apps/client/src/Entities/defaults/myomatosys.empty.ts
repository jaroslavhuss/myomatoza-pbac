import { IMyomatosys } from "../interfaces/myomatosys.interface";
const date = new Date();
const day = date.getDate();
const month = date.getMonth() + 1;
const year = date.getFullYear();
const dateString = `${day}.${month}.${year}`;

export const emptyMyomatosys: IMyomatosys = {

    pacientName: '',
    pacientSSN: '',
    questionnaireDate: dateString,
    supervisorDoctor: "",
    __01Question: 1,
    __02Question: 1,
    __03Question: 1,
    __04Question: 1,
    __05Question: 1,
    __06Question: 1,
    __07Question: 1,
    __08Question: 1,
    __09Question: 1,
    __10Question: 1,
    sumValue: 10,
    _v: 0,
}