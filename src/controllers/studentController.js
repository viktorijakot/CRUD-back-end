const { executeQuery } = require('../helpers');

module.exports = {
  all: async (req, res, next) => {
    const sql = 'SELECT * FROM student';
    const [itemsArr, error] = await executeQuery(sql);

    if (error) {
      console.log('error GET ALL student table ===');
      return next(error);
    }

    return res.json(itemsArr);
  },
  single: async (req, res, next) => {

  },
  create: async (req, res, next) => {

  },
  update: async (req, res, next) => {

  },
  delete: async (req, res, next) => {

  },
};
