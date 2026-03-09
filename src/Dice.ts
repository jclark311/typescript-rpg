import { utils } from "./utils/Utils";

/**
 * Refactor so Dice can be constructed with
 * new Dice("1d6 1d8+10")
 */

export default class Dice {
    // Number of rolls: the 2 in 2D6
    count: number;
    // Number of sides of die used: the 6 in 2D6
    sides: number;
    // Bonus modifiers to apply to roll
    bonus: number;

    constructor(sides: number, count?: number, bonus?: number) {
        this.count = count || 1;
        this.sides = sides;
        this.bonus = bonus || 0;
    }

    parse() {
        const diceString = "1d6";
        const search = "d";
        const plusModifier = "+";
        const minusModifier = "-";
        const splitIndex = diceString.indexOf(search);
        const firstDieIndex = diceString.indexOf(search);
        // console.log("Dice Sides: ", diceString.slice(splitIndex+1, diceString.length))
        // console.log("Dice Rolls: ", diceString.slice(0, 1))
    }

    roll() {
        let min = 1;
        let max = Math.floor(this.sides);
        let result = this.bonus;
        for (let i = 0; i < this.count; i++) {
            result += Math.floor(Math.random() * (max - min + 1) + min)
        }
        return result;
    }

    // TODO: Account for smallest number appearing multiple times in array
    // Must keep one if multiple
    removeSmallest(rollsArray: number[]) {
        // console.log("Rolls array begin: ", rollsArray)
        let smallest = Infinity;
        for (let roll of rollsArray) {
            if (roll < smallest) smallest = roll;
            // console.log("smallest: ", smallest)
        }

        let newArray = rollsArray.filter(num => num !== smallest);
        // console.log("Smallest array: ", newArray)

        return newArray;
        // let smallestNumberKey = 0;
        // for (let i = 0; i < rollsArray.length; i++) {
        //     if (rollsArray[i + 1] < rollsArray[i]) {
        //         smallestNumberKey = i + 1;
        //         rollsArray.splice(smallestNumberKey, 1);
        //         console.log("Smallest: ", smallestNumberKey, "Array: ", rollsArray)
        //     }
        // }
        // return rollsArray;
    }

    removeLargest(rollsArray: number[]) {
        // console.log("Rolls array begin: ", rollsArray)
        let largest = -Infinity;
        for (let roll of rollsArray) {
            if (roll > largest) largest = roll;
            // console.log("Largest: ", largest)
        }

        let newArray = rollsArray.filter(num => num !== largest);
        // console.log("Largest array: ", newArray)

        return newArray;
    }

    addResults(rollsArray: number[]) {
        let result = 0;
        for (let roll of rollsArray) {
            result += roll;
            // console.log("Roll to add: ", roll)
        }
        // console.log("Result: ", result)
        return result;
    }

    advantageRoll() {
        let advRoll = this.count + 1;
        let rolls: number[] = [];
        let currentRoll = 0;
        let min = 1;
        let max = Math.floor(this.sides);
        let result = this.bonus;
        for (let i = 0; i <= advRoll; i++) {
            currentRoll = Math.floor(Math.random() * (max - min + 1) + min)
            rolls.push(currentRoll);
        }

        let filteredArray = this.removeSmallest(rolls);
        this.addResults(filteredArray);
        // return result;
    }

    disadvantageRoll() {
        let advRoll = this.count + 1;
        let rolls: number[] = [];
        let currentRoll = 0;
        let min = 1;
        let max = Math.floor(this.sides);
        let result = this.bonus;
        for (let i = 0; i <= advRoll; i++) {
            currentRoll = Math.floor(Math.random() * (max - min + 1) + min)
            rolls.push(currentRoll);
        }

        let filteredArray = this.removeLargest(rolls);
        this.addResults(filteredArray);
    }

    static create(dieString: string) {
        const search = "d";
        const plusModifier = "+";
        const hasPlusModifier = dieString.includes(plusModifier);
        const minusModifier = "-";
        const hasMinusModifier = dieString.includes(minusModifier);
        let modifier;
        let modifierIndex;

        if (hasPlusModifier) modifierIndex = dieString.indexOf(plusModifier);
        if (hasMinusModifier) modifierIndex = dieString.indexOf(minusModifier);

        modifier = Number(dieString.slice(modifierIndex!+1, modifierIndex!+2));
        console.log("Dice Modifier: ", modifier)

        const splitIndex = dieString.indexOf(search);
        const firstDieIndex = dieString.indexOf(search);

        let sides;
        modifier === 0 ? sides = Number(dieString.slice(splitIndex+1, dieString.length)) : sides = Number(dieString.slice(splitIndex+1, dieString.length-2));
        let rolls = Number(dieString.slice(0, 1));

        console.log("Dice Sides: ", sides)
        console.log("Dice Rolls: ", rolls)

        let min = 1;
        let max = Math.floor(sides);
        let result = modifier || 0;
        for (let i = 0; i < rolls; i++) {
            result += Math.floor(Math.random() * (max - min + 1) + min)
        }

        return result;
    }

