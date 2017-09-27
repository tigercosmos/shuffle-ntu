import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { NzNotificationService } from 'ng-zorro-antd';
import { Http } from '@angular/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() checkLogIn: EventEmitter<any> = new EventEmitter<any>();

  emailForm: FormGroup;
  pwdForm: FormGroup;
  validEmail: Boolean = false;
  title: String;
  email: String;

  submitEmail = ($event, value) => {
    $event.preventDefault();
    try {
      const url = `http://mospc.cook.as.ntu.edu.tw/shufflentu/checkEmail.php?email=${value.email}`;
      this.http.get(url).subscribe(data => {
        if (JSON.parse(data['_body'])['auth']) {
          this.validEmail = true;
          this.email = value.email;
        } else {
          this.nns.create('error',
            '失敗',
            '請重新提交一次'
          );
        }
      });
    } catch (e) {
      this.nns.create('error',
        '報名失敗',
        '請重新提交一次'
      );
    }
  }
  submitPwd = ($event, value) => {
    $event.preventDefault();
    try {
      const url = `http://mospc.cook.as.ntu.edu.tw/shufflentu/checkPassword.php?password=${value.password}`;
      this.http.get(url).subscribe(data => {
        if (JSON.parse(data['_body'])['auth']) {
          this.checkLogIn.emit(true);
        } else {
          this.nns.create('error',
            'Wrong Password',
            'Please enter the correct password again.'
          );
        }
      });
    } catch (e) {
      this.nns.create('error',
        'Wrong',
        'Please enter the correct password again.'
      );
    }
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
    private nns: NzNotificationService,
    private router: Router,
    private http: Http
  ) {

    this.emailForm = this.fb.group({
      email: ['', [this.emailValidator]],
    });
    this.pwdForm = this.fb.group({
      password: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.title = 'Admin Login';
  }

}
