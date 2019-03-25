//fetch("https://pokeapi.co/api/v2/pokemon1")

export class Pokemon {
    constructor(public name: string, public speed: number)
    {
        this.name = name;
        this.speed = speed;
    }

    isFasterThan(poke: Pokemon) {
        return this.speed > poke.speed ? true : false;
    }
}