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

	/**
	 * Adds a range to the collection
	 *
	 * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
	 */
	add(range) {
		let input = RangeCollection._fortify(range);

		if (!input || !input.size) return;

		let index;
		let ranges = List([input]);

		this.ranges.forEach((current) => {
			// add `current` before `input` in the collection
			if (input.first() - 1 > current.last()) {
				ranges = ranges.insert(ranges.indexOf(input), current);
				return;
			}

			// add `current` after `input` in the collection
			if (input.last() < current.first()) {
				ranges = ranges.push(current);
				return;
			}

			// if you have reached here, merge `current` with `input`
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
	 *
	 * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
	 */
	remove(range) {
		let input = RangeCollection._fortify(range);

		if (!input || !input.size) return this;

		let ranges = List();

		this.ranges.forEach((current) => {
			// remove a complete range from the collection
			if (input.isSuperset(current)) return;

			// include the first (beginning) part of an existing range in the collection
			if (current.includes(input.first()) && input.first() - current.first()) {
				ranges = ranges.push(current.take(input.first() - current.first()));
			}

			// exclude the first (beginning) part of an existing range in the collection
			if (current.includes(input.last()) && (input.last() + 1) - current.first() < current.size) {
				ranges = ranges.push(current.skip((input.last() + 1) - current.first()));
			}

			// return if the overlaps has been taken care
			if (current.includes(input.first()) || current.includes(input.last())) return;

			// if you have reached here, add this range in the collection
			ranges = ranges.push(current);
		});

		this._ranges = ranges;

		return this;
	}

	/**
	 * Prints out the list of ranges in the range collection
	 */
	print() {
		console.log(`${this}`);
	}

	/**
	 * Get list of the ranges in the collection
	 */
	get ranges() {
		return this._ranges;
	}

	/**
	 * Overriding the default toString method
	 * Reduces the ranges from `this._ranges` into a string
	 */
	toString() {
		return this.ranges.reduce((string, range) => `${string}${string ? ' ' : ''}[${range.first()}, ${range.last() + 1})`, '');
	}

	/**
	 * Fortifies the given input range
	 * Prints an error in console if an invalid range is given in the arguments
	 *
	 * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
	 */
	static _fortify(range) {
		const isInt = Number.isInteger;

		if (range && range.length === 2 && isInt(range[0]) && isInt(range[1]) && range[0] <= range[1]) {
			return Range(...range);
		} else {
			console.log(`error: RangeCollection - INVALID INPUT - expects [int, int], equals [${[...range]}]`);
		}
	}
}

export default RangeCollection;