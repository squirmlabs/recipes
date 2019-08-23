// Dependencies
import { combineReducers } from 'redux';
import { analyticsReducer } from 'react-redux-analytics';
import undoable, { includeAction } from 'redux-undo';

// Default Reducers
import device from './deviceReducer';
import req from './reqReducer';

// Admin Reducers
import {
  CHANGE_REVENUE_DATA,
  RESET_SALES_ENTRY_HISTORY,
} from '../../app/uui/actions/actionTypes';

export default (appName, reducer) => {
  const reducers = {
    device,
    req,
    analytics: analyticsReducer,
    uui: combineReducers({
      something: peopleReducer,
      advertisers: advertisersReducer,
      agencies: agenciesReducer,
    }),
    sales: undoable(salesReducer, {
      limit: 50,
      clearHistoryType: RESET_SALES_ENTRY_HISTORY,
      filter: includeAction(CHANGE_REVENUE_DATA),
    }),
  };

  if (appName && reducer) {
    reducers[appName] = reducer;
  }

  const rootReducer = combineReducers(reducers);

  return rootReducer;
};
