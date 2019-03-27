import {Pokemon} from './Pokemon';

describe('pokemon', () => {
    it("should be faster thant the other", () => {
        let carapuce = new Pokemon("carapuce", 5);
        carapuce.withSpeed(60);
        let bulbizarre = new Pokemon("bulbizarre", 5);
        bulbizarre.withSpeed(40);
        expect(carapuce.isFasterThan(bulbizarre)).toBe(true);
    })
})