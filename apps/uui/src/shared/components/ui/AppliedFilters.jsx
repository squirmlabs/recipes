import React from 'react';
import { object } from 'prop-types';
import styles from './AppliedFilters.scss';

const AppliedFilters = ({
  filter = {},
  selectedFilters = {},
}) => {
  let businessUnits = [];

  if (selectedFilters.businessUnits.length) {
    businessUnits = selectedFilters.businessUnits.map(selectedBU => {
      // businessUnitID : daypartID format
      if (selectedBU.includes(':')) {
        const [businessUnitID, daypartID] = selectedBU.split(':');
        const { dayparts } = filter.businessUnits.find(
          bu => bu.businessUnitID === Number(businessUnitID)
        );

        const result = dayparts.find(dp => dp.daypartID === Number(daypartID));

        if (result) {
          const { name } = result;

          return name;
        }
      } else {
        // businessUnitID format
        const result = filter.businessUnits
          .find(({ businessUnitID }) => businessUnitID === Number(selectedBU));

        if (result) {
          const { businessUnit } = result;
          return businessUnit;
        }
      }
      return '';
    });
  }

  const filters = {
    ...selectedFilters,
    businessUnits,
  };

  const filtersToShow = Object.keys(filters)
    .map(key => filters[key])
    .filter(filter => filter.length > 0);

  const displayFilters = [];

  filtersToShow.forEach((filter, key) => {
    const first = key === 0;

    filter.forEach((f, k) => {
      displayFilters.push(`${first && k === 0 ? '' : ','} ${f}`);
    });
  });

  return (
    <span className={styles.filtersApplied}>
      {filtersToShow.length > 0 &&
        <span>
          <em>Filters: </em>
          {' '}
          {displayFilters.slice(0, 9).map((filter, key) => (
            <span key={key}>
              {key === 8 ? `${filter}...` : filter}
            </span>
          ))}
        </span>
      }
    </span>
  );
};

AppliedFilters.propTypes = {
  filter: object,
  selectedFilters: object,
};

export default AppliedFilters;
