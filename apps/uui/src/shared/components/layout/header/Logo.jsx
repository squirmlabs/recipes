// Dependencies
import React from 'react';
import { bool } from 'prop-types';

// Components
import Link from '@Ui/Link';

// Styles
import styles from './Logo.scss';

const Logo = props => {
  const { refresh } = props;

  return (
    <div className={styles.logo}>
      <Link to="/" title="Squirmlabs" refresh={refresh} external>
        <h1>
          <img
            alt="Squirmlabs | UUI logo"
            data-qeid="brand-logo"
            src="/assets/images/frontend/uui-logo.png"
          />
        </h1>
      </Link>
    </div>
  );
};

Logo.propTypes = {
  refresh: bool,
};

export default Logo;
