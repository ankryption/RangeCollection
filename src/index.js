import {
	Range,
	List
} from 'immutable';

/**
 * RangeCollection class
 */
class RangeCollection {

	constructor() {
		this._ranges = List();
	}

	get ranges() {
		return this._ranges;
	}

	static _fortify(range) {
		const isInt = Number.isInteger;

		if (range && range.length === 2 && isInt(range[0]) && isInt(range[1]) && range[0] <= range[1]) {
			return Range(...range);
		} else {
			console.log(`error: RangeCollection - INVALID INPUT - expects [int, int], equals [${[...range]}]`);
		}
	}

	/**
	 * Adds a range to the collection
	 * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
	 */
	add(range) {
		let input = RangeCollection._fortify(range);

		if (!input || !input.size) return;

		let index;
		let ranges = List([input]);

		this.ranges.forEach((current) => {
			if (input.first() - 1 > current.last()) {
				ranges = ranges.insert(ranges.indexOf(input), current);
				return;
			}

			if (input.last() < current.first()) {
				ranges = ranges.push(current);
				return;
			}

			index = ranges.indexOf(input);

			input = Range(
				Math.min(input.first(), current.first()),
				Math.max(input.last(), current.last()) + 1
			);

			ranges = ranges.set(index, input);
		});

		this._ranges = ranges;

		return this;
	}

	/**
	 * Removes a range from the collection
	 * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
	 */
	remove() {
		// TODO: implement this
	}

	/**
	 * Prints out the list of ranges in the range collection
	 */
	print() {
		console.log(`${this}`);
	}

	/**
	 * Reduces the ranges in the list into a string
	 */
	toString() {
		return this.ranges.reduce((string, range) => `${string}${string ? ' ' : ''}[${range.first()}, ${range.last() + 1})`, '');
	}
}

export default RangeCollection;