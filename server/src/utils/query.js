const { DEFAULT_PAGE_LIMIT } = require('../constants/launches');

/* eslint-disable radix */
const getPageOffset = (pageNumber) => {
  const page = parseInt(pageNumber);
  const skip = (page - 1) * DEFAULT_PAGE_LIMIT;

  return skip;
};

module.exports = {
  getPageOffset,
};
