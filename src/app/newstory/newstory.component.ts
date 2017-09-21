import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-newstory',
  templateUrl: './newstory.component.html',
  styleUrls: ['./newstory.component.css']
})
export class NewstoryComponent implements OnInit {

  stories: FirebaseListObservable<any[]>;
  validateForm: FormGroup;

  /****  Modal  ****/
  isVisible = false;
  isConfirmLoading = false;

  showModal = () => {
    this.isVisible = true;
  }

  handleCancel = (e) => {
    this.isVisible = false;
  }

  /****  End of Modal  ****/

  /****  Form  ****/
  submitForm = ($event, value) => {
    $event.preventDefault();
    for (const key in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(key)) {
        this.validateForm.controls[key].markAsDirty();
      }
    }
    // put the singup info to database
    try {
      this.stories.push(value);
      this.nns.create('success',
        '成功',
        '您的故事將會隨機出現在網站中'
      );

      // hide modal
      this.isVisible = false;

    } catch (e) {
      this.nns.create('error',
        '失敗',
        '請重新提交一次'
      );
    }
  }

  getFormControl(name) {
    return this.validateForm.controls[name];
  }

  emailValidator = (control: FormControl): { [s: string]: boolean } => {
    const EMAIL_REGEXP = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
    if (!control.value) {
      return { required: true };
    } else if (!EMAIL_REGEXP.test(control.value)) {
      return { error: true, email: true };
    }
  }

  constructor(
    private fb: FormBuilder,
    private db: AngularFireDatabase,
    private nns: NzNotificationService
  ) {
    this.stories = db.list('/stories');

    this.validateForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [this.emailValidator]],
      grade: ['', [Validators.required]],
      src: ['', [Validators.required]],
      content: ['', [Validators.required]],
    });
  }

  ngOnInit() {
  }

}
