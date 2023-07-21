import { IUser } from "../interfaces/user.interface";

export const emptyUser:IUser = {
    _id: '',
    name: '',
    email: '',
    password: '',
    authLevel: '',
    lastLoggedIn: new Date(),
    refresh_token: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    __v: 0,
    startDateOfEmployment: new Date(),
    currentPositionHeldSince: new Date(),
    gdprConsent: false,
    gdprConsentDate: new Date(),
    isUserApproved: false,
    country: '',
}
