import crypto from "crypto";
import { Request } from "express";
import { IUserEntity } from "../entities/interfaces/IUserEntity";
import {IMapRequestToEntity} from "./interfaces/IMapRequestToEntity";


export class UserMapper implements IMapRequestToEntity<Request, IUserEntity> {
    private readonly userEntity: IUserEntity;
    constructor(userEntity: IUserEntity) {
        this.userEntity = userEntity;
    }
    public mapRequestToEntity(req: Request): IUserEntity {
        this.setFirstName(req.body.firstName);
        this.setLastName(req.body.lastName);
        this.setEmail(req.body.email);
        this.setHash(req.body.password);
        this.setHiredDate(req.body.hiredDate);
        return this.userEntity;
    }
    private setHiredDate(date: string): void {
        if (date) {
            this.userEntity.hiredDate = new Date(date);
        }
    }
    private setEmail(email: string): void {
        if (email) {
            this.userEntity.email = email;
        }
    }
    private setLastName(lastName: string): void {
        if (lastName) {
            this.userEntity.lastName = lastName;
        }
    }
    private setFirstName(firstName: string): void {
        if (firstName) {
            this.userEntity.firstName = firstName;
        }
    }
    private setSalt() {
        this.userEntity.salt = crypto
            .randomBytes(16)
            .toString("hex");
    }
    private setHash(password: string): void {
        if (password) {
            this.setSalt();
            if (this.userEntity.salt && password) {
                this.userEntity.hash = crypto
                    .pbkdf2Sync(password, this.userEntity.salt, 1000, 512, "sha512")
                    .toString("hex");
            }
        }
    }
}
