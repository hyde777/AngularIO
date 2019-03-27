import { Component } from '@angular/core';
import { Battle } from './lib/Battle';
import { Pokemon } from './lib/Pokemon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Battle Arena';
  urlImgBackground = 'assets/img/Battle_Arena.png';

  backPokemon: Pokemon;
  frontPokemon: Pokemon;

  backPokemonUrlImg = 'https://play.pokemonshowdown.com/sprites/smicons-pokeball-sheet.png';
  frontPokemonUrlImg = 'https://play.pokemonshowdown.com/sprites/smicons-pokeball-sheet.png';

  battle: Battle;
  constructor () {
    this.backPokemon = new Pokemon('carapuce', 5);
    this.backPokemon.withAttackStat(10).withDefensiveStat(10)
        .withLifePoint(30).withMaxLifePoint(30).withMoveBasePower(10);


    this.frontPokemon = new Pokemon('bulbizarre', 5);
    this.frontPokemon.withAttackStat(7).withDefensiveStat(12)
        .withLifePoint(30).withMaxLifePoint(30).withMoveBasePower(10);

    this.battle = new Battle();
    this.battle.FightUntilKo(this.frontPokemon, this.backPokemon);
  }
}
