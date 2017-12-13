import { Component, OnInit } from '@angular/core';
import { ClasseSlot } from '../classe-slot';
import { ClasseSlotService } from '../classe-slot.service';
import { ClasseService } from '../../classe/classe.service';
import { SubjectService } from '../../subject/subject.service';
import { TeacherService } from '../../teacher/teacher.service';

import { Observable } from 'rxjs/Observable';
import { DatePipe } from '@angular/common';
import { Time } from '@angular/common';
import * as moment from 'moment';

@Component({
  selector: 'app-classe-slots-list',
  templateUrl: './classe-slots-list.component.html',
  styleUrls: ['./classe-slots-list.component.css']
})
export class ClasseSlotsListComponent implements OnInit {
  section_name = 'Slots';

  classesSlots: Observable<ClasseSlot[]>;
  classeSlot: ClasseSlot = {
    classeName: '',
    color: '',
    startDate: '',
    endDate: '',
    dayNumber: 0,
    subjectName: '',
    teacherName: '',
    timeStart: '',
    timeEnd: ''
  };

  classesName;
  subjectsName;
  teachersName;

  addSaveNtn = 'Add';

  constructor(
    private classeSlotService: ClasseSlotService,
    private classeService: ClasseService,
    private subjectService: SubjectService,
    private teacherService: TeacherService
  ) { }

  ngOnInit() {
    this.classesSlots = this.classeSlotService.getclassesSlots();
    this.classesName = this.classeService.getclassesName();
    this.subjectsName = this.subjectService.getsubjectsName();
    this.teachersName = this.teacherService.getTeachersName();
  }

  deleteClasseSlot(classeSlot) {
    if (confirm('Are you sure?')) {
      this.classeSlotService.deleteclasseSlot(classeSlot);
      if (classeSlot.id === this.classeSlot.id) {
        this.classeSlotReset();
      }

    }
  }

  editClasseSlot(classeSlot) {
    this.classeSlot = classeSlot;
    this.addSaveNtn = 'Save';
  }

  addUpdateClasseSlot(classeSlot) {
    if (classeSlot.classeName !== '' && classeSlot.color !== ''
        && classeSlot.slotDate !== '' && classeSlot.subjectName !== ''
        && classeSlot.teacherName !== '' && classeSlot.timeStart !== ''
        && classeSlot.timeEnd !== '') {
          classeSlot.slotDate = moment(classeSlot.slotDate).format('YYYY-MM-DD');
          classeSlot.timeStart = moment(classeSlot.timeStart).format('HH:mm');
          classeSlot.timeEnd = moment(classeSlot.timeEnd).format('HH:mm');
      if (classeSlot.id !== undefined) {
        this.classeSlotService.updateclasseSlot(classeSlot);
      } else {
        this.classeSlotService.addclasseSlot(classeSlot);
      }
      this.classeSlotReset();
    }
  }

  classeSlotReset() {
    this.classeSlot = {
      classeName: '',
      color: '',
      startDate: '',
      endDate: '',
      dayNumber: 0,
      subjectName: '',
      teacherName: '',
      timeStart: '',
      timeEnd: ''
    };
    this.addSaveNtn = 'Add';
  }

}
