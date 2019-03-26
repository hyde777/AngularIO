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
            this.rounds.push(new Round(fastPoke, slowPoke));
            const attackerPhase = this.rounds[this.currentRound];
            attackerPhase.Fight();
            let isKoAttac : boolean = attackerPhase.defendingPokeIsKo;
            if(isKoAttac) {
                this.winner = attackerPhase.attackingPokemon;
                this.loser = attackerPhase.defendingPokemon;
                this.endOfBattle = true;
                return;
            }

            this.rounds.push(new Round(slowPoke, fastPoke));
            const defenderPhase = this.rounds[this.currentRound];
            defenderPhase.Fight();
            let isKoDefending = defenderPhase.defendingPokeIsKo;
            if(isKoDefending){
                this.winner = defenderPhase.attackingPokemon;
                this.loser = defenderPhase.defendingPokemon;
                this.endOfBattle = true;
                return;
            }
        }
    }
}