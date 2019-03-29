import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Pokemon} from './lib/Pokemon';
import {PokemonRaw} from './lib/PokemonRaw';
import { map } from 'rxjs/operators';

@Injectable()
export class PokemonService {
  constructor(private http: HttpClient) { }

  getPokemon(url : string): Observable<Pokemon> {
    return this.http.get<PokemonRaw>(url)
      .pipe(map(rawpoke => {
        console.log(rawpoke.stats.find(x => x.stat.name === 'defense').base_stat);
        return new Pokemon(rawpoke.name, 
                    5,
                    rawpoke.stats.find(x => x.stat.name === 'attack').base_stat,
                    rawpoke.stats.find(x => x.stat.name === 'defense').base_stat,
                    rawpoke.stats.find(x => x.stat.name === 'hp').base_stat,
                    rawpoke.stats.find(x => x.stat.name === 'hp').base_stat,
                    rawpoke.stats.find(x => x.stat.name === 'attack').base_stat * 2,
                    rawpoke.stats.find(x => x.stat.name === 'speed').base_stat
                    )}
        ));
  }
}
