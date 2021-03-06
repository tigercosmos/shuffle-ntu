import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {

  constructor() { }

  @Output() getTarget: EventEmitter<string> = new EventEmitter<string>();

  emitTarget(target: string) {
    this.getTarget.emit(target);
  }

  rwd() {
    const x = $('#topnav');
    if (!x.hasClass('responsive')) {
      x.addClass('responsive');
    } else {
      x.removeClass('responsive');
    }
  }

  ngOnInit() {
  }

}
