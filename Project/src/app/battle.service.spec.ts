import { TestBed } from '@angular/core/testing';
import { Pokemon } from './lib/Pokemon';
import { BattleService } from './battle.service';
jest.useFakeTimers();


describe('BattleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BattleService = TestBed.get(BattleService);
    expect(service).toBeTruthy();
  });

  it("A pokemon should be ko", () => {
    // Given
    let carapuce = new Pokemon("carapuce", 5, 0, 0, 0, 0 ,0 ,0);
    carapuce.withAttackStat(10).withDefensiveStat(10)
        .withLifePoint(30).withMaxLifePoint(30).withMoveBasePower(10);
    let bulbizarre = new Pokemon("magicarpe", 2, 0, 0, 0, 0, 0, 0);
    bulbizarre.withAttackStat(1).withDefensiveStat(1)
        .withLifePoint(15).withLifePoint(15).withMoveBasePower(2);

    // When
    let battle : BattleService = new BattleService();
    battle.HandleAttack();
    //Then
    expect(battle.winner.name).toBe("carapuce");
    expect(battle.loser.name).toBe("magicarpe");
    expect(battle.loser.lifepoint).toBe(0);
  })
});