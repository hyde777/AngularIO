import { Injectable } from '@angular/core';
import {Round} from './lib/Round';
import {Pokemon} from './lib/Pokemon';
import { Observable, interval, ObservableInput } from 'rxjs';

@Injectable()
export class BattleService {

  currentRound = 0;
  rounds: Round[];
  endOfBattle = false;
  winner: Pokemon;
  loser: Pokemon;
  slowPoke: Pokemon;
  fastPoke: Pokemon;

  backPokemon: Pokemon;
  frontPokemon: Pokemon;
  frontPokemonRatio: number;
  backPokemonRatio: number;
  frontPokemonStatusBar: 'success' | 'warning' | 'danger' = 'success';
  backPokemonStatusBar: 'success' | 'warning' | 'danger' = 'success';
  fasterRound = true;

  constructor() {
    this.backPokemon = new Pokemon('carapuce', 50);
    this.backPokemon.withAttackStat(10).withDefensiveStat(10)
        .withLifePoint(30).withMaxLifePoint(30).withMoveBasePower(10);
    this.backPokemonRatio = BattleService.GetPokemonRatio(this.backPokemon);

    this.frontPokemon = new Pokemon('bulbizarre', 50);
    this.frontPokemon.withAttackStat(7).withDefensiveStat(12)
        .withLifePoint(30).withMaxLifePoint(30).withMoveBasePower(10);
    this.frontPokemonRatio = BattleService.GetPokemonRatio(this.frontPokemon);
    this.rounds = [];

    if (this.backPokemon.isFasterThan(this.frontPokemon)) {
      this.fastPoke = this.backPokemon;
      this.slowPoke = this.frontPokemon;
    } else {
      this.fastPoke = this.frontPokemon;
      this.slowPoke = this.backPokemon;
    }
    this.rounds = [];
  }

  private static GetPokemonRatio(pokemon: Pokemon) {
    return Math.floor(pokemon.lifepoint / pokemon.maxLifepoint * 100);
  }

  private FightFaster() : void {
    this.RunRound(new Round(this.fastPoke, this.slowPoke));
    this.UpdateLifeBar()
  }

  private FightSlower(): void{
    this.RunRound(new Round(this.slowPoke, this.fastPoke));
    this.UpdateLifeBar();
  }

  private RunRound(round: Round) {
    this.rounds.push(round);
    const phase = this.rounds[this.currentRound];
    phase.Fight();
    const isKoAttac: boolean = phase.defendingPokeIsKo;
    if (isKoAttac) {
        this.winner = phase.attackingPokemon;
        this.loser = phase.defendingPokemon;
        this.loser.lifepoint = 0;
        this.endOfBattle = true;
        return;
    }
    this.currentRound++;
  }

  InitBattle(): Observable<any> {
    return interval(1000);
  }

  HandleAttack() : void {
    if(this.fasterRound) {
      this.FightFaster();
      this.fasterRound = false;
    } else {
      this.FightSlower();
      this.fasterRound = true;
    }
  }

  private UpdateLifeBar() {
    this.frontPokemonRatio = BattleService.GetPokemonRatio(this.frontPokemon);
    this.backPokemonRatio = BattleService.GetPokemonRatio(this.backPokemon);
    this.frontPokemonStatusBar = this.GetColorLifeStatus(this.frontPokemonRatio);
    this.backPokemonStatusBar = this.GetColorLifeStatus(this.backPokemonRatio);
  }

  private GetColorLifeStatus(lifePercent: number) {
    let statusColor: 'success' | 'warning' | 'danger' = 'success';
    if (lifePercent <= 25) {
      statusColor = 'danger';
    } else if (lifePercent <= 50) {
      statusColor = 'warning';
    }
    return statusColor;
  }
}
