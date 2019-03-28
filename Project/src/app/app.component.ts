import { Component, OnInit } from '@angular/core';
import { BattleService } from './battle.service';
import { filter, mergeMap, debounce, delay, map } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Battle Arena';

  pause:boolean = true;
  pauseTxt: 'PAUSE' | 'PLAY' = 'PLAY';

  backPokemonUrlImg = 'https://play.pokemonshowdown.com/sprites/xyani-back/ambipom.gif';
  frontPokemonUrlImg = 'https://play.pokemonshowdown.com/sprites/xyani/pikachu.gif';
  urlImgBackground = 'assets/img/Battle_Arena.png';
  subscribe: Subscription;

  constructor(public battleService: BattleService) {
  }

  onPause() {
    this.pause = !this.pause;
    if(this.pause) 
    {
      this.subscribe.unsubscribe();
      this.pauseTxt = 'PLAY';
    }
    else
    {
      this.subscribe = this.battleService.InitBattle()
      .pipe(
        filter(() => !this.pause),
        map(() => this.battleService.HandleAttack()))
      .subscribe(
        next => console.log(next),
        error => console.error(error));
       this.pauseTxt = 'PAUSE';
    }
  }
}
