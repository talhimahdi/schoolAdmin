import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Teacher } from '../teacher';
import { TeacherService } from '../teacher.service';

@Component({
  selector: 'app-teacher-details',
  templateUrl: './teacher-details.component.html',
  styleUrls: ['./teacher-details.component.css']
})
export class TeacherDetailsComponent implements OnInit {
  teacherID;
  teacher: Observable<Teacher>;

  constructor(private teacherService: TeacherService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.teacherID = params.id;
      if (this.teacherID !== '') {
        this.teacher = this.teacherService.getTeacherByID(this.teacherID);
      }
    });
  }

}
