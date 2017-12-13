import { Component, OnInit } from '@angular/core';
import { Student } from '../student';
import { Classe } from '../../classe/classe';
import { StudentService } from '../student.service';
import { ClasseService } from '../../classe/classe.service';

import { Observable } from 'rxjs/Observable';
import { ConfirmationService } from 'primeng/primeng';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';


@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  section_name = 'Students';

  students: Observable<Student[]>;

  student: Student = {
    firstName: '',
    lastName: '',
    birthday: '',
    address: '',
    gender: '',
    classeId: '',
    classeDisplayName: '',
    displayName: '',
    email: ''
  };

  classes: Observable<Classe[]>;

  // =>
  addSaveNtn = 'Add';

  constructor(
    private studentService: StudentService,
    private classeService: ClasseService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
    this.students = this.studentService.getStudents();
    this.classes = this.classeService.getclasses();
  }

  deleteStudent(student) {
    this.confirmationService.confirm({
      message: 'Are you sure?',
      accept: () => {
        this.studentService.deleteStudent(student);
        if (student.id === this.student.id) {
          this.studentReset();
        }
      }
    });
  }

  editStudent(student) {
    this.student = student;
    this.addSaveNtn = 'Save';
  }

  addUpdateStudent(student) {
    if (student.firstName !== '' && student.lastName !== '') {
      if (student.birthday !== '') {
        student.birthday = moment(student.birthday).format('YYYY-MM-DD');
      }
      if (student.id !== undefined) {
        this.studentService.updateStudent(student);
      } else {
        this.studentService.addStudent(student);
      }
      this.studentReset();
    }
  }

  studentReset() {
    this.student = {
      firstName: '',
      lastName: '',
      birthday: '',
      address: '',
      gender: '',
      classeId: '',
      classeDisplayName: '',
      displayName: '',
      email: ''
    };
    this.addSaveNtn = 'Add';
  }

}
