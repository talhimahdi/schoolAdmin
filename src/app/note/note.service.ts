import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Note } from './note';
import { Student } from '../student/student';
import { User } from '../user/user';
import { Classe } from '../classe/classe';
import { Exam } from '../exam/exam';
import { Teacher } from '../teacher/teacher';


@Injectable()
export class NoteService {
  notesCollection: AngularFirestoreCollection<Note>;
  noteDocument: AngularFirestoreDocument<Note>;

  note: Note;

  constructor(private afs: AngularFirestore) {
    this.notesCollection = this.afs.collection('notes');
    /*this.assignementsCollection.valueChanges().subscribe(res => {
      console.log(res);
    });*/
  }

  getNotes(): Observable<Note[]> {
    return this.notesCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Note;
        data.id = a.payload.doc.id;
        this.afs.doc<Student>('students/' + data.studentId ).valueChanges().subscribe((std: Student) => {
          this.afs.doc<User>('users/' + std.uid ).valueChanges().subscribe((usr: User) => {
            data.studentName = usr.displayName;
          });
        });
        this.afs.doc<Classe>('classes/' + data.classeId ).valueChanges().subscribe((clss: Classe) => {
          data.classeName = clss.displayName;
        });
        this.afs.doc<Exam>('exams/' + data.examId ).valueChanges().subscribe((exm: Exam) => {
          data.examName = exm.examTitle;
        });
        this.afs.doc<Teacher>('teachers/' + data.teacherId ).valueChanges().subscribe((tchr: Teacher) => {
          this.afs.doc<User>('users/' + tchr.uid ).valueChanges().subscribe((usr: User) => {
            data.teacherName = usr.displayName;
          });
        });
        return data;
      });
    });
  }

  getNotesByTeacherID(teacherID): Observable<Note[]> {
    const queryObservable = this.afs.collection('notes', ref => ref.where('teacherId', '==', teacherID));

    return queryObservable.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Note;
        data.id = a.payload.doc.id;
        this.afs.doc<Student>('students/' + data.studentId ).valueChanges().subscribe((std: Student) => {
          this.afs.doc<User>('users/' + std.uid ).valueChanges().subscribe((usr: User) => {
            data.studentName = usr.displayName;
          });
        });
        this.afs.doc<Classe>('classes/' + data.classeId ).valueChanges().subscribe((clss: Classe) => {
          data.classeName = clss.displayName;
        });
        this.afs.doc<Exam>('exams/' + data.examId ).valueChanges().subscribe((exm: Exam) => {
          data.examName = exm.examTitle;
        });
        this.afs.doc<Teacher>('teachers/' + data.teacherId ).valueChanges().subscribe((tchr: Teacher) => {
          this.afs.doc<User>('users/' + tchr.uid ).valueChanges().subscribe((usr: User) => {
            data.teacherName = usr.displayName;
          });
        });
        return data;
      });
    });
  }

  addNote(note) {
    this.notesCollection.add(note);
  }

}
