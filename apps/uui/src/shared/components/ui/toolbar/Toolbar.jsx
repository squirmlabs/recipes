import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Components
import ToolbarButton from './ToolbarButton';
import YearPicker from './YearPicker';

import SearchFilter from './SearchFilter';

// Styles
import styles from './Toolbar.scss';
import AutoSaver from './AutoSaver/AutoSaver';

const Toolbar = ({
  isRedoActive,
  isUndoActive,
  onChangeYear,
  onChangeFilter,
  onClearSearch,
  onRedoAction,
  onUndoAction,
  query,
  selectedYear,
  years,
  isShiftedDown,
  withYearPicker,
  withSearchFilter,
  withUndoRedo,
  withAutosave,
}) => (
  <div
    data-qeid="toolbar-layout"
    className={classNames(styles.toolbar, {
      [styles.toolbarShiftedDown]: isShiftedDown,
    })}
  >
    <label data-qeid="year-selection-label">Sales Data for</label>
    {withYearPicker && (
      <YearPicker
        selectedYear={selectedYear}
        onChangeYear={onChangeYear}
        years={years}
        data-qeid="year-selection"
      />
    )}
    <div className={styles.controls} data-qeid="toolbar-sales">
      {withSearchFilter && (
        <div className={styles.inputContainer}>
          <SearchFilter
            data-qeid="search-filter-revenue"
            className={styles.searchInput}
            query={query}
            onChange={onChangeFilter}
            onClearSearch={onClearSearch}
            placeholder="Search by holding company, agency, or advertiser"
          />
        </div>
      )}
      {withUndoRedo && (
        <div className={styles.actionsUndo}>
          <ToolbarButton
            className={styles.col}
            label="Redo"
            handleEvent={onRedoAction}
            isDisabled={!isRedoActive}
          />
          <ToolbarButton
            className={styles.col}
            label="Undo"
            handleEvent={onUndoAction}
            isDisabled={!isUndoActive}
          />
        </div>
      )}
      {withAutosave && <AutoSaver />}
    </div>
  </div>
);
Toolbar.propTypes = {
  isRedoActive: PropTypes.bool.isRequired,
  isUndoActive: PropTypes.bool.isRequired,
  onChangeYear: PropTypes.func.isRequired,
  onChangeFilter: PropTypes.func.isRequired,
  onClearSearch: PropTypes.func.isRequired,
  onRedoAction: PropTypes.func.isRequired,
  onUndoAction: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
  selectedYear: PropTypes.string.isRequired,
  years: PropTypes.array.isRequired,
  isShiftedDown: PropTypes.bool,
  withYearPicker: PropTypes.bool,
  withSearchFilter: PropTypes.bool,
  withUndoRedo: PropTypes.bool,
  withAutosave: PropTypes.bool,
};
export default Toolbar;
