import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';


@Component({
  selector: 'app-admission',
  templateUrl: './admission.component.html',
  styleUrls: ['./admission.component.css']
})
export class AdmissionComponent implements OnInit {
  title = '本週名單';
  isVisible = false;
  weekObjDB: FirebaseObjectObservable<any>;
  weekList = [];
  thisWeekNumber = 0;
  thisWeekUsers = [];

  constructor(private db: AngularFireDatabase) {
    this.fetchWeekList();
  }

  showModal = () => {
    this.isVisible = true;
  }

  handleCancel = (e) => {
    this.isVisible = false;
  }

  fetchWeekList() {
    this.weekObjDB = this.db.object('/lucky');
    this.weekObjDB.subscribe(items => {
      this.weekObjDB = items;
      for (const i in items) {
        if (items.hasOwnProperty(i)) {
          items[i].key = i;
          this.weekList.push(items[i]);
        }
      }
      const thisWeekList = this.weekList[this.weekList.length - 1];
      this.thisWeekNumber = this.weekList.length;
      this.thisWeekUsers = [
        { a: thisWeekList[0], b: thisWeekList[1], c: thisWeekList[2] },
        { a: thisWeekList[3], b: thisWeekList[4], c: thisWeekList[5] },
        { a: thisWeekList[6], b: thisWeekList[7], c: thisWeekList[8] },
        { a: thisWeekList[9], b: thisWeekList[10], c: thisWeekList[11] },
        { a: thisWeekList[12], b: thisWeekList[13], c: thisWeekList[14] },
        { a: thisWeekList[15], b: { grade: '', name: '' }, c: { grade: '', name: '' } },
      ];
    });
  }

  ngOnInit() {
  }

}
