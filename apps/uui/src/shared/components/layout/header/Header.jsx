// Dependencies
import React from 'react';
import { bool, object, string } from 'prop-types';

// Shared
import Link from '@Ui/Link';

// Components
import Logo from './Logo';

// Styles
import styles from './Header.scss';

const Header = ({ page, user = {}, removeMenu = false }) => {
  let firstName = '';

  const { name = '' } = user;

  if (name) {
    [firstName] = name.split(' ');
  }

  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <nav className={styles.nav}>
          <Logo />

          <div className={styles.headerNav}>
            {!removeMenu && (
              <div className={styles.pillNav}>
                <Link
                  className={`${
                    page === 'default' ? styles.currentButton : ''
                  }`}
                  to="/"
                  data-qeid="home"
                >
                  Something
                </Link>
              </div>
            )}

            {!removeMenu && (
              <span className={styles.userName}>
                <span className={styles.fullName}>{name}</span>
                <span className={styles.firstName}>{firstName}</span>
              </span>
            )}

            <a href="/signout">Logout</a>
          </div>
        </nav>
      </div>
    </header>
  );
};

Header.propTypes = {
  page: string,
  user: object,
  removeMenu: bool,
};

export default Header;
