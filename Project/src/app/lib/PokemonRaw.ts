export class PokemonRaw {

    public name: string; 
    public stats: AllStat[]
}

class AllStat{
    public base_stat: number;
    public effort: number;
    public stat: Stat;
}

class Stat{
    public name: string;
    public url: string;
}