import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Assignement } from './assignement';

@Injectable()
export class AssignementService {
  assignementsCollection: AngularFirestoreCollection<Assignement>;
  assignementDocument: AngularFirestoreDocument<Assignement>;

  constructor(private afs: AngularFirestore) {
    this.assignementsCollection = afs.collection<Assignement>('assignements', ref => {
      return ref.orderBy('teacher.displayName', 'asc');
    });
    /*this.assignementsCollection.valueChanges().subscribe(res => {
      console.log(res);
    });*/
  }

  getAssignements(): Observable<Assignement[]> {
    return this.assignementsCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Assignement;
        data.id = a.payload.doc.id;
        return data;
      });
    });
  }

  addAssignement(assignement) {
    this.assignementsCollection.add(assignement);
  }

  updateAssignement(assignement) {
    this.assignementDocument = this.afs.doc(`assignements/${assignement.id}`);
    delete assignement.id;
    this.assignementDocument.update(assignement);
  }

  deleteAssignement(assignement) {
    if ( assignement.id ) {
      this.assignementDocument = this.afs.doc(`assignements/${assignement.id}`);
      this.assignementDocument.delete();
    }
  }

  getAssignementsByTeacherID(teacherID): Observable<Assignement[]> {
    const queryObservable = this.afs.collection('assignements', ref => ref.where('teacher.id', '==', teacherID)).valueChanges();

    return queryObservable.map((Items: Assignement[]) => {
        return Items;
    });
  }

}
