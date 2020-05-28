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
  const data = req.body;  const id = req.params.runId;
  console.log( `editing for run id ${id}`)
  console.log( `editing for run id time is ${req.body.Time}`)
  console.log( `editing for run id length is ${req.body.Miles}`)
  const queryText = `UPDATE run_history
                      SET "length" = ($1), "time" = ($2), "pace" = (CONCAT(FLOOR(CAST($2 AS real)/CAST($1 AS real)), ':', (FLOOR(60.0*(MOD(CAST($2 AS integer),CAST($1 AS integer))/CAST($1 AS real)))))) ,"date" = ($3)
                      WHERE id = ($4);`
  const queryValues = [
    req.body.Miles,
    req.body.Time,
    req.body.Date,
    id
  ]
  pool.query(queryText, queryValues)
    .then(() => {res.sendStatus(201);})
    .catch((err) => {
      console.log('Error completing put run',err);
      res.sendStatus(500)
    })
});
router.delete('/:runId', (req, res) => {
  const id = req.params.runId;
  console.log( `editing for run id ${id}`)
  const queryText = `DELETE FROM run_history
                      WHERE id = ($1);`
  const queryValues = [
    id
  ]
  pool.query(queryText, queryValues)
    .then(() => {res.sendStatus(201);})
    .catch((err) => {
      console.log('Error completing delete ',err);
      res.sendStatus(500)
    })
});
router.post('/', (req, res) => {
  // req.body should contain a category_id to add to this favorite image
  console.log( `adding Run`)
  const queryText = `INSERT INTO run_history (runner_id, length, time, pace, date)
                      values ($1, $2, $3, CONCAT(FLOOR(CAST($3 AS real)/CAST($2 AS real)), ':', (FLOOR(60.0*(MOD(CAST($3 AS integer),CAST($2 AS integer))/CAST($2 AS real))))), $4); `
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
