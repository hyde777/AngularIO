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
  backPokemonRatio: number;
  frontPokemon: Pokemon;
  frontPokemonRatio: number;

  pause = true;
  pauseTxt: 'PAUSE' | 'PLAY' = 'PLAY';
  frontPokemonStatusBar: 'success' | 'warning' | 'danger' = 'success';
  backPokemonStatusBar: 'success' | 'warning' | 'danger' = 'success';
  battle: Battle;
  interval: any;

  backPokemonUrlImg = 'https://play.pokemonshowdown.com/sprites/xyani-back/ambipom.gif';
  frontPokemonUrlImg = 'https://play.pokemonshowdown.com/sprites/xyani/pikachu.gif';

  constructor() {
    this.backPokemon = new Pokemon('carapuce', 5);
    this.backPokemon.withAttackStat(10).withDefensiveStat(10)
        .withLifePoint(30).withMaxLifePoint(30).withMoveBasePower(10);
    this.backPokemonRatio = this.backPokemon.lifepoint / this.backPokemon.maxLifepoint * 100;

    this.frontPokemon = new Pokemon('bulbizarre', 5);
    this.frontPokemon.withAttackStat(7).withDefensiveStat(12)
        .withLifePoint(30).withMaxLifePoint(30).withMoveBasePower(10);
    this.frontPokemonRatio = Math.floor(this.frontPokemon.lifepoint / this.frontPokemon.maxLifepoint) * 100;

    this.backPokemonStatusBar = this.GetColorLifeStatus(this.backPokemonRatio);
    this.frontPokemonStatusBar = this.GetColorLifeStatus(this.frontPokemonRatio);

    this.battle = new Battle(this.frontPokemon, this.backPokemon);
  }

  onPause() {
    this.pause = !this.pause;
    if (this.pause) {
      clearInterval(this.interval);
      this.backPokemonRatio = Math.floor(this.backPokemon.lifepoint / this.backPokemon.maxLifepoint * 100);
      this.frontPokemonRatio = Math.floor(this.frontPokemon.lifepoint / this.frontPokemon.maxLifepoint * 100);

      this.backPokemonStatusBar = this.GetColorLifeStatus(this.backPokemonRatio);
      this.frontPokemonStatusBar = this.GetColorLifeStatus(this.frontPokemonRatio);

      this.pauseTxt = 'PLAY';
    }
    else
    {
      this.FightUntilKo();
      this.pauseTxt = 'PAUSE';
    }
  }

  FightUntilKo() {
    const cbFast = () => {
      this.battle.FightFaster();
      this.backPokemonRatio = Math.floor(this.backPokemon.lifepoint / this.backPokemon.maxLifepoint * 100);
      this.backPokemonStatusBar = this.GetColorLifeStatus(this.backPokemonRatio);

      clearInterval(this.interval);

      this.interval = setInterval(() => {
        this.battle.FightSlower();
        this.frontPokemonRatio = Math.floor(this.frontPokemon.lifepoint / this.frontPokemon.maxLifepoint * 100);
        this.frontPokemonStatusBar = this.GetColorLifeStatus(this.frontPokemonRatio);
        clearInterval(this.interval);

        this.interval = setInterval(cbFast, 1000);
      }, 1000);
    };

    this.interval = setInterval(cbFast, 1000);
  }

  GetColorLifeStatus(lifePercent: number) {
    let statusColor: 'success' | 'warning' | 'danger' = 'success';
    if (lifePercent <= 25) {
      statusColor = 'danger';
    } else if (lifePercent <= 50) {
      statusColor = 'warning';
    }
    return statusColor;
  }
}
