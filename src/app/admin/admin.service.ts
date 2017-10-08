import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class AdminService {
  usersObjDB: FirebaseObjectObservable<any>;
  usersListDB: FirebaseListObservable<any[]>;
  usersArray: any = [];
  userObject: any;

  constructor(private db: AngularFireDatabase) {
    this.fetchUserList();
  }

  fetchUserList() {
    this.usersObjDB = this.db.object('/users');
    this.usersObjDB.subscribe(items => {
      this.userObject = items;
      for (const i in items) {
        if (items.hasOwnProperty(i)) {
          items[i].key = i;
          this.usersArray.push(items[i]);
        }
      }
    });
  }

  getUsersObject(): any {
    return  this.userObject;
  }

  getUsersArray(): any {
    return this.usersArray;
  }

  removeUsers(users: Array<any>): void {
    this.usersListDB = this.db.list('/users');
    for (const i of users) {
      this.usersListDB.remove(i);
    }
  }
}
