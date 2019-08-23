// Dependencies
import React, { Component } from 'react';
import { func, object, element, string } from 'prop-types';
import { connect } from 'react-redux';

// Shared Components
import Header from '@Layout/header/Header';

// Componenets
import Sales2 from './Sales2';

// Styles
import styles from './Layout.scss';

class Layout extends Component {
  static propTypes = {
    match: object,
    getUser: func,
    req: object,
    modal: element,
    errorBanner: string,
  };

  componentDidMount() {
    const { getUser } = this.props;
    getUser();
  }

  render() {
    const {
      modal,
      errorBanner,
      match: {
        params: { page = 'default' },
      },
      uui: { authentication: user },
      req: { currentStatus = false },
    } = this.props;

    if (currentStatus === 'Error') {
      return (
        <main className={styles.layout}>
          <Header page={page} user={{ name: '' }} removeMenu />

          <div className={styles.error}>
            <h1>We were unable to authenticate you</h1>

            <p>
              Please <a href="/signout">logout</a> and try to log in again
            </p>
          </div>
        </main>
      );
    } else if (currentStatus === 'IE') {
      return (
        <main className={styles.layout}>
          <Header page={page} user={{ name: '' }} removeMenu />

          <div className={styles.error}>
            <h1>Your browser is not supported</h1>

            <p>You can install Chrome using .</p>
          </div>
        </main>
      );
    }

    // TODO: See implementation.notes fig 1.

    // List of Components
    const componentsList = {
      default: <Dashboard user={user} {...this.props} />,
      admin: <Admin />,
      sales: <Sales2 user={user} />,
    };

    return (
      <main className={styles.layout}>
        {modal}
        <Header page={page} user={user} />
        {errorBanner && (
          <div className={styles.errorBanner}>
            <span className={styles.errorBannerTitle}>
              Sorry, something&#39;s gone wrong.
            </span>
            {errorBanner}
          </div>
        )}
        {user && user.preferences && componentsList[page]}
      </main>
    );
  }
}

const mapStateToProps = state => ({
  modal: state.uui.modal,
  errorBanner: state.uui.errorBanner,
});

export default connect(mapStateToProps)(Layout);
