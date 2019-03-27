import {Pokemon} from './Pokemon';
import {Round} from './Round';

describe('round', () => {
    it("defending pokemon should be lose lifepoint when attacked in a round", () => {
        // Given
        let carapuce = new Pokemon("carapuce", 5);
        carapuce.withAttackStat(10).withDefensiveStat(10)
            .withLifePoint(30).withMaxLifePoint(30).withMoveBasePower(10);
        let bulbizarre = new Pokemon("bulbizarre", 5);
        bulbizarre.withAttackStat(7).withDefensiveStat(12)
            .withLifePoint(30).withMaxLifePoint(30).withMoveBasePower(10);

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

    it("attacking pokemon should not kill defending pokemon", () => {

        // Given
        let carapuce = new Pokemon("carapuce", 5);
        carapuce.withAttackStat(10).withDefensiveStat(10)
            .withLifePoint(30).withMoveBasePower(10);
        let magicarpe = new Pokemon("magicarpe", 1);
        magicarpe.withAttackStat(1).withDefensiveStat(1)
            .withLifePoint(1).withMoveBasePower(1);

        // When
        let round1 = new Round(carapuce, magicarpe);
        round1.Fight();

        console.log(`${round1.attackingPokemon.name} deal ${round1.damage}`)
        console.log(`${round1.defendingPokemon.name} have ${round1.defendingPokemon.lifepoint}`)
        // Then
        expect(round1.defendingPokemon.lifepoint).toBeLessThan(0);
        expect(round1.defendingPokeIsKo).toBeTruthy();
    })
})