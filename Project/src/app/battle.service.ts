import { Injectable, OnInit } from '@angular/core';
import {Round} from './lib/Round';
import {Pokemon} from './lib/Pokemon';
import { Observable, interval, ObservableInput, from, combineLatest, forkJoin } from 'rxjs';
import { PokemonService } from './pokemon.service';
import { mergeMap } from 'rxjs/operators';

@Injectable()
export class BattleService{

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
  backPokemonUrlImg = 'https://play.pokemonshowdown.com/sprites/xyani-back/ambipom.gif';
  frontPokemonUrlImg = 'https://play.pokemonshowdown.com/sprites/xyani/pikachu.gif';
  constructor(private pokeService: PokemonService) {
    let frontOb =this.pokeService.getPokemon('https://pokeapi.co/api/v2/pokemon/1/')
      .pipe(mergeMap(poke => {
        this.backPokemon = poke;
        this.backPokemonRatio = BattleService.GetPokemonRatio(this.backPokemon);
        return this.pokeService.getPokemon('https://pokeapi.co/api/v2/pokemon/4/');
      })).subscribe(poke => {
        this.frontPokemon = poke;
        this.frontPokemonRatio = BattleService.GetPokemonRatio(this.frontPokemon);
        if (this.backPokemon.isFasterThan(this.frontPokemon)) {
          this.fastPoke = this.backPokemon;
          this.slowPoke = this.frontPokemon;
        } else {
          this.fastPoke = this.frontPokemon;
          this.slowPoke = this.backPokemon;
        }
        this.backPokemonUrlImg = 'https://play.pokemonshowdown.com/sprites/xyani-back/'+ this.backPokemon.name+'.gif';
        this.frontPokemonUrlImg = 'https://play.pokemonshowdown.com/sprites/xyani/' + this.frontPokemon.name + '.gif';
      });

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
