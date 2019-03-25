import {Pokemon} from '../src/Pokemon';
import {Round} from '../src/Round';

describe('round', () => {
    it("defending pokemon should be lose lifepoint when attacked in a round", () => {

        // Given
        let carapuce = new Pokemon("carapuce", 5);
        carapuce.withAttackStat(10).withDefensiveStat(10)
            .withLifePoint(30).withMoveBasePower(10);
        let bulbizarre = new Pokemon("bulbizarre", 5);
        bulbizarre.withAttackStat(7).withDefensiveStat(12)
            .withLifePoint(30).withMoveBasePower(10);

        // When
        let round1 = new Round(carapuce, bulbizarre);
        round1.Fight();

        // Then
        expect(bulbizarre.lifepoint).toBeLessThan(30);
    })

    it("attacking pokemon should not lose lifepoint in a round", () => {

        // Given
        let carapuce = new Pokemon("carapuce", 5);
        carapuce.withAttackStat(10).withDefensiveStat(10)
            .withLifePoint(30).withMoveBasePower(10);
        let bulbizarre = new Pokemon("bulbizarre", 5);
        bulbizarre.withAttackStat(7).withDefensiveStat(12)
            .withLifePoint(30).withMoveBasePower(10);

        // When
        let round1 = new Round(carapuce, bulbizarre);
        round1.Fight();

        // Then
        expect(carapuce.lifepoint).toBe(30);
    })
})