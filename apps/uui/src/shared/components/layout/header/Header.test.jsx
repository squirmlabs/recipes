import React from 'react';
import { shallow } from 'enzyme';
import Header from './Header';
import styles from './Header.scss';

const props = {
  page: 'default',
};

describe('Header', () => {
  const subject = shallow(<Header {...props} />);

  it('should render menus if removeMenu is false', () => {
    subject.setProps({
      removeMenu: false,
    });
    expect(subject.find(`.${styles.pillNav}`).length).toBe(1);
    expect(subject.find(`.${styles.userName}`).length).toBe(1);
  });

  it('should not render menus if removeMenu is true', () => {
    subject.setProps({
      removeMenu: true,
    });
    expect(subject.find(`.${styles.pillNav}`).length).toBe(0);
    expect(subject.find(`.${styles.userName}`).length).toBe(0);
  });

  it('should render first name and full name', () => {
    subject.setProps({
      user: {
        name: 'FirstName LastName',
      },
      removeMenu: false,
    });
    expect(subject.find(`.${styles.fullName}`).text()).toEqual(
      'FirstName LastName',
    );
    expect(subject.find(`.${styles.firstName}`).text()).toEqual('FirstName');
  });

  it('should render Something link as selected', () => {
    expect(
      subject
        .find(`.${styles.currentButton}`)
        .children()
        .text(),
    ).toEqual('Something');
  });

});
