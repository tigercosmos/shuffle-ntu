import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-concept',
  templateUrl: './concept.component.html',
  styleUrls: ['./concept.component.css']
})
export class ConceptComponent implements OnInit {

  content: string;

  constructor() { }

  ngOnInit() {
    this.content = `
    台大晚餐，總是充滿故事
    這裡就像一個新的時空，你會感到完全放鬆
    跟陌生朋友真誠對話，深入互道人生故事
    每一位，都樂於分享、細心聆聽

    這不是聯誼，這是台大晚餐
    讓你沈浸一夜故事饗宴
    `;
  }

}
