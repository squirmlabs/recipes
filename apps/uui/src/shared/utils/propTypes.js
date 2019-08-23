import PropTypes from 'prop-types';

export const ReactRouter = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  match: PropTypes.shape({
    url: PropTypes.string,
  }),
  location: PropTypes.shape({
    search: PropTypes.string,
  }),
};

export const User = PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string,
});

export const Users = PropTypes.arrayOf(User);

export const Team = PropTypes.shape({
  teamLeader: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }),
});

export const Teams = PropTypes.arrayOf(
  PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }),
);

export const UserInfo = PropTypes.shape({
  user: User,
});

export const Region = PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string,
});

export const Year = PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string,
});

export const Agency = PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string,
});

export const Category = PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string,
});

export const Regions = PropTypes.arrayOf(Region);

export const Years = PropTypes.arrayOf(Year);

export const Agencies = PropTypes.arrayOf(Agency);

export const Categories = PropTypes.arrayOf(Category);

export const Role = PropTypes.string;

export const Roles = PropTypes.arrayOf(Role);

export const Advertiser = PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string,
});

export const Advertisers = PropTypes.arrayOf(Advertiser);
