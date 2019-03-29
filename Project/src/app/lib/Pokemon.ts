//fetch("https://pokeapi.co/api/v2/pokemon1")

export class Pokemon {

    constructor(public name: string, 
                public level: number,
                public attackStat: number,
                public defensiveStat: number,
                public lifepoint: number,
                public maxLifepoint: number,
                public moveBasePower: number,
                public speed: number)
    {
    }

    withSpeed(speed: number) {
        this.speed = speed;
        return this;
    }

    withAttackStat(attackStat:number): Pokemon{
        this.attackStat = attackStat;
        return this;
    }

    withDefensiveStat(defensiveStat: number): Pokemon {
        this.defensiveStat = defensiveStat;
        return this;
    }

    withLifePoint(lifepoint: number): Pokemon {
        this.lifepoint = lifepoint;
        return this;
    }

    withMaxLifePoint(maxLifepoint: number): Pokemon {
        this.maxLifepoint = maxLifepoint;
        return this;
    }

    withMoveBasePower(moveBasePower: number) : Pokemon {
        this.moveBasePower = moveBasePower;
        return this;
    }

    isFasterThan(poke: Pokemon) {
        return this.speed > poke.speed ? true : false;
    }
}