import React from 'react';
import moment from 'moment';

import { shallow } from 'enzyme';

// Utils
import { SAVE_TIME_FORMAT } from '@Utils/constants';

// Testable Components
import AutoSaver from './AutoSaver';

// Styles
import styles from './AutoSaver.scss';

const props = {
  isSaving: false,
  lastSave: null,
};

describe('AutoSaver', () => {
  jest.useFakeTimers();

  const wrapper = shallow(<AutoSaver.WrappedComponent {...props} />);

  beforeEach(() => {
    wrapper.setProps(props);
    wrapper.setState({
      lastSaveWasOverOneMinuteAgo: false,
    });
  });

  it('should render', () => {
    expect(wrapper.length).toBe(1);
  });

  it('should start a save watch interval when the component is mounted', () => {
    expect(wrapper.instance().SAVE_WATCHER_INTERVAL).toBe(1);
    wrapper.instance().componentDidMount();
    expect(wrapper.instance().SAVE_WATCHER_INTERVAL).toBeGreaterThan(1);
  });

  it('should prompt save when a save occurs', () => {
    expect(wrapper.instance().promptSave).toBe(false);
    wrapper.setProps({ isSaving: true });
    expect(wrapper.instance().promptSave).toBe(true);
  });

  it('should clear the save watch interval after component unmounts', () => {
    wrapper.instance().componentWillUnmount();
    expect(clearInterval).toHaveBeenCalledWith(2);
  });

  it('should render the autosave indicator', () => {
    expect(wrapper.find(`.${styles.autosaveHeader}`).text()).toBe(
      ' Autosave On',
    );
  });

  it('should render the saving status if an active save is going on', () => {
    wrapper.setProps({ isSaving: true });

    expect(wrapper.find(`.${styles.saveStatus}`).text()).toBe('Saving...');
  });

  it('should render a saved status if a recent save occured', () => {
    const lastSave = moment().subtract(30, 'seconds');

    wrapper.setState({
      lastSaveWasOverOneMinuteAgo: false,
    });

    wrapper.setProps({
      lastSave,
    });

    expect(wrapper.find(`.${styles.saveStatus}`).text()).toBe('Saved');
  });

  it('should render the timestamp if not saving and last saw was over a mintue ago', () => {
    const lastSave = moment().subtract(2, 'minutes');

    wrapper.setState({
      lastSaveWasOverOneMinuteAgo: true,
    });

    wrapper.setProps({
      lastSave,
    });

    expect(wrapper.find(`.${styles.saveStatus}`).text()).toBe(
      `Saved at ${lastSave.format(SAVE_TIME_FORMAT)}`,
    );
  });
});
