require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
// const { executeQuery } = require('./helpers');
const studentRouter = require('./routes/studentRoutes');
const { mainErrorHandler } = require('./middleware');
const authRouter = require('./routes/authRoutes');

const app = express();

const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.get('/', (req, res) => {
  res.json('Hello World!');
});

app.use('/api', studentRouter);
app.use('/api', authRouter);

// app.get('/test', async (req, res) => {
//   const sql = 'SELECT * FROM `student`';
//   const [students, error] = await executeQuery(sql);
//   return res.json(students);
// });

app.use(mainErrorHandler);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
