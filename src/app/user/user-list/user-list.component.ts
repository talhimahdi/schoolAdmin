import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';

import { Observable } from 'rxjs/Observable';
import { ConfirmationService } from 'primeng/primeng';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  section_name = 'Users';

  users: Observable<User[]>;
  user: User = {
    displayName: '',
    email: '',
    role: ''
  };

  addSaveNtn = 'Add';

  constructor(private userService: UserService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.users = this.userService.getusers();
  }

  deleteUser(user) {
    this.confirmationService.confirm({
      message: 'Are you sure?',
      accept: () => {
        this.userService.deleteuser(user);
        if (user.id === this.user.id) {
          this.userReset();
        }
      }
    });
  }

  editUser(user) {
    this.user = user;
    this.addSaveNtn = 'Save';
  }

  addUpdateUser(user) {
    if (user.displayName !== '' && user.section !== '') {
      if (user.id !== undefined) {
        this.userService.updateuser(user);
      } else {
        this.userService.adduser(user);
      }
      this.userReset();
    }
  }

  userReset() {
    this.user = {
      displayName: '',
      email: '',
      role: ''
    };
    this.addSaveNtn = 'Add';
  }

}
