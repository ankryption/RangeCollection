import assert from 'assert';
import RangeCollection from '../src';

describe('RangeCollection', () => {
	let data;

	describe('#add()', () => {
		beforeEach(() => {
			data = new RangeCollection();
		});

		it('should start from empty range', function() {
			assert.strictEqual(data.toString(), '');
		});

		it('should NOT add an invalid range class (1)', function() {
			data.add([5, 1]);
			assert.strictEqual(data.toString(), '');
		});

		it('should NOT add an invalid range class (2)', function() {
			data.add([5]);
			assert.strictEqual(data.toString(), '');
		});

		it('should NOT add an empty range', function() {
			data.add([300, 300]);
			assert.strictEqual(data.toString(), '');
		});

		it('should NOT add a range in the middle of existing range', function() {
			data.add([40, 50]).add([45, 47]);
			assert.strictEqual(data.toString(), '[40, 50)');
		});

		it('should add in an empty collection', function() {
			data.add([10, 100]);
			assert.strictEqual(data.toString(), '[10, 100)');
		});

		it('should add in a non empty collection', function() {
			data.add([10, 100]).add([200, 300]);
			assert.strictEqual(data.toString(), '[10, 100) [200, 300)');
		});

		it('should add in correct order', function() {
			data.add([10, 100]).add([200, 300]).add([150, 170]);
			assert.strictEqual(data.toString(), '[10, 100) [150, 170) [200, 300)');
		});

		it('should add at the start of collection', function() {
			data.add([400, 500]).add([10, 100]);
			assert.strictEqual(data.toString(), '[10, 100) [400, 500)');
		});

		it('should add at the end of collection', function() {
			data.add([10, 100]).add([400, 500]);
			assert.strictEqual(data.toString(), '[10, 100) [400, 500)');
		});

		it('should extend an existing range from the beginning', function() {
			data.add([10, 100]).add([5, 15]);
			assert.strictEqual(data.toString(), '[5, 100)');
		});

		it('should extend an existing range from the end', function() {
			data.add([10, 100]).add([80, 200]);
			assert.strictEqual(data.toString(), '[10, 200)');
		});

		it('should extend an existing range from both the ends with a single input', function() {
			data.add([10, 100]).add([5, 200]);
			assert.strictEqual(data.toString(), '[5, 200)');
		});

		it('should extend an existing range from both the ends with multiple inputs', function() {
			data.add([10, 100]).add([5, 15]).add([80, 200]);
			assert.strictEqual(data.toString(), '[5, 200)');
		});

		it('should add a big range value', function() {
			data.add([10, 100]).add([10000000, 10000000000]);
			assert.strictEqual(data.toString(), '[10, 100) [10000000, 10000000000)');
		});
	});

	describe('#remove()', () => {
		beforeEach(() => {
			data = new RangeCollection();

			data.add([10, 100]).add([200, 300]);
			assert.strictEqual(data.toString(), '[10, 100) [200, 300)');
		});

		it('should NOT remove an invalid range class (1)', function() {
			data.remove([5, 1]);
			assert.strictEqual(data.toString(), '[10, 100) [200, 300)');
		});

		it('should NOT remove an invalid range class (2)', function() {
			data.remove([5]);
			assert.strictEqual(data.toString(), '[10, 100) [200, 300)');
		});

		it('should NOT remove an empty range', function() {
			data.remove([300, 300]);
			assert.strictEqual(data.toString(), '[10, 100) [200, 300)');
		});

		it('should NOT remove a non-existing range', function() {
			data.remove([150, 170]);
			assert.strictEqual(data.toString(), '[10, 100) [200, 300)');
		});

		it('should remove a complete range from the collection', function() {
			data.remove([150, 400]);
			assert.strictEqual(data.toString(), '[10, 100)');
		});

		it('should split an existing range', function() {
			data.remove([40, 50]);
			assert.strictEqual(data.toString(), '[10, 40) [50, 100) [200, 300)');
		});

		it('should remove from the beginning of an existing range', function() {
			data.remove([150, 250]);
			assert.strictEqual(data.toString(), '[10, 100) [250, 300)');
		});

		it('should remove from the end of an existing range', function() {
			data.remove([250, 350]);
			assert.strictEqual(data.toString(), '[10, 100) [200, 250)');
		});

		it('should remove from multiple ranges in the collection', function() {
			data.remove([50, 250]);
			assert.strictEqual(data.toString(), '[10, 50) [250, 300)');
		});
	});

	describe('#print()', () => {
		before(() => {
			data = new RangeCollection();
		});

		it('should print an empty range', function() {
			assert.strictEqual(data.toString(), '');
		});

		it('should print a non-empty range', function() {
			data.add([1, 5]);
			assert.strictEqual(data.toString(), '[1, 5)');
		});
	});
});