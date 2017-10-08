import { Component, OnInit, Input } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit {


  data: Array<any> = []; // table data

  constructor(private as: AdminService) {
  }

  ngOnInit() {
    this.data = this.as.getUsersArray();
  }

}
