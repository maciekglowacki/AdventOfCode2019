const util = require("util");

let numbers = [];

for (let i = 246515; i <= 739105; i += 1) {
	numbers.push(i);
}

function twoAdjacentDigitsDeclarative(numbers) {
	let approvedNumbers = [];
	for (let number of numbers) {
		number = number.toString();
		for (let i = 0; i < number.length - 1; i += 1) {
			if (number[i] === number[i + 1]) {
				approvedNumbers.push(parseInt(number));
				break;
			}
		}
	}
	return approvedNumbers;
}

function twoAdjacentDigitsFunctional(number) {
	number = number.toString();
	for (let i = 0; i < number.length - 1; i += 1) {
		if (number[i] === number[i + 1]) {
			return true;
		}
	}
	return false;
}

function increaseOrStaySameDeclarative(numbers) {
	let approvedNumbers = [];
	for (let number of numbers) {
		number = number.toString();
		let approved = true;
		for (let i = 0; i < number.length - 1; i += 1) {
			if (number[i] > number[i + 1]) {
				approved = false;
			}
		}
		if (approved) {
			approvedNumbers.push(parseInt(number));
		}
	}
	return approvedNumbers;
}

function increaseOrStaySameFunctional(number) {
	number = number.toString();
	let approved = true;
	for (let i = 0; i < number.length - 1; i += 1) {
		if (number[i] > number[i + 1]) {
			approved = false;
		}
	}
	return approved;
}

function notPartOfLargerGroup(number) {
	number = number.toString();
	let approved = false;
	let repeatingDigit = [];
	for (let i = 0; i < number.length - 2; i += 1) {
		if (
			number[i] === number[i + 1] &&
			number[i + 1] === number[i + 2] &&
			number[i] === number[i + 2] &&
			!repeatingDigit.includes(number[i])
		) {
			repeatingDigit.push(number[i]);
		}
	}
	if (repeatingDigit.length === 2) {
		return false;
	}
	for (let i = 0; i < number.length - 1; i += 1) {
		if (number[i] === number[i + 1] && number[i] !== repeatingDigit[0]) {
			approved = true;
		}
	}

	return approved;
}

let numbersFunctional = numbers
	.filter(twoAdjacentDigitsFunctional)
	.filter(increaseOrStaySameFunctional)
	.filter(notPartOfLargerGroup).length;

console.dir(numbersFunctional, { maxArrayLength: null });
