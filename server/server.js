
const express = require('express');

const app = express();
const bodyParser = require('body-parser');

// Route includes
const userRouter = require('./routes/user.router');
const runRouter = require('./routes/run.router')

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


/* Routes */
app.use('/api/user', userRouter);
app.use('/api/run', runRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
