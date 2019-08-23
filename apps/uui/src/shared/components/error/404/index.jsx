// Dependencies
import React from 'react';
import BaseComponent from '@BaseComponent';
import Link from '@Ui/Link';

// Styles
import styles from './Page404.scss';

const Page404 = () => (
  <div className={styles.page404}>
    <img alt="Not Found" src="./images/notFound.svg" />

    <div className={styles.notFound}>
      <h1>404</h1>

      <span>Page Not Found</span>

      <p>Page Not Found</p>

      <Link to="/">
        INICIO <i className="fa fa-long-arrow-right" aria-hidden="true" />
      </Link>
    </div>
  </div>
);

export default BaseComponent(Page404);
