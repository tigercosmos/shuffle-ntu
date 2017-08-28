import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-milestone',
  templateUrl: './milestone.component.html',
  styleUrls: ['./milestone.component.css']
})
export class MilestoneComponent implements OnInit {

  signupTotal: number;
  comeTotal: number;
  meetTotal: number;

  constructor() { }

  ngOnInit() {
    this.signupTotal = 120;
    this.comeTotal = 60;
    this.meetTotal = 23;
  }

}
