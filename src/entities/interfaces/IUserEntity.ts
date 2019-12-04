export interface IUserEntity {
    firstName?: string;
    lastName?: string;
    salt?: string;
    hash?: string;
    email?: string;
    hiredDate?: Date;
}
