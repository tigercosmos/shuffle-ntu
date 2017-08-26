import { Component, ElementRef, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  constructor(private el: ElementRef) {
  }

  ngOnInit() {
  }

  scrollToTarget(target: String) {
    $('html, body').animate({
      scrollTop: $('#' + target).offset().top + (-64)
    }, 900);
  }

}
