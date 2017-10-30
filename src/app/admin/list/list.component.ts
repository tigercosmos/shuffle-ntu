import { Component, OnInit, Input } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit {

  isEditMode = false;
  data: Array<any> = []; // table data
  changedData: Array<any> = [];

  constructor(private as: AdminService) {
  }

  ngOnInit() {
    this.data = this.as.getUsersArray();
  }

  update() {
    this.checkData();
    this.as.updateUserList(this.changedData);
  }

  record(data) {
    this.changedData.push(data);
  }

  checkData() {
    this.data.forEach(user => {
      user.lastBeSelected = forceBoolean(user.lastBeSelected);
      user.unluckyTimes = forceNumber(user.unluckyTimes);
      user.winTimes = forceNumber(user.winTimes);
      user.absentTimes = forceNumber(user.absentTimes);
      user.suspensive = forceBoolean(user.suspensive);
    });

    function forceNumber(input: string) {
      const reg = /^\d+$/;
      if (!reg.test(input)) {
        input = '0';
      }
      return parseInt(input, 10);
    }
    function forceBoolean(input: string) {
      if (input === 'true') {
        return true;
      } else if (input === 'false') {
        return false;
      } else {
        return false;
      }
    }
  }

  changeEditMode() {
    this.isEditMode = !this.isEditMode;
  }

}
