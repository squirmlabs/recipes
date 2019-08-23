import React, { Component } from 'react';
import { func, number, string } from 'prop-types';
import styles from './DataNote.scss';

class DataNote extends Component {
  static propTypes = {
    note: string,
    save: func,
    agencyID: number,
    advertiserID: number,
    closeNote: func,
  }

  constructor(props) {
    super(props);
    const { note = '' } = props;
    this.state = {
      note,
    };
  }

  componentDidMount() {
    this.textarea.focus();
    document.addEventListener('keyup', this.handleEscKeyDown, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.handleEscKeyDown, false);
  }

  handleEscKeyDown = e => {
    const { closeNote } = this.props;
    if (e.keyCode === 27) {
      closeNote();
    }
  }

  handleChange = e => {
    this.setState({
      note: e.target.value,
    });
  }

  handleSave = () => {
    const { agencyID, advertiserID, closeNote, save } = this.props;
    const { note: text } = this.state;
    save({
      agencyID,
      advertiserID,
      text,
    });
    closeNote();
  }

  refTextarea = textarea => {
    this.textarea = textarea;
  }

  stopPropagation = e => e.stopPropagation();

  render() {
    const { closeNote } = this.props;
    const { note } = this.state;
    return (
      <div className={styles.dataNote} onClick={this.stopPropagation}>
        <textarea maxLength="250" value={note} onChange={this.handleChange} ref={this.refTextarea} />
        <button className={styles.cancel} onClick={closeNote}>Cancel</button>
        <button className={styles.save} onClick={this.handleSave}>Save note</button>
      </div>
    );
  }
}

export default DataNote;
