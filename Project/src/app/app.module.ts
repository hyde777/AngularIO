import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { BattleService } from './battle.service';
import { BattleLogComponent } from './battle-log/battle-log.component';

@NgModule({
  declarations: [
    AppComponent,
    ProgressBarComponent,
    BattleLogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    BattleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
