import { Component, OnInit, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { Exam } from '../exam';
import { ExamService } from '../exam.service';

import { Observable } from 'rxjs/Observable';
import { ConfirmationService } from 'primeng/primeng';
import { Subject } from '../../subject/subject';
import { SubjectService } from '../../subject/subject.service';

import * as moment from 'moment';

@Component({
  selector: 'app-exam-list',
  templateUrl: './exam-list.component.html',
  styleUrls: ['./exam-list.component.css']
})
export class ExamListComponent implements OnInit {
  section_name = 'Examins';

  exams: Observable<Exam[]>;
  exam: Exam = {
    examTitle: '',
    subjectId: '',
    examCoef: 0,
    examDate: ''
  };

  subjects: Observable<Subject[]>;

  addSaveNtn = 'Add';

  constructor(
    private examService: ExamService,
    private confirmationService: ConfirmationService,
    private subjectService: SubjectService
  ) { }

  ngOnInit() {
    this.exams = this.examService.getexams();
    this.subjects = this.subjectService.getsubjects();
  }

  deleteExam(exam) {
    this.confirmationService.confirm({
      message: 'Are you sure?',
      accept: () => {
        this.examService.deleteexam(exam);
        if (exam.id === this.exam.id) {
          this.examReset();
        }
      }
    });
  }

  editExam(exam) {
    this.exam = exam;
    this.addSaveNtn = 'Save';
  }

  addUpdateExam(exam) {
    if (exam.examTitle !== '' && exam.subjectId !== '' && exam.examCoef !== '' && exam.examDate !== '') {
      exam.examDate = moment(exam.examDate).format('YYYY-MM-DD');
      if (exam.id !== undefined) {
        this.examService.updateexam(exam);
      } else {
        this.examService.addexam(exam);
      }
      this.examReset();
    }
  }

  examReset() {
    this.exam = {
      examTitle: '',
      subjectId: '',
      examCoef: 0,
      examDate: ''
    };
    this.addSaveNtn = 'Add';
  }

}
