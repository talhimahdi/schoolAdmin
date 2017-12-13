import { Teacher } from '../teacher/teacher';
import { Subject } from '../subject/subject';
import { Classe } from '../classe/classe';

export interface Assignement {
    id?: string;
    classe: Classe;
    subject: Subject;
    teacher: Teacher;
}
