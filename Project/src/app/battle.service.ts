import { Injectable } from '@angular/core';
import {Round} from './lib/Round';
import {Pokemon} from './lib/Pokemon';

@Injectable()
export class BattleService {

  currentRound: number = 0;
  rounds: Round[];
  endOfBattle: boolean = false;
  winner: Pokemon;
  loser: Pokemon;
  slowPoke: Pokemon;
  fastPoke: Pokemon;

  backPokemon : Pokemon;
  frontPokemon : Pokemon;
  interval: any;

  constructor(){
    this.backPokemon = new Pokemon('carapuce', 5);
    this.backPokemon.withAttackStat(10).withDefensiveStat(10)
        .withLifePoint(30).withMaxLifePoint(30).withMoveBasePower(10);

    this.frontPokemon = new Pokemon('bulbizarre', 5);
    this.frontPokemon.withAttackStat(7).withDefensiveStat(12)
        .withLifePoint(30).withMaxLifePoint(30).withMoveBasePower(10);
    this.rounds = [];
    if(this.backPokemon.isFasterThan(this.frontPokemon))
    {
        this.fastPoke = this.backPokemon;
        this.slowPoke = this.frontPokemon;
    }
    else
    {
        this.fastPoke = this.frontPokemon;
        this.slowPoke = this.backPokemon;
    }
      
  }

  GetPokemonRatio(pokemon: Pokemon) {
    return Math.floor(pokemon.lifepoint / pokemon.maxLifepoint) * 100;
  }

  private FightFaster() : void {
      this.RunRound(new Round(this.fastPoke, this.slowPoke));
  }

  private FightSlower(): void {
      this.RunRound(new Round(this.slowPoke, this.fastPoke));
  }
  
  private RunRound(round: Round) {
      this.rounds.push(round);
      const phase = this.rounds[this.currentRound];
      phase.Fight();
      let isKoAttac : boolean = phase.defendingPokeIsKo;
      if(isKoAttac) {
          this.winner = phase.attackingPokemon;
          this.loser = phase.defendingPokemon;
          this.endOfBattle = true;
          return;
      }
      this.currentRound++;
  }

  FightUntilKo(frontPokemonRatio: number, backPokemonRatio: number)
  {
    let cbFast = () => {
      this.FightFaster();
      frontPokemonRatio = this.GetPokemonRatio(this.frontPokemon);
      backPokemonRatio = this.GetPokemonRatio(this.backPokemon);
      clearInterval(this.interval);

      this.interval = setInterval(() => {
        this.FightSlower();
        frontPokemonRatio = this.GetPokemonRatio(this.frontPokemon);
        backPokemonRatio = this.GetPokemonRatio(this.backPokemon);
        clearInterval(this.interval);
        this.interval = setInterval(cbFast, 1000);
      }, 1000);
    }

    this.interval = setInterval(cbFast, 1000);
  }
}
