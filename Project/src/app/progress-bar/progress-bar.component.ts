import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent implements OnInit {
  @Input() percentLife: number;
  @Input() status = 'success';//  @Input() status = 'success';



  constructor() { }

  ngOnInit() {
  }

}
