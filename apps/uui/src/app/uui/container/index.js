// Dependencies
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Shared Components
import BaseComponent from '@BaseComponent';

// Components
import Layout from '../components/Layout';

// Actions
import { getUser } from '../actions';

export default connect(
  ({ uui, req }) => ({
    uui,
    req,
  }),
  dispatch =>
    bindActionCreators(
      {
        getUser,
      },
      dispatch,
    ),
)(BaseComponent(Layout));
