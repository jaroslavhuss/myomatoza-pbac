import { IMyomatosys } from "../interfaces/myomatosys.interface";
import { emptyUser } from "./user.empty";
export const emptyMyomatosys: IMyomatosys = {

    pacientName: '',
    pacientSSN: '',
    questionnaireDate: "",
    supervisorDoctor: emptyUser,
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