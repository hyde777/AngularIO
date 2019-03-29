import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Pokemon} from './lib/Pokemon';

@Injectable()
export class PokemonService {
  constructor(private http: HttpClient) { }

  getPokemons(): Observable<any> {
    return this.http.get<Pokemon[]>('https://pokeapi.co/api/v2/pokemon/ditto/');
  }
}
