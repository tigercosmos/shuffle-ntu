import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit {

  storiesDB: FirebaseObjectObservable<any>;
  storiesList: Array<any> = [0]; // prevent async error
  story: any = {};
  storyAutoIndex = 0;

  constructor(private db: AngularFireDatabase) {
    this.storiesDB = db.object('/stories');
    this.storiesDB.subscribe(items => {
      this.storiesList = []; // empty
      for (const i in items) {
        if (items.hasOwnProperty(i)) {
          this.storiesList.push(items[i]);
        }
      }
      this.autoPlay();
    });
  }

  ngOnInit() {
    this.story = {
      'content': 'Loading...',
      'grade': '',
      'name': '',
      'src': ''
    };
  }

  autoPlay() {
    setInterval(_ => {
      this.storyAutoIndex = (this.storyAutoIndex + 1) % this.storiesList.length;
      this.story = this.storiesList[this.storyAutoIndex];
    }, 5000);
  }
}
