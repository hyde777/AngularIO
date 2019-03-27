import {Round} from './Round';
import {Pokemon} from './Pokemon';

export class Battle {
    currentRound: number = 0;
    rounds: Round[];
    endOfBattle: boolean = false;
    winner: Pokemon;
    loser: Pokemon;
    slowPoke: Pokemon;
    fastPoke: Pokemon;

    constructor(poke1: Pokemon, poke2: Pokemon){
        this.rounds = [];
        if(poke1.isFasterThan(poke2))
        {
            this.fastPoke = poke1;
            this.slowPoke = poke2;
        }
        else
        {
            this.fastPoke = poke2;
            this.slowPoke = poke1;
        }
        
    }

    FightUntilKo() : void {
        this.RunRound(new Round(this.fastPoke, this.slowPoke));
        this.RunRound(new Round(this.slowPoke, this.fastPoke));
    }

    RunRound(round: Round) {
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
}