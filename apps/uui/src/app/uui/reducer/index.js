// Utils
import { getNewState, redirectTo } from '@Utils/frontend';

// Action Types
import {
  FETCH_SOMETHING,
  FETCH_USER,
  UPDATE_USER,
  UPDATE_SOMETHING,
  CREATE_SOMETHING,
  OPEN_MODAL,
  CLOSE_MODAL,
  TRIGGER_ERROR_BANNER,
  CLOSE_ERROR_BANNER,
} from '../actions/actionTypes';

const initialState = {
  authentication: {},
  something: {},
  somethingUpdated: false,
  updatedSomething: {},
  somethingCreated: {},
  modal: null,
  errorBanner: null,
};

export default function uuiReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_USER.success(): {
      const {
        payload: { response = {} },
      } = action;

      return getNewState(state, {
        authentication: response,
      });
    }

    case UPDATE_USER.success(): {
      const { payload } = action;
      return getNewState(state, {
        authentication: {
          ...state.authentication,
          preferences: JSON.stringify(payload),
        },
      });
    }

    case FETCH_SOMETHING.success(): {
      const {
        payload: { error = false, response = {} },
      } = action;

      if (error && error.code === 403) {
        return redirectTo('/');
      }

      return getNewState(state, {
        something: response,
      });
    }

    case UPDATE_SOMETHING.success(): {
      const {
        payload: { response = {}, row = {} },
      } = action;

      return getNewState(state, {
        somethingUpdated: true,
        something: response,
        updatedSomething: row,
      });
    }

    case CREATE_SOMETHING.success(): {
      const {
        payload: { row = {}, response },
      } = action;

      return getNewState(state, {
        somethingCreated: row,
        something: response,
      });
    }

    case OPEN_MODAL: {
      return getNewState(state, {
        modal: action.payload,
      });
    }

    case CLOSE_MODAL: {
      return getNewState(state, {
        modal: null,
      });
    }

    case TRIGGER_ERROR_BANNER: {
      return getNewState(state, {
        errorBanner: action.payload,
      });
    }

    case CLOSE_ERROR_BANNER: {
      return getNewState(state, {
        errorBanner: null,
      });
    }

    default:
      return state;
  }
}
