import React from 'react';

import { shallow } from 'enzyme';

// Testable Components
import MultiSelect from './MultiSelect';

// Styles
import styles from './MultiSelect.scss';
import Option from './Option';
import Search from '../search/Search';

const props = {
  options: [
    {
      id: 1,
      name: 'Avengers',
    },
    {
      id: 2,
      name: 'Guardians of Galaxy',
    },
  ],
};

describe('MultiSelect', () => {
  const wrapper = shallow(<MultiSelect {...props} />);

  beforeEach(() => {
    wrapper.setState({ isExpanded: false });
  });

  it('should render', () => {
    expect(wrapper.length).toBe(1);
  });

  it('should render options when clicked', () => {
    wrapper.find('input').simulate('click');

    expect(wrapper.find(`.${styles.expanded}`).length).toBe(1);
  });

  it('should render 2 options when dropdown is open', () => {
    wrapper.find('input').simulate('click');

    expect(wrapper.find(Option).length).toBe(2);
  });

  it('should render the sections if needed', () => {
    wrapper.setProps({
      sections: [
        {
          id: 1,
          name: 'Heros',
          values: [1, 2],
        },
        {
          id: 2,
          name: 'Villains',
          values: [2],
        },
      ],
    });
    wrapper.find('input').simulate('click');

    expect(wrapper.find(`.${styles.sectionAllSelects}`).length).toBe(1);
    expect(
      wrapper.find(`.${styles.sectionAllSelects}`).find(Option).length,
    ).toBe(2);
  });

  it('should render a Filters field if more than 10 options', () => {
    wrapper.find('input').simulate('click');
    wrapper.setProps({
      options: [...new Array(15)].map((itm, idx) => ({
        id: idx,
        name: `itm-${idx}`,
      })),
    });

    expect(wrapper.find(Search).length).toBe(1);
  });
});
