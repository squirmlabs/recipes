import reducer from './';
import {
  FETCH_USER,
  UPDATE_SOMETHING,
  CREATE_SOMETHING,
  TRIGGER_ERROR_BANNER,
  CLOSE_ERROR_BANNER,
} from '../actions/actionTypes';

const initialState = {
  something: {},
  somethingUpdated: false,
  updatedSomething: {},
  somethingCreated: {},
  modal: null,
  errorBanner: null,
};

describe('reducer', () => {
  it('returns an empty array for the initial state', () => {
    let notDefined;
    const returnedState = reducer(notDefined, {});

    expect(returnedState).toEqual(initialState);
  });

  it('should handle FETCH_USER success', () => {
    const currentState = {};
    const expectedState = {
      authentication: {
        user: 'Tester',
      },
    };
    const action = {
      type: FETCH_USER.success(),
      payload: {
        response: {
          user: 'Tester',
        },
      },
    };
    const result = reducer(currentState, action);
    expect(result).toEqual(expectedState);
  });

  it('should handle UPDATE_SOMETHING success', () => {
    const row = {
      row: 'row',
    };
    const response = {
      foo: 'bar',
    };
    const currentState = {
      somethingUpdated: false,
      something: {},
      updatedSomething: {},
    };
    const expectedState = {
      somethingUpdated: true,
      something: response,
      updatedSomething: row,
    };
    const action = {
      type: UPDATE_SOMETHING.success(),
      payload: {
        response,
        row,
      },
    };
    const result = reducer(currentState, action);
    expect(result).toEqual(expectedState);
  });

  it('should handle CREATE_SOMETHING success', () => {
    const row = {
      row: 'row',
    };
    const response = {
      foo: 'bar',
    };
    const currentState = {
      something: {},
      somethingCreated: {},
    };
    const expectedState = {
      something: response,
      somethingCreated: row,
    };
    const action = {
      type: CREATE_SOMETHING.success(),
      payload: {
        response,
        row,
      },
    };
    const result = reducer(currentState, action);
    expect(result).toEqual(expectedState);
  });

  it('should handle TRIGGER_ERROR_BANNER', () => {
    const currentState = {
      errorBanner: null,
    };
    const expectedState = {
      errorBanner: 'An error occured.',
    };
    const action = {
      type: TRIGGER_ERROR_BANNER,
      payload: 'An error occured.',
    };
    const result = reducer(currentState, action);
    expect(result).toEqual(expectedState);
  });

  it('should handle CLOSE_ERROR_BANNER', () => {
    const currentState = {
      errorBanner: 'An error occured.',
    };
    const expectedState = {
      errorBanner: null,
    };
    const action = {
      type: CLOSE_ERROR_BANNER,
    };
    const result = reducer(currentState, action);
    expect(result).toEqual(expectedState);
  });
});
