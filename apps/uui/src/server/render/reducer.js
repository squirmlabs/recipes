export default currentApp => {
  try {
    return require(`../../app/${currentApp}/reducer`).default; // eslint-disable-line
  } catch (e) {
    return false;
  }
};
