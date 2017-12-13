import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Teacher } from './teacher';
import { User } from '../user/user';

import * as firebase from 'firebase';

@Injectable()
export class TeacherService {
  teachersCollection: AngularFirestoreCollection<Teacher>;
  teacherDocument: AngularFirestoreDocument<Teacher>;

  usersCollection: AngularFirestoreCollection<User>;
  userDocument: AngularFirestoreDocument<User>;

  teacher: Teacher;



  constructor(private afs: AngularFirestore) {
    this.teachersCollection = this.afs.collection('teachers', ref => {
      return ref.orderBy('lastName', 'asc');
    });

    this.usersCollection = this.afs.collection('users');
  }

  getTeachers(): Observable<Teacher[]> {
    return this.teachersCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Teacher;
        data.id = a.payload.doc.id;
        this.afs.doc(`users/${data.uid}`).valueChanges().subscribe((ab: User) => {
          data.email = ab.email;
          data.photoURL = ab.photoURL;
          data.displayName = ab.displayName;
        });
        return data;
      });
    });
  }

  getTeacherByID(teacherID) {
    this.teacherDocument = this.afs.doc<Teacher>('teachers/' + teacherID);
    return this.teacherDocument.valueChanges().map((tchr: Teacher) => {
      this.afs.doc<User>('users/' + tchr.uid).valueChanges().subscribe((usr: User) => {
        tchr.email = usr.email;
        tchr.displayName = usr.displayName;
        tchr.photoURL = usr.photoURL;
        tchr.id = teacherID;
      });
      return tchr;
    });
  }

  addTeacher(teacher) {
    // Add User First
    const newUser: User = {
      displayName: '',
      email: '',
      photoURL: '',
      role: ''
    };
    newUser.displayName = teacher.firstName + ' ' + teacher.lastName;
    newUser.email = teacher.email;
    newUser.role = 'Teacher';

    this.usersCollection.add(newUser).then(_ => {
      this.userDocument = this.afs.doc(`users/${_.id}`);
      for (const selectedFile of [(<HTMLInputElement>document.getElementById('pic')).files[0]]) {
        if (selectedFile) {
          const storageRef = firebase.storage().ref().child('/profileimages/' + _.id);
          storageRef.put(selectedFile).then(file => {
            storageRef.getDownloadURL().then(url => {
              newUser.photoURL = url;
              this.userDocument.update(newUser);
            });
          });
        }
      }

      // Then Add Teacher
      delete teacher.displayName;
      delete teacher.email;
      delete teacher.role;
      delete teacher.photoURL;
      teacher.uid = _.id;

      this.teachersCollection.add(teacher);

    });
  }

  updateTeacher(teacher) {
    // Update User First
    const user: User = {
      displayName: '',
      email: ''
    };
    this.userDocument = this.afs.doc(`users/${teacher.uid}`);
    user.displayName = teacher.firstName + ' ' + teacher.lastName;
    user.email = teacher.email;

    for (const selectedFile of [(<HTMLInputElement>document.getElementById('pic')).files[0]]) {
      if (selectedFile) {
        if (teacher.photoURL !== '') {
          // Delete Old Photo and Add the new photo
          firebase.storage().ref().child('/profileimages/' + teacher.uid).delete().then(res => {
            const newPhotostorageRef = firebase.storage().ref().child('/profileimages/' + teacher.uid);
            newPhotostorageRef.put(selectedFile).then(file => {
              newPhotostorageRef.getDownloadURL().then(url => {
                user.photoURL = url;
                this.userDocument.update(user);
              });
            });
          });
        } else {
          // Add the New Photo
          const newPhotostorageRef = firebase.storage().ref().child('/profileimages/' + teacher.uid);
          newPhotostorageRef.put(selectedFile).then(file => {
            newPhotostorageRef.getDownloadURL().then(url => {
              user.photoURL = url;
              this.userDocument.update(user);
            });
          });
        }
      }
    }

    // Then Update Teacher
    this.teacherDocument = this.afs.doc(`teachers/${teacher.id}`);

    delete teacher.displayName;
    delete teacher.email;
    delete teacher.role;
    delete teacher.photoURL;
    delete teacher.id;
    delete teacher.id;

    this.teacherDocument.update(teacher);
  }

  deleteTeacher(teacher) {
    if (teacher.id && teacher.uid) {
      this.userDocument = this.afs.doc(`users/${teacher.uid}`);
      this.userDocument.delete();
      this.teacherDocument = this.afs.doc(`teachers/${teacher.id}`);
      this.teacherDocument.delete();
      if (teacher.photoURL !== '') {
        firebase.storage().ref().child('/profileimages/' + teacher.uid).delete();
      }
    }
  }

  getTeachersName() {
    const teachersName = [];
    this.teachersCollection.valueChanges().subscribe(v => {
      v.forEach((element, index) => {
        teachersName[index] = element.firstName + ' ' + element.lastName;
      });
    });
    return teachersName;
  }

}
