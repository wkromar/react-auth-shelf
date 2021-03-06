const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {rejectUnauthenticated} = require('../modules/authentication-middleware.js')

/**
 * Get all of the items on the shelf
 */
//rejectUnauth is middleware to check for login/not login
router.get('/', rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT * FROM "item";`
  pool.query(queryText).then((response)=>{
    console.log(response);
    res.send(response.rows);
  }).catch((error)=>{
    console.log(error);
    res.sendStatus(500);
  })
});

/**
 * Add an item for the logged in user to the shelf
 */
router.post('/', rejectUnauthenticated, (req, res) => {
  console.log('/shelf POST route');
  console.log(req.body);
  const queryText = `INSERT INTO  "item" ("description", "image_url", "user_id")
  VALUES ($1, $2, $3);`;
  pool.query(queryText, [req.body.newItem, req.body.newImgUrl, req.user.id])
  .then((result) => {
    res.sendStatus(200);
  })


  // endpoint functionality
});

/**
 * Delete an item if it's something the logged in user added
 */
router.delete('/delete/:id', rejectUnauthenticated, (req, res) => {
  // endpoint functionality
  const itemID = req.params.id;
  const queryText = `
    DELETE FROM "item"
    WHERE "id" = $1 AND "user_id" = $2
  `
  pool.query(queryText, [itemID, req.user.id])
  .then((response)=>{
    console.log(response);
    res.sendStatus(204);
  }).then((error)=>{
    console.log(error);
    res.sendStatus(403);
  })
});

/**
 * Update an item if it's something the logged in user added
 */
router.put('/:id', (req, res) => {
  // endpoint functionality
});

/**
 * Return all users along with the total number of items
 * they have added to the shelf
 */
router.get('/count', (req, res) => {
  // endpoint functionality
});

/**
 * Return a specific item by id
 */
router.get('/:id', (req, res) => {
  // endpoint functionality
});

module.exports = router;
