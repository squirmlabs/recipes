import {
  keys,
  forEach
} from './object';

describe('#keys', () => {
  it('should return the object keys', () => {
    const test = {
      foo: true,
      bar: false
    };

    expect(keys(test)).toEqual(['foo', 'bar']);
  });
});

describe('#forEach', () => {
  it('should call the callback on the forEach', () => {
    const mockCallback = jest.fn();

    forEach([0, 1], mockCallback);

    // The mock function is called twice
    expect(mockCallback.mock.calls.length).toBe(2);

    // The first argument of the first call to the function was 0
    expect(mockCallback.mock.calls[0][0]).toBe(0);

    // The first argument of the second call to the function was 1
    expect(mockCallback.mock.calls[1][0]).toBe(1);
  });

  it('should return false when the items are not defined', () => {
    const mockCallback = jest.fn();

    expect(forEach(undefined, mockCallback)).toBe(false);
  });
});
