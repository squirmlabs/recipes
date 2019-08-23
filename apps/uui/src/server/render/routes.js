export default currentApp => {
  try {
    return require(`../../app/${currentApp}/routes`).default; // eslint-disable-line
  } catch (e) {
    return false;
  }
};
