import { Component, OnInit } from '@angular/core';
import { TeacherService} from '../teacher/teacher.service';
import { StudentService } from '../student/student.service';
import { ClasseService } from '../classe/classe.service';
import { SubjectService } from '../subject/subject.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  teachersName;
  studentsName;
  classesName;
  subjectsName;

  constructor(
    private teacherService: TeacherService,
    private studentService: StudentService,
    private classeService: ClasseService,
    private subjectService: SubjectService
  ) { }

  ngOnInit() {
    this.teachersName = this.teacherService.getTeachersName();
    this.studentsName = this.studentService.getStudentsName();
    this.classesName = this.classeService.getclassesName();
    this.subjectsName = this.subjectService.getsubjectsName();
  }

}
