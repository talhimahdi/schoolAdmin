import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Classe } from './classe';

@Injectable()
export class ClasseService {
  classesCollection: AngularFirestoreCollection<Classe>;
  classeDocument: AngularFirestoreDocument<Classe>;

  constructor(private afs: AngularFirestore) {
    this.classesCollection = this.afs.collection('classes', ref => {
      return ref.orderBy('classeName', 'asc');
    });
  }

  getclasses(): Observable<Classe[]> {
    /*return this.classesCollection.valueChanges();*/
    return this.classesCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Classe;
        data.id = a.payload.doc.id;
        return data;
      });
    });
  }

  getClasseByID(classeID): Observable<Classe> {
    this.classeDocument = this.afs.doc<Classe>('classes/' + classeID );
    return this.classeDocument.valueChanges().map((clss: Classe) => {
      clss.id = classeID;
      return clss;
    });
  }

  addclasse(classe) {
    this.classesCollection.add(classe);
  }

  updateclasse(classe) {
    this.classeDocument = this.afs.doc(`classes/${classe.id}`);
    delete classe.id;
    this.classeDocument.update(classe);
  }

  deleteclasse(classe) {
    this.classeDocument = this.afs.doc(`classes/${classe.id}`);
    this.classeDocument.delete();
  }

  getclassesName() {
    const classesName = [];
    this.classesCollection.valueChanges().subscribe(v => {
      v.forEach((element, index) => {
        classesName[index] = element.displayName;
      });
    });
    return classesName;
  }

  searchClasses(search): Observable<Classe[]> {
    this.classesCollection = this.afs.collection('classes', ref => ref.where('displayName', '==', search));

    return this.classesCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Classe;
        data.id = a.payload.doc.id;
        return data;
      });
    });

  }

}
