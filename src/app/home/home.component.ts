import { Component, ElementRef, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  scrollToTarget(target: String) {
    $('html, body').animate({
      scrollTop: $('#' + target).offset().top + (-64)
    }, 900);
  }

}
