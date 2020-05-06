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

  module.exports = router;
