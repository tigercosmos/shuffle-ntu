import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admission',
  templateUrl: './admission.component.html',
  styleUrls: ['./admission.component.css']
})
export class AdmissionComponent implements OnInit {
  title = '本週名單';
  isVisible = false;

  showModal = () => {
    this.isVisible = true;
  }

  handleCancel = (e) => {
    this.isVisible = false;
  }

  constructor() { }

  ngOnInit() {
  }

}
