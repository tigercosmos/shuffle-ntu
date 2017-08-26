import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {

  users: FirebaseListObservable<any[]>;
  validateForm: FormGroup;

  submitForm = ($event, value) => {
    $event.preventDefault();
    for (const key in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(key)) {
        this.validateForm.controls[key].markAsDirty();
      }
    }
    // put the singup info to database
    try {
      this.users.push(value);
      this.nns.create('success',
        '成功報名',
        '每個禮拜六，我們將從報名者中抽出幸運兒，體驗最好玩的台大晚餐'
      );
    } catch (e) {
      this.nns.create('error',
        '報名失敗',
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
    this.users = db.list('/users');

    this.validateForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [this.emailValidator]],
      grade: ['', [Validators.required]],
      ntu: [true, [Validators.required]]
    });
  }

  ngOnInit() {
  }

}
