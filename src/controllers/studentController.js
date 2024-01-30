const APIError = require('../apiErrors/apiErrors');
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
    const { studentId } = req.params;

    const sql = 'SELECT * FROM student WHERE id=?';

    const [itemArr, error] = await executeQuery(sql, [studentId]);

    if (error) {
      console.log('error GET SINGLE student table ===');
      return next(error);
    }
    if (itemArr.length === 0) {
      return res.json('there is no such a student');
    }
    return res.json(itemArr[0]);
  },
  create: async (req, res, next) => {
    const { firstname, lastname, email } = req.body;
    const sql = `INSERT INTO student (firstname, lastname, email) 
 VALUES (?,?,?)`;

    const [resObj, error] = await executeQuery(sql, [firstname, lastname, email]);

    if (error) {
      console.log(' create item error ===', error);
      return next(error);
    }

    if (resObj.affectedRows !== 1) {
      console.log('create item no rows affected', resObj);
      return next(new APIError('something went wrong', 400));
    }

    return res.status(201).json({
      id: resObj.insertId,
      msg: 'Success',
    });
  },
  update: async (req, res, next) => {
    const { studentId } = req.params;
    const { firstname, lastname, email } = req.body;
    const sql = 'UPDATE student SET firstname=?, lastname=?, email=? WHERE id=?';

    const [resObj, error] = await executeQuery(sql, [firstname, lastname, email, studentId]);
    if (error) {
      console.log(' delete item error ===', error);
      return next(error);
    }
    // if (resObj.affectedRows === 1) {
    //   return res.json({ msg: `student with id ${studentId} was updated` });
    // }
    // return res.status(201).json({
    //   id: resObj.insertId,
    //   msg: 'success',
    // });
    if (resObj.affectedRows !== 1) {
      return next(new APIError('something went wrong', 400));
    }

    res.status(201).json({
      id: studentId,
      msg: `Student with id:${studentId} updated successfully`,
    });
  },
  delete: async (req, res, next) => {
    const { studentId } = req.params;
    const sql = 'DELETE FROM student WHERE id=? LIMIT 1';
    const [rows, error] = await executeQuery(sql, [studentId]);

    if (error) {
      console.log(' delete item error ===', error);
      return next(error);
    }
    // if (rows.affectedRows === 1) {
    //   return res.json({ msg: `post with id ${studentId} was deleted` });
    // }
    // return res.status(400).json({
    //   msg: 'no rows afected',
    //   rows,
    // });
    if (rows.affectedRows !== 1) {
      return next(new APIError('something went wrong', 400));
    }

    res.status(200).json({
      msg: 'Student deleted successfully',
    });
  },

};
