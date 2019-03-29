import { Component } from '@angular/core';
import { BattleService } from './battle.service';
import { filter, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import {Round} from "./lib/Round";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  title = 'Battle Arena';

  pause = true;
  pauseTxt: 'PAUSE' | 'PLAY' = 'PLAY';

  backPokemonUrlImg = 'https://play.pokemonshowdown.com/sprites/xyani-back/ambipom.gif';
  frontPokemonUrlImg = 'https://play.pokemonshowdown.com/sprites/xyani/pikachu.gif';
  urlImgBackground = 'assets/img/Battle_Arena.png';
  subscribe: Subscription;
  roundLog: Round[];
  pokemonNameKo: string;

  constructor(public battleService: BattleService) {
    this.roundLog = this.battleService.rounds;
    this.pokemonNameKo = !this.battleService.endOfBattle ? 'test' : 'Le perdant est : ' + this.battleService.loser.name;
    console.log(this.pokemonNameKo);
  }

  onPause() {
    this.pause = !this.pause;
    if (this.pause) {
      this.subscribe.unsubscribe();
      this.pauseTxt = 'PLAY';
    } else {
      this.subscribe = this.battleService.InitBattle()
      .pipe(
        filter(() => !this.pause),
        filter(() => !this.battleService.endOfBattle),
        map(() => this.battleService.HandleAttack()))
      .subscribe(
        next => console.log(next),
        error => console.error(error));
      this.pauseTxt = 'PAUSE';
    }


  }
}
