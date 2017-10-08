import { Component } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-drawing',
  templateUrl: './drawing.component.html',
  styleUrls: ['./drawing.component.css']
})

export class DrawingComponent {


  users: Array<any> = [];
  repeatUsersKey: Array<String> = [];
  luckyUsers: Array<any> = [];

  constructor(private as: AdminService) {
  }

  start() {
    this.users = this.as.getUsersArray();
    this.checkRepeat();
    this.deleteRepeat();
    this.initNewUsers();
    this.draw();
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
  }

  deleteRepeat() {
    this.as.removeUsers(this.repeatUsersKey);
  }

  initNewUsers() {
    this.users.forEach((user) => {
      if (!('lastBeSelected' in user)) {
        // Last time be selected or not
        user['lastBeSelected'] = false;
        // Times absent without notice
        user['absentTimes'] = 0;
        // Times not be selected
        user['unluckyTimes'] = 0;
        // Times be selected
        user['winTimes'] = 0;
        // Suspensive or not
        user['suspensive'] = false;
      }
    });
  }

  draw() {
    let luckyUser; // each round the winner's key
    const luckyList = []; // list only have key
    this.luckyUsers = []; // init the final data

    // put ntu students in the ntuDrawPool with probability
    const ntuDrawPool = putInPool(
      this.users.filter((user) => {
        return user.ntu;
      })
    );
    // get lucky 15 ntu students' keys
    while (luckyList.length < 15) {
      luckyUser = ntuDrawPool[randN(ntuDrawPool.length)];
      if (!(luckyUser in luckyList)) {
        luckyList.push(luckyUser);
      }
    }

    // put other students in the otherDrawPool with probability
    const otherDrawPool = putInPool(
      this.users.filter((user) => {
        return !user.ntu;
      })
    );
    // get a lucky other student's key
    luckyUser = otherDrawPool[randN(otherDrawPool.length)];
    while (1) {
      if (!(luckyUser in luckyList)) {
        luckyList.push(luckyUser);
        break;
      }
    }
    // from keys to make final data
    const userObj = this.as.getUsersObject();
    luckyList.forEach((key) => {
      this.luckyUsers.push(userObj[key]);
    });

    function putInPool(users) {
      let drawPool = [];
      users.forEach((user) => {
        if (!user['lastBeSelected'] && !user['suspensive']) {
          if (user['unluckyTimes'] > 2 && user['winTimes'] === 0) {
            // if unlucky more than two times and never win before, than the probability multiply three
            drawPool = [...drawPool, user.key, user.key, user.key];
          } else if (user['unluckyTimes'] > 2 && user['winTimes'] > 0) {
            // if unlucky more than two times and have won before, than the probability multiply two
            drawPool = [...drawPool, user.key, user.key];
          } else {
            drawPool = [...drawPool, user.key];
          }
        }
      });
      return drawPool;
    }

    function randN(n) {
      return Math.floor(Math.random() * n);
    }
  }

}
