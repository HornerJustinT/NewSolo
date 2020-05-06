const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const axios = require("axios");
// require("dotenv").config();

/**
 * GET route template
 */




// router.get('/:token', (req, res) => {
//   console.log('in get', req.params.token)
//     axios.get(`https://dev-e8l8uqk7.auth0.com/api/v2/users`, {headers: {authorization: `Bearer ${req.params.token}`}})
//       .then((result) => { 
//         console.log( 'Got users on server', result.rows );
//         res.send(result.rows); })
//       .catch((err) => {
//         console.log('Error completing get users', err);
//         res.sendStatus(500);
//       });
//   });
router.get('/:name', (req, res) => {
  console.log('in check login', req.params.name)
  const queryText = `SELECT * FROM users WHERE user_name= ($1);`;
  const queryValues = [ 
    req.params.name
  ]
  pool.query(queryText,queryValues)
    .then((result) => { 
      console.log( 'Got user check on server', result.rows );
      res.send(result.rows); })
    .catch((err) => {
      console.log('Error completing SELECT favorite query', err);
      res.sendStatus(500);
    });
});


// // search and returns searched images
// router.get('/:id', (req, res) => {
//     axios.get(`http://api.giphy.com/v1/gifs/search?q=${req.params.id}&api_key=${process.env.GIPHY_API_KEY}&limit=5`).then((response) => {
//       res.send(response.data);
//     }).catch( err => {
//       res.sendStatus(500);
//     });
//   })

// module.exports = router;

/**
 * POST route template
 */
router.put("/:userName", (req, res) => {
  console.log('in addUser', req.params.userName)
  const queryText = `INSERT INTO users (user_name) VALUES ($1);`;
  const queryValues = [ 
    req.params.userName
  ]
  pool.query(queryText,queryValues)
    .then((result) => { 
      console.log( 'add user  on server', result.rows );
      res.send(result.rows); })
    .catch((err) => {
      console.log('Error completing add user query', err);
      res.sendStatus(500);
    });
});

module.exports = router;
