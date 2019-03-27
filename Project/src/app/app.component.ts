import { Component } from '@angular/core';
import { Battle } from './lib/Battle';
import { Pokemon } from './lib/Pokemon';
import { interval } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Battle Arena';
  urlImgBackground = 'assets/img/Battle_Arena.png';

  backPokemon : Pokemon;
  frontPokemon : Pokemon;
  pause:boolean = true;
  pauseTxt: string ="PLAY";
  battle: Battle;
  interval: any;

  backPokemonUrlImg = 'https://play.pokemonshowdown.com/sprites/xyani-back/ambipom.gif'; // 'https://play.pokemonshowdown.com/sprites/smicons-pokeball-sheet.png';
  frontPokemonUrlImg = 'https://play.pokemonshowdown.com/sprites/xyani/pikachu.gif'; // 'https://play.pokemonshowdown.com/sprites/smicons-pokeball-sheet.png';

  constructor() {
    this.backPokemon = new Pokemon('carapuce', 5);
    this.backPokemon.withAttackStat(10).withDefensiveStat(10)
        .withLifePoint(30).withMaxLifePoint(30).withMoveBasePower(10);


    this.frontPokemon = new Pokemon('bulbizarre', 5);
    this.frontPokemon.withAttackStat(7).withDefensiveStat(12)
        .withLifePoint(30).withMaxLifePoint(30).withMoveBasePower(10);

    this.battle = new Battle(this.frontPokemon, this.backPokemon);
    
  }

  onPause() {
    if(this.pause)
    {
      clearInterval(this.interval);
      this.pauseTxt = "PLAY";
    }
    else
    {
      this.interval = setInterval(() => this.battle.FightUntilKo(), 2000);
      this.pauseTxt = "PAUSE";
    }
    this.pause = !this.pause;
  }
}
