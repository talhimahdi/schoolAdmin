import { Component, OnInit, Injectable } from '@angular/core';
import { Subject } from '../subject';
import { SubjectService } from '../subject.service';

import { Observable } from 'rxjs/Observable';
import { ConfirmationService } from 'primeng/primeng';

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.css']
})
export class SubjectListComponent implements OnInit {
  section_name = 'Subjects';

  subjects: Observable<Subject[]>;
  subject: Subject = {
    subjectName: '',
    abbreviation: ''
  };

  addSaveNtn = 'Add';

  constructor(private subjectService: SubjectService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.subjects = this.subjectService.getsubjects();
  }

  deleteSubject(subject) {
    this.confirmationService.confirm({
      message: 'Are you sure?',
      accept: () => {
        this.subjectService.deletesubject(subject);
        if (subject.id === this.subject.id) {
          this.subjectReset();
        }
      }
    });
  }

  editSubject(subject) {
    this.subject = subject;
    this.addSaveNtn = 'Save';
  }

  addUpdateSubject(subject) {
    if (subject.subjectName !== '' && subject.abbreviation !== '') {
      if (subject.id !== undefined) {
        this.subjectService.updatesubject(subject);
      }else {
        this.subjectService.addsubject(subject);
      }
      this.subjectReset();
    }

    // console.log(classe);
  }

  subjectReset() {
    this.subject = {
      subjectName: '',
      abbreviation: ''
    };
    this.addSaveNtn = 'Add';
  }

}
