import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { NoteService } from '../note.service';

import { Observable } from 'rxjs/Observable';
import { Classe } from '../../classe/classe';
import { Subject } from '../../subject/subject';
import { Teacher } from '../../teacher/teacher';
import { Student } from '../../student/student';
import { Assignement } from '../../assignement/assignement';
import { Exam } from '../../exam/exam';

import { ClasseService } from '../../classe/classe.service';
import { SubjectService } from '../../subject/subject.service';
import { TeacherService } from '../../teacher/teacher.service';
import { StudentService } from '../../student/student.service';
import { ExamService } from '../../exam/exam.service';

import { AssignementService } from '../../assignement/assignement.service';
import {DialogModule} from 'primeng/primeng';

import * as moment from 'moment';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent implements OnInit {
  section_name = 'Notes List';
  notes: Observable<Note[]>;

  note: Note = {
    _note: 0,
    createdAt: '',
    classeId: '',
    studentId: '',
    examId: '',
    teacherId: ''
  };

  assignements: Observable<Assignement[]>;

  classes: Observable<Classe[]>;
  subjects: Observable<Subject[]>;
  teachers: Observable<Teacher[]>;
  students: Observable<Student[]>;
  exams: Observable<Exam[]>;

  teacher: any = {
    displayName: '',
  };

  selectedTeacher: any = {
    teacherId: '',
    displayName: ''
  };

  selectedSubject: any = {
    subjectId: '',
    subjectName: ''
  };

  selectedStudent: any = {
    studentId: '',
    displayName: ''
  };

  selectedClasse: any = {
    classeId: '',
    displayName: ''
  };

  addSaveNtn = 'Add';
  assignementsCount: Number = 0;
  studentsCount: Number = 0;

  studentsList: Boolean = false;
  loadingTeachers: Boolean = true;

  teacherID: string;
  subjectID: string;
  classeID: string;

  display: Boolean = false;

  constructor(
    private noteService: NoteService,
    private classeService: ClasseService,
    private subjectService: SubjectService,
    private teacherService: TeacherService,
    private assignementService: AssignementService,
    private studentService: StudentService,
    private examService: ExamService
  ) { }

  ngOnInit() {
    this.notes = this.noteService.getNotes();

    this.notes.subscribe(result => {
      console.log(result);
    });

    this.teachers = this.teacherService.getTeachers();
    this.subjects = this.subjectService.getsubjects();

    this.teachers.subscribe(result => {
      if ( result.length > 0 ) {
        this.loadingTeachers = false;
      }
    });
    // this.subjects = this.subjectService.getsubjects();
    // this.classes = this.classeService.getclasses();
  }

  getNotesByTeacherID(teacherID) {
    if (teacherID !== '') {
      this.notes = this.noteService.getNotesByTeacherID(teacherID);
      /*this.assignements = this.assignementService.getAssignementsByTeacherID(teacherID);
      this.studentsList = false;
      this.teacherID = teacherID;
      this.assignements.subscribe(result => { this.assignementsCount = result.length; });*/
    }
  }

  studentsListByClasse(classeID, subjectID) {
    if (classeID !== '' && subjectID) {
      this.students = this.studentService.getStudentsByClasseID(classeID);
      this.studentsList = true;
      this.subjectID = subjectID;
      this.classeID = classeID;

      this.students.subscribe(result => { this.studentsCount = result.length; });
    }
  }

  hideStudentsList(teacherID) {
    if (teacherID !== '') {
      this.assignements = this.assignementService.getAssignementsByTeacherID(teacherID);
      this.studentsList = false;

      this.assignements.subscribe(result => { this.assignementsCount = result.length; });
      this.studentsList = false;
    }
  }

  newNote(student) {
    this.display = true;
    this.teacherService.getTeacherByID(this.teacherID)
      .subscribe((val: Student) => {
        this.selectedTeacher = val;
      });

    this.subjectService.getSubjectByID(this.subjectID)
      .subscribe((val: Subject) => {
        this.selectedSubject = val;
      });

    this.studentService.getStudentByID(student.id)
      .subscribe((val: Student) => {
        this.selectedStudent = val;
      });

    this.selectedClasse = this.classeService.getClasseByID(this.classeID)
      .subscribe((val: Classe) => {
        this.selectedClasse = val;
      });

      this.exams = this.examService.getexams();
  }

  addNote(note) {
    this.note.studentId = this.selectedStudent.id;
    this.note.classeId = this.selectedClasse.id;
    this.note.studentId = this.selectedSubject.id;
    this.note.teacherId = this.selectedTeacher.id;
    this.note.classeId = note.classeId;
    this.note._note = note._note;
    this.note.createdAt = moment().format('YYYY-MM-DD');

    console.log(this.note);
    this.noteService.addNote(note);
    this.display = false;

  }

  cancelNote() {
    this.display = false;
  }

}
