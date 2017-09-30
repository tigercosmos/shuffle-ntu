import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  usersDB: FirebaseObjectObservable<any>;
  @Input() data: Array<any> = []; // table data
  user: any = {};

  constructor(private db: AngularFireDatabase) {
    this.usersDB = db.object('/users');
    this.usersDB.subscribe(items => {
      console.log(items);
      for (const i in items) {
        if (items.hasOwnProperty(i)) {
          this.data.push(items[i]);
        }
      }
      console.log(this.data);
    });
  }

  ngOnInit() {
  }

}
