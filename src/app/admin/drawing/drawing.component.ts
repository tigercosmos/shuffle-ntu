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

  comfirm() {
    this.users.forEach(user => {
      user.lastBeSelected = false;
      user.unluckyTimes += 1;
    });
    this.luckyUsers.forEach(user => {
      user.lastBeSelected = true;
      user.unluckyTimes = 0;
      user.winTimes += 1;
    });
    this.as.uploadLuckyList(this.luckyUsers);
  }

  start() {
    this.users = this.as.getUsersArray();
    this.checkRepeat();
    this.deleteRepeat();
    this.draw();
  }

  checkRepeat() {
    const copyUsersName = [];
    const newUserArray = [];
    this.repeatUsersKey = [];
    for (let i = 0; i < this.users.length; i++) {
      if (copyUsersName.includes(this.users[i].name)) {
        this.repeatUsersKey.push(this.users[i].key);
      } else {
        copyUsersName.push(this.users[i].name);
        newUserArray.push(this.users[i]);
      }
    }
    this.users = newUserArray;
  }

  deleteRepeat() {
    this.as.removeUsers(this.repeatUsersKey);
  }

  draw() {
    let luckyUser; // each round the winner's key
    let luckyList = []; // list only have key
    this.luckyUsers = []; // init the final data
    const userObj = this.as.getUsersObject(); // object for making data via key

    // put ntu students in the ntuDrawPool with probability
    const ntuDrawPool = putInPool(
      this.users.filter((user) => {
        return user.ntu;
      })
    );
    // get lucky 15 ntu students' keys
    while (luckyList.length < 15) {
      luckyUser = ntuDrawPool[randN(ntuDrawPool.length)];
      luckyList.push(luckyUser);
      // remove deplicates
      luckyList = luckyList.filter((v, i) => luckyList.indexOf(v) === i);
    }

    // put other students in the otherDrawPool with probability
    const otherDrawPool = putInPool(
      this.users.filter((user) => {
        return !user.ntu;
      })
    );
    // get a lucky other student's key
    luckyUser = otherDrawPool[randN(otherDrawPool.length)];
    luckyList.push(luckyUser);

    // from keys to make final data
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
