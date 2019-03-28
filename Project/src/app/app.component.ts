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
  frontPokemonRatio: number;
  backPokemonRatio: number;

  urlImgBackground = 'assets/img/Battle_Arena.png';
  backPokemonUrlImg = 'https://play.pokemonshowdown.com/sprites/xyani-back/ambipom.gif';
  frontPokemonUrlImg = 'https://play.pokemonshowdown.com/sprites/xyani/pikachu.gif';

  constructor(public battleService: BattleService) {}

  ngOnInit(): void {
    console.log(this.battleService)
    this.frontPokemonRatio = this.battleService.GetPokemonRatio(this.battleService.frontPokemon);
    this.backPokemonRatio = this.battleService.GetPokemonRatio(this.battleService.backPokemon);
  }

  onPause() {
    this.pause = !this.pause;
    if(this.pause)
    {
      clearInterval(this.battleService.interval);
      this.frontPokemonRatio = this.battleService.GetPokemonRatio(this.battleService.frontPokemon);
      this.backPokemonRatio = this.battleService.GetPokemonRatio(this.battleService.backPokemon);
      this.pauseTxt = 'PLAY';
    }
    else
    {
      this.battleService.FightUntilKo(this.frontPokemonRatio, this.backPokemonRatio)
      this.pauseTxt = 'PAUSE';
    }
  }
}
