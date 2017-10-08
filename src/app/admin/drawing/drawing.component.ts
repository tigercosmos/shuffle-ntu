import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-drawing',
  templateUrl: './drawing.component.html',
  styleUrls: ['./drawing.component.css']
})

export class DrawingComponent implements OnInit {


  users: Array<any> = [];
  repeatUsersKey: Array<String> = [];

  constructor(private as: AdminService) {
  }

  ngOnInit() {
  }

  draw() {
    this.users = this.as.getUsers();
    this.checkRepeat();

  }

  checkRepeat() {
    const copyUsers = [];
    for (let i = 0; i < this.users.length; i++) {
      if (copyUsers.includes(this.users[i].name)) {
        this.repeatUsersKey.push(this.users[i].key);
      } else {
        copyUsers.push(this.users[i].name);
      }
    }
    console.log(this.repeatUsersKey);
  }

  deleteRepeat() {
    this.as.removeUsers(this.repeatUsersKey);
  }

}
