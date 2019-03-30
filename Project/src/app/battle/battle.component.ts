import { Component, OnInit } from '@angular/core';

import { BattleService } from '../battle.service';
import { filter, mergeMap, debounce, delay, map } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.css']
})
export class BattleComponent{

  pause:boolean = true;
  pauseTxt: 'PAUSE' | 'PLAY' = 'PLAY';


  urlImgBackground = 'assets/img/Battle_Arena.png';
  subscribe: Subscription;

  constructor(private battleService: BattleService, private pokeService: PokemonService) {
    

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
        filter(() => !this.battleService.endOfBattle),
        map(() => this.battleService.HandleAttack()))
      .subscribe(
        next => console.log(next),
        error => console.error(error));
       this.pauseTxt = 'PAUSE';
    }
  }

}
