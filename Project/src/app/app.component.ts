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

  backPokemon : Pokemon;
  frontPokemon : Pokemon;

  battle: Battle;
  constructor () {
    this.backPokemon = new Pokemon("carapuce", 5);
    this.backPokemon.withAttackStat(10).withDefensiveStat(10)
        .withLifePoint(30).withMaxLifePoint(30).withMoveBasePower(10);

    this.frontPokemon = new Pokemon("bulbizarre", 5);
    this.frontPokemon.withAttackStat(7).withDefensiveStat(12)
        .withLifePoint(30).withMaxLifePoint(30).withMoveBasePower(10);

    this.battle = new Battle();
    this.battle.FightUntilKo(this.frontPokemon, this.backPokemon);
  }
}