    /**
     * 
     * @param rolls number of times to roll
     * @param faces number of sides for the die
     * @param modifier bonus or penalty modifier
     */
    static rollDie(rolls: number, faces: number, modifier?: number) {
        let min = 1;
        let max = Math.floor(faces);
        let result = modifier || 0;
        for (let i = 0; i < rolls; i++) {
            result += Math.floor(Math.random() * (max - min + 1) + min)
        }
        return result;
    }
}

export class Roll {
	static dice: any;

	// Number of rolls: the 2 in 2D6
    count: number;
    // Number of sides of die used: the 6 in 2D6
    sides: number;
    // Bonus modifiers to apply to roll
    bonus: number;

    constructor(sides: number, count?: number, bonus?: number) {
        this.count = count || 1;
        this.sides = sides;
        this.bonus = bonus || 0;
    }

	static create(diceStr: any) {
		// console.log("create() diceStr: ", diceStr)
		// console.log("create() this.parse(diceStr): ", this.parse(diceStr))
		let sides = this.parse(diceStr)[0];
		let count = this.parse(diceStr)[1];
		let bonus = this.parse(diceStr)[2];

		// console.log("create() sides: ", sides)

		this.dice = {
			sides: sides,
			count: count,
			bonus: bonus
		}
		// console.log("this.parse(diceStr)[0]: ", sides)
		// console.log("this.parse(diceStr)[1]: ", count)
		return new Roll(Number(sides), Number(count), Number(bonus));
	}

	static parse(diceStr: any) {
        const search = "d";
        const plusModifier = "+";
        const minusModifier = "-";
        const splitIndex = diceStr.indexOf(search);
        const firstDieIndex = diceStr.indexOf(search);
		let modifier;
		let sides;
		let count;
		// console.log("parse() diceStr.indexOf(plusModifier): ", diceStr.indexOf(plusModifier))
		if (diceStr.indexOf(plusModifier) !== -1) {
			// console.log("parse() Modifier found!")
			let modifierIndex = diceStr.indexOf(plusModifier);			
			sides = diceStr.slice(splitIndex+1, modifierIndex);
			count = diceStr.slice(0, 1)
			modifier = diceStr.slice(modifierIndex+1, diceStr.length)
		} else {
        	// console.log("Dice Sides: ", diceStr.slice(splitIndex+1, diceStr.length))
        	// console.log("Dice Rolls: ", diceStr.slice(0, 1))
			sides = diceStr.slice(splitIndex+1, diceStr.length);
			count = diceStr.slice(0, 1)
			modifier = 0;
		}

		return [
			sides,
			count,
			modifier
		]

		// let len = diceStr.length;
		// let index = 1;
		// let allDice = [];

		// while (index <= len) {
		// 	let die
		// 	die = this.parseDie(diceStr, index)
		// 	// table.insert(self.dice, die)
		// 	index += 1 // eat ' '
		// }
	}

	parseDie(diceStr: string, i: number) {
		let rolls = this.parseNumber(diceStr, i);

		i += 1 // Move past the 'D'

		let sides = this.parseNumber(diceStr, i);

		if (i === diceStr.length || diceStr.substring(i, i) === ' ') {
			// return { rolls, sides, 0 }, i
		}

		if (diceStr.substring(i, i) === '+') {
			i += 1; // move past the '+'
			let plus = this.parseNumber(diceStr, i);
			// return { rolls, sides, plus }, i
		}

	}

	parseNumber(str: any, index: any) {
		let isNum = {
			['0']: true,
			['1']: true,
			['2']: true,
			['3']: true,
			['4']: true,
			['5']: true,
			['6']: true,
			['7']: true,
			['8']: true,
			['9']: true
		}

		let len = str.length;
		let subStr: any[] = [];

		for (let i = index; i < len; i++) {
			let char = str.substring(i, i);

			// if (!isNum[char]) {
			// 	return tonumber(table.concat(subStr)), i
			// }

			// table.insert(subStr, char)
		}

		// return tonumber(table.concat(subStr)), len

	}

	// -- Notice this uses a '.' not a ':' meaning the function can be called
	// -- without having a class
	static Die(rolls: number, faces: number, modifier: number) {
		let total = 0;

		for (let i = 0; i < rolls; i++) {
			// total = total + Math.random(1, faces);
			total += utils.getRandomIntInclusive(1, faces)
		}
		return total + modifier;
	}

	static roll() {
		return this.Die(Number(this.dice.count), Number(this.dice.sides), Number(this.dice.bonus));
		// console.log("roll() this.dice: ", this.dice)
		// let total = 0;

		// console.log("roll() this.dice.sides: ", this.dice.sides)
		// console.log("roll() this.dice.count: ", this.dice.count)
		// console.log("roll() this.dice.bonus: ", this.dice.bonus)

		// for (let [sides, count] of Object.entries(this.dice)) {
		// 	total += this.Die(Number(sides), Number(count))
		// }

		// return total
	}
}