import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/primeng';

import { Observable } from 'rxjs/Observable';
import { Assignement } from '../assignement';
import { Teacher } from '../../teacher/teacher';
import { Classe } from '../../classe/classe';
import { Subject } from '../../subject/subject';

// Import Services
import { AssignementService } from '../assignement.service';
import { ClasseService } from '../../classe/classe.service';
import { SubjectService } from '../../subject/subject.service';
import { TeacherService } from '../../teacher/teacher.service';
// # Import Services

@Component({
  selector: 'app-assignement-list',
  templateUrl: './assignement-list.component.html',
  styleUrls: ['./assignement-list.component.css']
})
export class AssignementListComponent implements OnInit {
  assignements: Observable<Assignement[]>;

  assignement: Assignement = {
    classe: {
      id: '',
      classeName: '',
      displayName: '',
      section: ''
    },
    subject: {
      id: '',
      subjectName: '',
      abbreviation: ''
    },
    teacher: {
      id: '',
      firstName: '',
      lastName: '',
      birthday: '',
      address: '',
      gender: '',
      displayName: '',
      email: ''
    }
  };

  addSaveNtn = 'Add';

  classes: Observable<Classe[]>;
  subjects: Observable<Subject[]>;
  teachers: Observable<Teacher[]>;

  constructor(
    private assignementService: AssignementService,
    private classeService: ClasseService,
    private subjectService: SubjectService,
    private teacherService: TeacherService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
    this.assignements = this.assignementService.getAssignements();
    /*this.assignements.subscribe(res => {
        console.log(res);
    });*/

    this.classes = this.classeService.getclasses();
    this.subjects = this.subjectService.getsubjects();
    this.teachers = this.teacherService.getTeachers();
  }

  addUpdateAssignement(assignement) {
    if (assignement.teacher && assignement.classe && assignement.subject) {
      if (assignement.id !== undefined) {
        this.assignementService.updateAssignement(assignement);
      } else {
        // console.log(assignement);
        this.assignementService.addAssignement(assignement);
      }
      this.assignementReset();
    }
  }

  editAssignement(assignement) {
    this.assignement = assignement;
    this.addSaveNtn = 'Save';
  }

  deleteAssignement(assignement) {
    this.confirmationService.confirm({
      message: 'Are you sure?',
      accept: () => {
        this.assignementService.deleteAssignement(assignement);
        if (assignement.id === this.assignement.id) {
          this.assignementReset();
        }
      }
    });
  }

  assignementReset() {
    this.assignement = {
      classe: {
        id: '',
        classeName: '',
        displayName: '',
        section: ''
      },
      subject: {
        id: '',
        subjectName: '',
        abbreviation: ''
      },
      teacher: {
        id: '',
        firstName: '',
        lastName: '',
        birthday: '',
        address: '',
        gender: '',
        displayName: '',
        email: ''
      }
    };
    this.addSaveNtn = 'Add';
  }

}
