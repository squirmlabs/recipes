import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import union from 'lodash/union';
import intersection from 'lodash/intersection';

// Components
import Option from './Option';

// Styles
import styles from './MultiSelect.scss';
import Search from '../search/Search';

class MultiSelect extends Component {
  static propTypes = {
    withFiltering: PropTypes.bool,
    withAll: PropTypes.bool,
    filterPlaceholder: PropTypes.string,
    values: PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    ),
    options: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
          .isRequired,
        name: PropTypes.string.isRequired,
      }).isRequired,
    ),
    onChange: PropTypes.func.isRequired,
    sections: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
          .isRequired,
        name: PropTypes.string.isRequired,
        values: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
          .isRequired,
      }),
    ),
  };

  static defaultProps = {
    withFiltering: true,
    filterPlaceholder: 'Search',
    withAll: false,
    values: [],
    sections: [],
  };

  state = {
    query: '',
    isExpanded: false,
  };

  componentDidMount() {
    document.addEventListener('mousedown', this.onClickOutside);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.isExpanded && !this.state.isExpanded) {
      this.prevSelectedOptions = this.props.options.filter(opt =>
        this.props.values.includes(opt.id),
      );
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.onClickOutside);
  }

  onKeyDown = evt => {
    if (evt.key === 'Escape') {
      this.setState({ isExpanded: false });
    } else if (evt.key === 'Enter') {
      this.setState({ isExpanded: !this.state.isExpanded });
    }
  };

  onClickOutside = evt => {
    if (this.container && !this.container.current.contains(evt.target)) {
      this.setState({ isExpanded: false, query: '' });
    }
  };

  onExpand = () => this.setState({ isExpanded: true });

  onToggleExpand = () => this.setState({ isExpanded: !this.state.isExpanded });

  onChange = id => {
    const { values, onChange } = this.props;

    onChange(
      values.includes(id)
        ? values.filter(value => value !== id)
        : [...values, id],
    );
  };

  onChangeAll = () => {
    const { onChange, options } = this.props;

    onChange(options.map(opt => opt.id));
  };

  onChangeSectionAll = sectionId => {
    const { sections, values, onChange } = this.props;
    const section = sections.find(
      section => String(section.id) === String(sectionId.split('-')[1]),
    );

    onChange(
      this.checkIfAllSectionValuesAreSelected(section)
        ? values.filter(value => !section.values.includes(value))
        : union(values, section.values),
    );
  };

  onClear = () => this.props.onChange([]);

  onFilter = evt => this.setState({ query: evt.target.value });

  onFilterClear = () => this.setState({ query: '' });

  checkIfAllSectionValuesAreSelected(section) {
    const { values } = this.props;

    return (
      values.length > 0 &&
      intersection(section.values, values).length === section.values.length
    );
  }

  checkIfSomeSectionValuesAreSelected(section) {
    const { values } = this.props;
    const selectedInSection = intersection(section.values, values).length;

    return (
      values.length > 0 &&
      selectedInSection > 0 &&
      selectedInSection < section.values.length
    );
  }

  filterByName = opt => {
    const { query } = this.state;

    return query ? opt.name.toLowerCase().includes(query.toLowerCase()) : true;
  };

  filterByAllSelected = opt => {
    const { sections } = this.props;
    let result = true;

    if (sections) {
      sections.forEach(section => {
        if (
          section.values.includes(opt.id) &&
          this.checkIfAllSectionValuesAreSelected(section)
        ) {
          result = false;
        }
      });
    }
    return result;
  };

  prevSelectedOptions = [];

  container = React.createRef();

  renderOptions(options) {
    const { values } = this.props;

    return options
      .filter(this.filterByName)
      .filter(
        opt => !this.prevSelectedOptions.find(prevOpt => prevOpt.id === opt.id),
      )
      .map(opt => (
        <Option
          key={opt.id}
          {...opt}
          checked={values.includes(opt.id)}
          onChange={this.onChange}
        />
      ));
  }

  render() {
    const { isExpanded, query } = this.state;
    const {
      withFiltering,
      options,
      values,
      sections,
      withAll,
      filterPlaceholder,
    } = this.props;

    return (
      <div
        data-qeid="multiselect"
        ref={this.container}
        onKeyDown={this.onKeyDown}
        className={classNames(styles.multiSelect, {
          [styles.focusedMultiSelect]: isExpanded,
        })}
      >
        <input
          readOnly
          placeholder="All"
          type="text"
          onClick={this.onToggleExpand}
          value={values
            .map(value => options.find(opt => opt.id === value).name)
            .join(', ')}
        />
        <div className={isExpanded ? styles.collapseIcon : styles.expandIcon} />
        {isExpanded && (
          <div className={styles.expanded}>
            {withFiltering && options.length > 10 && (
              <Search
                placeholder={filterPlaceholder}
                className={styles.filter}
                searchQuery={query}
                onSearch={this.onFilter}
                onClear={this.onFilterClear}
              />
            )}
            {!query && (
              <div
                className={classNames(styles.clearSection, {
                  [styles.nothingToClear]:
                    this.prevSelectedOptions.length === 0,
                })}
              >
                <button
                  data-qeid="multiselect-clear-btn"
                  onClick={this.onClear}
                >
                  Clear selected items
                </button>
                {this.prevSelectedOptions.length > 0 && (
                  <React.Fragment>
                    {this.prevSelectedOptions
                      .filter(this.filterByName)
                      .map(option => (
                        <Option
                          key={option.id}
                          {...option}
                          checked={values.includes(option.id)}
                          onChange={this.onChange}
                        />
                      ))}
                  </React.Fragment>
                )}
              </div>
            )}
            {sections.length > 0 ? (
              <div>
                <div className={styles.sectionAllSelects}>
                  {sections.filter(this.filterByName).map(section => (
                    <Option
                      key={`all-${section.id}`}
                      id={`all-${section.id}`}
                      name={`All ${section.name}`}
                      checked={this.checkIfAllSectionValuesAreSelected(section)}
                      isMixed={this.checkIfSomeSectionValuesAreSelected(
                        section,
                      )}
                      onChange={this.onChangeSectionAll}
                    />
                  ))}
                </div>
                {sections.map(section => {
                  const sectionOptions = this.renderOptions(
                    options.filter(opt => section.values.includes(opt.id)),
                  );

                  return (
                    sectionOptions.length > 0 && (
                      <div className={styles.section} key={section.id}>
                        <div className={styles.sectionLabel}>
                          {section.name}
                        </div>
                        {sectionOptions}
                      </div>
                    )
                  );
                })}
              </div>
            ) : (
              <div>
                {withAll && this.prevSelectedOptions.length === 0 && !query && (
                  <Option
                    id="all"
                    name="All"
                    checked={this.prevSelectedOptions.length === options.length}
                    onChange={this.onChangeAll}
                  />
                )}
                {this.renderOptions(options)}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default MultiSelect;
