import {PokemonService} from './pokemon.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  title = 'Battle Arena';

  displayedData: any[];
  constructor(public contactService: PokemonService) {
    //contactService.getPokemons().subscribe(pokemons => {
    //  this.displayedData = pokemons;
    //});
  }
}
