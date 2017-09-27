import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';

@Component({
  selector: 'app-concept',
  templateUrl: './concept.component.html',
  styleUrls: ['./concept.component.css']
})
export class ConceptComponent implements OnInit {

  contentDB: FirebaseObjectObservable<any>;
  contentString: String = 'Loading...';
  mobile: Boolean = false;
  sourcePath: any = '/contents/concept';

  constructor(private db: AngularFireDatabase) {
    // Change content to mobile version
    if ($(window).width() < 500) {
      this.mobile = true;
      this.sourcePath += '_m';
    }
    // get content from firebase
    this.contentDB = db.object(this.sourcePath);
    this.contentDB.subscribe(item => {
      this.contentString = item.$value;
    });
  }

  ngOnInit() {
  }

}
