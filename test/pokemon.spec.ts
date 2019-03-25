import {Pokemon} from '../src/Pokemon';

describe('pokemon', () => {
    it("should be faster thant the other", () => {
        let carapuce = new Pokemon("carapuce", 60);
        let bulbizarre = new Pokemon("bulbizarre", 40);
        expect(carapuce.isFasterThan(bulbizarre)).toBe(true);
    })
})