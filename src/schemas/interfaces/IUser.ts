export interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    hiredDate: Date;
    hash?: string;
    salt?: string;
}
