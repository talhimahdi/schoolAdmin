import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { User } from './user';

@Injectable()
export class UserService {
  usersCollection: AngularFirestoreCollection<User>;
  userDocument: AngularFirestoreDocument<User>;

  constructor(private afs: AngularFirestore) {
    this.usersCollection = this.afs.collection('users', ref => {
      return ref.orderBy('displayName', 'asc');
    });
  }

  getusers(): Observable<User[]> {
    return this.usersCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as User;
        data.id = a.payload.doc.id;
        return data;
      });
    });
  }

  adduser(user) {
    this.usersCollection.add(user)
      .then(_ => {
        this.userDocument = this.afs.doc(`users/${_.id}`);
        user.uid = _.id;
        this.userDocument.update(user);
      });
  }

  updateuser(user) {
    this.userDocument = this.afs.doc(`users/${user.id}`);
    delete user.id;
    this.userDocument.update(user);
  }

  deleteuser(user) {
    this.userDocument = this.afs.doc(`users/${user.id}`);
    this.userDocument.delete();
  }

}
