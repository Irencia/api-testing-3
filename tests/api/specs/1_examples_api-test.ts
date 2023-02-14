import { expect } from "chai";

xdescribe(`Some basic examples`, () => {
    before(`Add a message before tests`, async () => {
        console.log(`Just a few basic examples:`);
    });

    it(`test #1 - check that true equals true`, async () => {
        expect(true).to.be.equal(true);
    });

    it(`test #2`, async () => {
        console.log(`it's a test #1 without any check :)`);
    });

    it(`test #3 - check the length of the string`, async () => {
        let testString: string = `Hello`;
        expect(testString.length, `The string length must = 5`).to.be.equal(5);
    });

    it(`test #4 - check the sum of two numbers`, async () => {
        let num1 = 2,
            num2 = 2;

        let sum = 5;

        expect(sum).to.be.equal(4, `The sum is incorrect`);
    });
});
