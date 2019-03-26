import {Round} from './Round';
import {Pokemon} from './Pokemon';

export class Battle {
    rounds: Round[];
    endOfBattle: boolean = false;
    winner: Pokemon;
    loser: Pokemon;
    constructor(){
        this.rounds = [];
    }

    FightUntilKo(poke1: Pokemon, poke2: Pokemon) : void {
        while (!this.endOfBattle)
        {
            if(poke1.isFasterThan(poke2))
            {
                this.rounds.push(new Round(poke1, poke2));
                this.rounds.push(new Round(poke2, poke1));
            }
            else
            {
                this.rounds.push(new Round(poke2, poke1));
                this.rounds.push(new Round(poke1, poke2));
            }
    
            let isKo : boolean = this.rounds[0].Fight();
            if(isKo) {
                this.winner = this.rounds[0].attackingPokemon;
                this.loser = this.rounds[0].defendingPokemon;
                return;
            }

            isKo = this.rounds[1].Fight();
            if(isKo){
                this.winner = this.rounds[1].attackingPokemon;
                this.loser = this.rounds[1].defendingPokemon;
                return;
            }
        }
    }
}