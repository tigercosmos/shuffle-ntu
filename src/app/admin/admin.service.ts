import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class AdminService {
  usersObjDB: FirebaseObjectObservable<any>;
  usersListDB: FirebaseListObservable<any[]>;
  usersArray: any = [];
  userObject: any;

  constructor(
    private db: AngularFireDatabase,
    private ms: NzMessageService
  ) {
    this.fetchUserList();
    this.initNewUsers();
  }

  fetchUserList() {
    this.usersObjDB = this.db.object('/users');
    try {
      this.usersObjDB.subscribe(items => {
        this.userObject = items;
        for (const i in items) {
          if (items.hasOwnProperty(i)) {
            items[i].key = i;
            this.usersArray.push(items[i]);
          }
        }
      });
    } catch (e) {
      this.ms.error('Cannot Fetch User Data!');
    }
  }

  updateUserList(users: Array<any>) {
    this.usersListDB = this.db.list('/users');
    try {
      // double check. Prevent a new user sign up just after constructor have run
      this.initNewUsers();
      for (const user of users) {
        this.usersListDB.update(user.key, user);
      }
      this.ms.success('Update All User Success!');
    } catch (e) {
      this.ms.error('Update All User Failed!');
    }
  }

  uploadLuckyList(users: Array<any>) {
    this.usersListDB = this.db.list('/lucky');
    try {
      this.usersListDB.push(users);
      this.ms.success('Upload Lucky Users List Success!');
    } catch (e) {
      this.ms.error('Upload Lucky Users List Failed!');
    }
  }

  getUsersObject(): any {
    return this.userObject;
  }

  getUsersArray(): any {
    return this.usersArray;
  }

  removeUsers(users: Array<any>): void {
    this.usersListDB = this.db.list('/users');
    try {
      for (const i of users) {
        this.usersListDB.remove(i);
      }
      this.ms.success('Remove Duplicate Users Success!');
    } catch (e) {
      this.ms.error('Remove Duplicate Users Failed!');
    }
  }

  initNewUsers() {
    this.usersArray.forEach((user) => {
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
}
