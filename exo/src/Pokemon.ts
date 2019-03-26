//fetch("https://pokeapi.co/api/v2/pokemon1")

export class Pokemon {
    public attackStat: number;
    public defensiveStat: number;
    public lifepoint: number;
    public moveBasePower: number;
    public speed: number;

    constructor(public name: string, 
                public level: number)
    {
        this.name = name;
        this.level = level;
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

    withMoveBasePower(moveBasePower: number) : Pokemon {
        this.moveBasePower = moveBasePower;
        return this;
    }

    isFasterThan(poke: Pokemon) {
        return this.speed > poke.speed ? true : false;
    }
}

let carapuce = new Pokemon("carapuce", 5).withSpeed(60);
console.log(carapuce.speed);