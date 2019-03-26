// https://www.dragonflycave.com/mechanics/battle#turnorder

import {Pokemon} from "./Pokemon"

export class Round {
    damage: number = 0;
    defendingPokeIsKo: boolean = false;
    constructor(public attackingPokemon: Pokemon, public defendingPokemon: Pokemon){
        this.attackingPokemon = attackingPokemon;
        this.defendingPokemon = defendingPokemon;
    }

    private calculateDamage(): number {
        let rstfloor = Math.floor(2 * this.attackingPokemon.level / 5 + 2);
        let scdFloor = Math.floor(rstfloor * this.attackingPokemon.attackStat * this.attackingPokemon.moveBasePower / this.defendingPokemon.defensiveStat);
        let rdFloor = Math.floor(scdFloor / 50);
        return rdFloor + 2;
    }
    
    private applyDamage(): void {
        this.damage = this.calculateDamage();
        this.defendingPokemon.lifepoint = this.defendingPokemon.lifepoint - this.damage;
    }

    Fight(): void {
        this.applyDamage();
        if(this.defendingPokemon.lifepoint <= 0)
            this.defendingPokeIsKo = true;
    }
}