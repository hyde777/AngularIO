import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Battle Arena';

  backPokemonCurrentLife = 0;
  backPokemonTotalLife = 0;
  backPokemonName = 'backPokemonName';

  frontPokemonCurrentLife = 0;
  frontPokemonTotalLife = 0;
  frontPokemonName = 'frontPokemonName';

}
