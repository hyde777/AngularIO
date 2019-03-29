import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent {
  @Input() percentLife: number;
  @Input() statusBar: 'success' | 'warning' | 'danger';

  constructor() { }

}
