import { Map } from 'immutable';
import * as lib from './lib';

describe('Filter Search Library', () => {
  it('Expects FILTER_DEBOUNCE to equal 150', () => {
    const debounce = lib.FILTER_DEBOUNCE;
    expect(debounce).toEqual(150);
  });

  it('Expects CHANGE_YEAR_DEBOUNCE to equal 20', () => {
    const debounce = lib.CHANGE_YEAR_DEBOUNCE;
    expect(debounce).toEqual(20);
  });

  it('Expects the keys to filter to be the following', () => {
    const filters = lib.KEYS_TO_FILTERS;
    expect(filters).toEqual([
      'advertiserName',
      'subAdvertisers.subAdvertiserName',
      'subAdvertisers.revenueItems.holdingcoName',
      'subAdvertisers.revenueItems.subAdvertiserName',
      'subAdvertisers.revenueItems.agencyName',
    ]);
  });

  it('Expects FILTER_OPTIONS to reflect', () => {
    const options = lib.FILTER_OPTIONS;

    expect(options).toEqual({
      distance: 100,
      keys: [
        'advertiserName',
        'subAdvertisers.subAdvertiserName',
        'subAdvertisers.revenueItems.holdingcoName',
        'subAdvertisers.revenueItems.subAdvertiserName',
        'subAdvertisers.revenueItems.agencyName',
      ],
      location: 0,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      shouldSort: true,
      threshold: 0,
    });
  });

  it('Performs flattening of arrays', () => {
    expect(lib.flatten([[1, 2, 3], [4, 5, 6]])).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it('Performs test if something is an immutable list', () => {
    const value = lib.immutableSupport(
      Map({
        foo: {
          bar: 'baz',
        },
      }),
    );
    expect(value).toEqual(
      Map({
        foo: {
          bar: 'baz',
        },
      }),
    );
    expect([1, 2, 3]).toEqual([1, 2, 3]);
  });

  it('Performs test if something is a string or number', () => {
    expect(lib.isTypeOfStringOrNumber('string')).toEqual(true);
    expect(lib.isTypeOfStringOrNumber(1)).toEqual(true);
    expect(lib.isTypeOfStringOrNumber([1, 2, 3])).toEqual(false);
  });

  test('should get the values to search on in an object', () => {
    const value = lib.getValuesForKey('foo', {
      foo: 'bar',
    });
    expect(value).toEqual(['bar']);
  });

  test('should get the values to search on in an array', () => {
    const value = lib.getValuesForKey('foo', [
      {
        foo: 'bar',
      },
    ]);

    expect(value).toEqual(['bar']);
  });

  test('should get the values to search on in a nested object', () => {
    const value = lib.getValuesForKey('foo.bar', {
      foo: {
        bar: 'baz',
      },
    });

    expect(value).toEqual(['baz']);
  });

  test('should get the values to search on in a nested array', () => {
    const value = lib.getValuesForKey('foo', {
      foo: ['bar', 'baz'],
    });

    expect(value).toEqual(['bar', 'baz']);
  });

  test('should get the values to search on in a nested array', () => {
    const value = lib.getValuesForKey('foo.bar', {
      foo: [
        {
          bar: 'baz',
        },
        {
          bar: 'baz2',
        },
      ],
    });

    expect(value).toEqual(['baz', 'baz2']);
  });

  test('should get the values to search on in a nested array with an index', () => {
    const value = lib.getValuesForKey('foo.1.bar', {
      foo: [
        {
          bar: 'baz',
        },
        {
          bar: 'baz2',
        },
      ],
    });

    expect(value).toEqual(['baz2']);
  });

  test('should ignore undefined values', () => {
    const value = lib.getValuesForKey('fooz', {
      foo: [
        {
          bar: 'baz',
        },
        {
          bar: 'baz2',
        },
      ],
    });

    expect(value).toEqual([]);
  });

  test('should get the values to search on in an immutable map', () => {
    const value = lib.getValuesForKey(
      'foo.bar',
      Map({
        foo: {
          bar: 'baz',
        },
      }),
    );

    expect(value).toEqual(['baz']);
  });

  test('should ignore non-string and non-number values', () => {
    const value = lib.getValuesForKey('foo.bar', {
      foo: [
        {
          bar: [],
        },
        {
          bar: [],
        },
      ],
    });

    expect(value).toEqual([]);
  });

  test('should return true if the term is in the strings', () => {
    const res = lib.searchStrings(['foobar', 'bar'], 'foo');
    expect(res).toBe(true);
  });

  test("should return false if the term isn't in the strings", () => {
    const res = lib.searchStrings(['barbaz', 'bar'], 'foo');
    expect(res).toBe(false);
  });

  test("should return false if the term is in the strings but doesn't have the right case", () => {
    const res = lib.searchStrings(['foobaz', 'bar'], 'Foo');
    expect(res).toBe(false);
  });
});
