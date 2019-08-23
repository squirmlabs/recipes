// Base Actions
import { request, received } from '@BaseActions';

// Api
import api from '../api';

// Action Types
import {
  CREATE_SOMETHING,
  FETCH_SOMETHING,
  FETCH_USER,
  UPDATE_SOMETHING,
  OPEN_MODAL,
  TRIGGER_ERROR_BANNER,
  CLOSE_ERROR_BANNER,
} from './actionTypes';


// getUser Action
export const getUser = type => dispatch => {
  const action = FETCH_USER;
  const { fetchUser } = api;

  dispatch(request(action));

  return fetchUser(type).then(data => dispatch(received(action, data)));
};

// getSomething Action
export const getSomething = year => dispatch => {
  const action = FETCH_SOMETHING;
  const { fetchSomething } = api;

  /* BE only has sales data for year 2018, patch for now */

  // eslint-disable-next-line no-unused-vars
  const selectedYear =
    year ||
    new Date()
      .getFullYear()
      .toString()
      .substr(-2);

  dispatch(request(action));

  return fetchSomething({ selectedYear: 18 }).then(data =>
    dispatch(received(action, data)),
  );
};

// updateSomething Action
export const updateSomething = data => dispatch => {
  const action = UPDATE_SOMETHING;
  const { updateSomething } = api;

  dispatch(request(action));

  return updateSomething(data).then(data => dispatch(received(action, data)));
};

// createSomething Action
export const createSomething = data => dispatch => {
  const action = CREATE_SOMETHING;
  const { createSomething } = api;

  dispatch(request(action));

  data.yearId = new Date()
    .getFullYear()
    .toString()
    .substr(-2);

  return createSomething(data).then(data => dispatch(received(action, data)));
};

export const openModal = modal => ({
  type: OPEN_MODAL,
  payload: modal,
});

export const closeModal = () => ({
  type: OPEN_MODAL,
});

export const displayErrorBanner = errorBanner => ({
  type: TRIGGER_ERROR_BANNER,
  payload: errorBanner,
});

export const closeErrorBanner = () => ({
  type: CLOSE_ERROR_BANNER,
});
