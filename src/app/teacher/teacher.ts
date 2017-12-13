import { User } from '../user/user';

export interface Teacher extends User {
    firstName: string;
    lastName: string;
    birthday: string;
    address: string;
    gender: string;
    uid?: string;
}
