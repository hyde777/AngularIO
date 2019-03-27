import {Round} from './Round';
import {Pokemon} from './Pokemon';

export class Battle {
    currentRound: number = 0;
    rounds: Round[];
    endOfBattle: boolean = false;
    winner: Pokemon;
    loser: Pokemon;
    constructor(){
        this.rounds = [];
    }

    FightUntilKo(poke1: Pokemon, poke2: Pokemon) : void {
        let fastPoke: Pokemon;
        let slowPoke: Pokemon;
        if(poke1.isFasterThan(poke2))
        {
            fastPoke = poke1;
            slowPoke = poke2;
        }
        else
        {
            fastPoke = poke2;
            slowPoke = poke1;
        }
        
        while (!this.endOfBattle)
        {
            setTimeout(() => {}, 1000);
            this.RunRound(new Round(fastPoke, slowPoke));

            setTimeout(() => {}, 1000);
            this.RunRound(new Round(slowPoke, fastPoke));
        }
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
    }
}