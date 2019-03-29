import {Component, Input} from '@angular/core';
import {Round} from '../lib/Round';
import {BattleService} from '../battle.service';

@Component({
  selector: 'app-battle-log',
  templateUrl: './battle-log.component.html',
  styleUrls: ['./battle-log.component.css']
})
export class BattleLogComponent {

  constructor(private battleService: BattleService) {
  }

}
