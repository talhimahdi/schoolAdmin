import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Subject } from './subject';

@Injectable()
export class SubjectService {
  subjectsCollection: AngularFirestoreCollection<Subject>;
  subjectDocument: AngularFirestoreDocument<Subject>;

  constructor(private afs: AngularFirestore) {
    this.subjectsCollection = this.afs.collection('subjects', ref => {
      return ref.orderBy('subjectName', 'asc');
    });
  }

  getsubjects(): Observable<Subject[]> {
    /*return this.subjectsCollection.valueChanges();*/
    return this.subjectsCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Subject;
        data.id = a.payload.doc.id;
        return data;
      });
    });
  }

  getSubjectByID(subjectID): Observable<Subject> {
    this.subjectDocument = this.afs.doc<Subject>('subjects/' + subjectID );
    return this.subjectDocument.valueChanges().map((sbjct: Subject) => {
      sbjct.id = subjectID;
      return sbjct;
    });
  }

  addsubject(subject) {
    this.subjectsCollection.add(subject);
  }

  updatesubject(subject) {
    this.subjectDocument = this.afs.doc(`subjects/${subject.id}`);
    delete subject.id;
    this.subjectDocument.update(subject);
  }

  deletesubject(subject) {
    this.subjectDocument = this.afs.doc(`subjects/${subject.id}`);
    this.subjectDocument.delete();
  }

  getsubjectsName() {
    const subjectsName = [];
    this.subjectsCollection.valueChanges().subscribe(v => {
      v.forEach((element, index) => {
        subjectsName[index] = element.subjectName;
      });
    });
    return subjectsName;
  }

}
