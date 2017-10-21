import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class AdminService {
  usersObjDB: FirebaseObjectObservable<any>;
  usersListDB: FirebaseListObservable<any[]>;
  backupListDB: FirebaseListObservable<any[]>;
  usersArray: any = [];
  userObject: any;

  constructor(
    private db: AngularFireDatabase,
    private ms: NzMessageService
  ) {
    this.fetchUserList();
  }

  backup() {
    const currentTime = `${Date.now()}`;
    this.backupListDB = this.db.list('/backup/users');
    const data = {};
    data[currentTime] = this.usersArray;
    this.backupListDB.push(data);
  }

  fetchUserList() {
    this.usersObjDB = this.db.object('/users');
    this.usersObjDB.subscribe(items => {
      this.userObject = items;
      if (this.usersArray.length > 0) {
        this.usersArray = [];
      }
      for (const i in items) {
        if (items.hasOwnProperty(i)) {
          items[i].key = i;
          this.usersArray.push(items[i]);
        }
      }
      this.updateUserList(this.usersArray);
    });
  }

  updateUserList(users: Array<any>) {
    this.usersListDB = this.db.list('/users');
    // double check. Prevent a new user sign up just after constructor have run
    this.initNewUsers(this.usersArray);
    for (const user of users) {
      this.usersListDB.update(user.key, user);
    }
    this.ms.success('Update All User Success!');
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
    for (const i of users) {
      this.usersListDB.remove(i);
    }
    this.ms.success('Remove Duplicate Users Success!');
  }

  initNewUsers(usersArray) {
    usersArray.forEach((user) => {
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
