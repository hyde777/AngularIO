import { Component, OnInit } from '@angular/core';
import { BattleService } from './battle.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Battle Arena';

  pause:boolean = true;
  pauseTxt: 'PAUSE' | 'PLAY' = 'PLAY';

  backPokemonUrlImg = 'https://play.pokemonshowdown.com/sprites/xyani-back/ambipom.gif';
  frontPokemonUrlImg = 'https://play.pokemonshowdown.com/sprites/xyani/pikachu.gif';
  urlImgBackground = 'assets/img/Battle_Arena.png';

  constructor(public battleService: BattleService) {}

  ngOnInit(): void {

  }

  onPause() {
    this.pause = !this.pause;
    if(this.pause) 
    {
      this.battleService.HandlePause();
      this.pauseTxt = 'PLAY';
    }
    else
    {
      this.battleService.FightUntilKo()
      this.pauseTxt = 'PAUSE';
    }
  }
}
