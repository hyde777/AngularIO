import {Battle} from './Battle';
import { Pokemon } from './Pokemon';
jest.useFakeTimers();

describe('battle', () => {
    it("A pokemon should be ko", () => {
        // Given
        let carapuce = new Pokemon("carapuce", 5);
        carapuce.withAttackStat(10).withDefensiveStat(10)
            .withLifePoint(30).withMaxLifePoint(30).withMoveBasePower(10);
        let bulbizarre = new Pokemon("magicarpe", 2);
        bulbizarre.withAttackStat(1).withDefensiveStat(1)
            .withLifePoint(15).withLifePoint(15).withMoveBasePower(2);

        let battle : Battle = new Battle();
        battle.FightUntilKo(bulbizarre, carapuce);
        battle.rounds.map((r, i) => {
            console.log(`Round ${i}
                ${r.attackingPokemon.name} deal ${r.damage} damage 
                ${r.defendingPokemon.name} have ${r.defendingPokemon.lifepoint} lifepoint
                ${r.defendingPokemon.name} ${r.defendingPokeIsKo ? 'is Ko' : 'is not Ko'}`);
        })
        
        expect(battle.winner.name).toBe("carapuce");
        expect(battle.loser.name).toBe("magicarpe");
        expect(setTimeout).toBeCalledTimes(2);
        expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
    })
})