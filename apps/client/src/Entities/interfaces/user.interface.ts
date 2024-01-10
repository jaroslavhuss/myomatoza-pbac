export interface IUser {
    _id: string;
    name: string;
    email: string;
    password: string;
    authLevel: string;
    lastLoggedIn: Date;
    refresh_token: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
    startDateOfEmployment: Date;
    currentPositionHeldSince: Date;
    gdprConsent: boolean;
    gdprConsentDate: Date;
    isUserApproved: boolean;
    country: string;
}