import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { BattleService } from './battle.service';
import { BattleLogComponent } from './battle-log/battle-log.component';
import { BattleComponent } from './battle/battle.component';
import { Routes, RouterModule } from '@angular/router';
import {PokemonService} from "./pokemon.service";
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  { path: '', component: BattleComponent } // path: '/'
]

@NgModule({
  declarations: [
    AppComponent,
    ProgressBarComponent,
    BattleLogComponent,
    BattleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    BattleService,
    PokemonService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
