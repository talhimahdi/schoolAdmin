import { User } from '../user/user';

export interface Student extends User {
    firstName: string;
    lastName: string;
    birthday: string;
    address: string;
    gender: string;
    classeId: string;
    classeDisplayName?: string;
    uid?: string;
}
