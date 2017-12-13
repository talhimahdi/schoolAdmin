import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { ClasseSlot } from './classe-slot';

@Injectable()
export class ClasseSlotService {
  classesSlotsCollection: AngularFirestoreCollection<ClasseSlot>;
  classeSlotsDocument: AngularFirestoreDocument<ClasseSlot>;

  constructor(private afs: AngularFirestore) {
    this.classesSlotsCollection = this.afs.collection('slots', ref => {
      return ref.orderBy('classeName', 'asc');
    });
  }

  getclassesSlots(): Observable<ClasseSlot[]> {
    return this.classesSlotsCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as ClasseSlot;
        data.id = a.payload.doc.id;
        return data;
      });
    });
  }

  addclasseSlot(classeSlot) {
    this.classesSlotsCollection.add(classeSlot);
  }

  updateclasseSlot(classeSlot) {
    this.classeSlotsDocument = this.afs.doc(`slots/${classeSlot.id}`);
    delete classeSlot.id;
    this.classeSlotsDocument.update(classeSlot);
  }

  deleteclasseSlot(classeSlot) {
    this.classeSlotsDocument = this.afs.doc(`slots/${classeSlot.id}`);
    this.classeSlotsDocument.delete();
  }

}
