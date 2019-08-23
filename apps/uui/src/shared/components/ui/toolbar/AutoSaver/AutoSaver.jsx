import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';

// Utils
import { SAVE_TIME_FORMAT } from '@Utils/constants';

// Styles
import styles from './AutoSaver.scss';

class AutoSaver extends Component {
  static propTypes = {
    isSaving: PropTypes.bool.isRequired,
    lastSave: PropTypes.object.isRequired,
    saveFailed: PropTypes.bool.isRequired,
  };

  state = {
    lastSaveWasOverOneMinuteAgo: false,
  };

  componentDidMount() {
    this.SAVE_WATCHER_INTERVAL = setInterval(() => {
      const { lastSave } = this.props;

      const newLastSaveWAsOverOneMinuteAgo =
        moment.duration(moment().diff(lastSave)).asMinutes() > 1;

      if (
        newLastSaveWAsOverOneMinuteAgo !==
        this.state.lastSaveWasOverOneMinuteAgo
      ) {
        this.setState({
          lastSaveWasOverOneMinuteAgo: newLastSaveWAsOverOneMinuteAgo,
        });
      }
    }, 500);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isSaving !== nextProps.isSaving) {
      this.promptSave = true;
    }
  }

  componentWillUnmount() {
    clearInterval(this.SAVE_WATCHER_INTERVAL);
  }

  CLEAR_TIMEOUT = null;

  SAVE_WATCHER_INTERVAL = null;

  promptSave = false;

  render() {
    const { lastSaveWasOverOneMinuteAgo } = this.state;
    const { isSaving, lastSave, saveFailed } = this.props;

    return (
      <div data-qeid="autosaver" className={styles.AutoSaver}>
        <div className={styles.autosaveHeader}>
          <i
            className={classNames('fa fa-circle', {
              [styles.failedSaveIcon]: saveFailed,
            })}
          />{' '}
          {saveFailed ? 'Save Failed' : 'Autosave On'}
        </div>
        <div data-qeid="autosave-label" className={styles.saveStatus}>
          {isSaving && 'Saving...'}
          {!isSaving &&
            this.promptSave &&
            !lastSaveWasOverOneMinuteAgo &&
            !saveFailed &&
            'Saved'}
          {!isSaving &&
            lastSaveWasOverOneMinuteAgo &&
            !saveFailed &&
            `Saved at ${moment(lastSave).format(SAVE_TIME_FORMAT)}`}
          {!isSaving && saveFailed && 'Changes not saved'}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ sales }) => ({
  isSaving: sales.present.isSaving,
  lastSave: sales.present.lastSave,
  saveFailed: sales.present.saveFailed,
});

export default connect(mapStateToProps)(AutoSaver);
