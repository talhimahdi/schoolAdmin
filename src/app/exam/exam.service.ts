import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Exam } from './exam';
import { Subject } from '../subject/subject';

@Injectable()
export class ExamService {
  examsCollection: AngularFirestoreCollection<Exam>;
  examDocument: AngularFirestoreDocument<Exam>;

  constructor(private afs: AngularFirestore) {
    this.examsCollection = this.afs.collection('exams', ref => {
      return ref.orderBy('examTitle', 'asc');
    });
  }

  getexams(): Observable<Exam[]> {
    return this.examsCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Exam;
        data.id = a.payload.doc.id;
        this.afs.doc(`subjects/${data.subjectId}`).valueChanges().subscribe((sbjct: Subject) => {
          data.subjectName = sbjct.subjectName;
        });
        return data;
      });
    });
  }

  addexam(exam) {
    this.examsCollection.add(exam);
  }

  updateexam(exam) {
    this.examDocument = this.afs.doc(`exams/${exam.id}`);
    delete exam.id;
    delete exam.subjectName;
    this.examDocument.update(exam);
  }

  deleteexam(exam) {
    this.examDocument = this.afs.doc(`exams/${exam.id}`);
    this.examDocument.delete();
  }

}
