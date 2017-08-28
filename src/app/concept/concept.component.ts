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
    在台大晚餐有個特別的氛圍
    沒有任何活動安排，大家卻會幾人一圈、自然而然地聊起來
    看到這幅景象相當令人感動
    一次活動，竟能匯集這麼多素昧平生的人，暢聊一晚
    「如果世界能多一點這種連結，會更美好吧。」
    我們堅定相信著
    未來，也會一點一點、持續創造人與人之間，這種無可取代的溫熱連結
    這是台大晚餐的目標，也是唯一存在的意義。
    `;
  }

}
