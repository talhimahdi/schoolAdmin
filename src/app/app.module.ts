import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import {AngularFirestoreModule, AngularFirestore} from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2';

import { environment } from '../environments/environment';
export const firebaseConfig = environment.firebaseConfig;

import { DateTimePickerModule } from 'ng-pick-datetime';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {
  ConfirmDialogModule,
  ConfirmationService,
  SharedModule,
  DialogModule
} from 'primeng/primeng';


// Components Import
import { AppComponent } from './app.component';
import { ClasseListComponent } from './classe/classe-list/classe-list.component';
import { ClasseSlotsListComponent } from './classe-slots/classe-slots-list/classe-slots-list.component';
import { SubjectListComponent } from './subject/subject-list/subject-list.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { StudentListComponent } from './student/student-list/student-list.component';
import { StudentDetailsComponent } from './student/student-details/student-details.component';
import { TeacherListComponent } from './teacher/teacher-list/teacher-list.component';
import { TeacherDetailsComponent } from './teacher/teacher-details/teacher-details.component';

import { AssignementListComponent } from './assignement/assignement-list/assignement-list.component';
import { NoteListComponent } from './note/note-list/note-list.component';
import { ExamListComponent } from './exam/exam-list/exam-list.component';

import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
// # Components Import

// Services Import
import { ClasseService } from './classe/classe.service';
import { SubjectService } from './subject/subject.service';
import { UserService } from './user/user.service';
import { StudentService } from './student/student.service';
import { TeacherService } from './teacher/teacher.service';
import { ClasseSlotService } from './classe-slots/classe-slot.service';
import { AssignementService } from './assignement/assignement.service';
import { NoteService } from './note/note.service';
import { ExamService } from './exam/exam.service';
import { LoginComponent } from './login/login.component';
import { NoteAddComponent } from './note/note-add/note-add.component';

// # Services Import

@NgModule({
  declarations: [
    AppComponent,
    ClasseListComponent,
    ClasseSlotsListComponent,
    SubjectListComponent,
    UserListComponent,
    StudentListComponent,
    StudentDetailsComponent,
    TeacherListComponent,
    TeacherDetailsComponent,
    HomeComponent,
    AssignementListComponent,
    NoteListComponent,
    NotFoundComponent,
    ExamListComponent,
    ExamListComponent,
    LoginComponent,
    NoteAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    DateTimePickerModule,
    BrowserAnimationsModule,
    ConfirmDialogModule,
    SharedModule,
    DialogModule
  ],
  providers: [
    ClasseService,
    ClasseSlotService,
    SubjectService,
    UserService,
    StudentService,
    TeacherService,
    AssignementService,
    NoteService,
    ExamService,
    ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
