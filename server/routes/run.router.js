const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const axios = require("axios");

router.get('/:runnerId', (req, res) => {
    console.log('in get runs server', req.params.name)
    const queryText = `SELECT * FROM run_history WHERE runner_id= ($1);`;
    const queryValues = [ 
      req.params.runnerId
    ]
    pool.query(queryText,queryValues)
      .then((result) => { 
        console.log( 'Got user runs on server', result.rows );
        res.send(result.rows); })
      .catch((err) => {
        console.log('Error completing SELECT user runs query', err);
        res.sendStatus(500);
      });
  });


router.put('/:runId', (req, res) => {
  // req.body should contain a category_id to add to this favorite image
  const data = req.body;  const id = req.params.runId;
  console.log( `editing for run id ${id}`)
  const queryText = `UPDATE run_history
                      SET length = ($1), time = ($2), date = ($3)
                      WHERE id = ($4)`;
  const queryValues = [
    req.body.Miles,
    req.body.Time,
    req.body.Date,
    id
  ]
  pool.query(queryText, queryValues)
    .then(() => {res.sendStatus(201);})
    .catch((err) => {
      console.log('Error completing put category',err);
      res.sendStatus(500)
    })
});
router.post('/', (req, res) => {
  // req.body should contain a category_id to add to this favorite image
  console.log( `adding Run`)
  const queryText = `INSERT INTO run_history (runner_id, length, time, pace, date)
                      values ($1, $2, $3, 10, $4)`
  const queryValues = [
    req.body.runnerId,
    req.body.Miles,
    req.body.Time,
    req.body.Date,
  ]
  pool.query(queryText, queryValues)
    .then(() => {res.sendStatus(201);})
    .catch((err) => {
      console.log('Error completing post category',err);
      res.sendStatus(500)
    })
});

  module.exports = router;
