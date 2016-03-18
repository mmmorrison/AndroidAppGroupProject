var express = require('express');
var router = express.Router();
var knex = require('../db/knex.js');

function Users() {
  return knex('users');
}

function Decisions() {
  return knex('decision')
}

function PhotoSet() {
  return knex('photoSet')
}


/* GET home page. */
router.get('/', function(req, res, next) {
  PhotoSet().select().then(function(results) {
    res.json(results);
  })
});

router.post('/', function(req, res, next) {
  PhotoSet().insert(req.body).then(function(votes, err) {
    res.json({success: true});
  })
})






module.exports = router;
