const { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_LIMIT } = require('../constants/launches');

/* eslint-disable radix */
const getPagination = (query) => {
  const page = parseInt(query.page) || DEFAULT_PAGE_NUMBER;
  // If limit is 0 (default page limit) then mongo returns all launches
  const limit = parseInt(query.limit) || DEFAULT_PAGE_LIMIT;

  const skip = (page - 1) * limit;

  return {
    skip,
    limit,
  };
};

module.exports = {
  getPagination,
};
