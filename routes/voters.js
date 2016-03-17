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
  console.log('get route');
  PhotoSet().select().then(function(results) {
    res.json(results);
  })
});



router.post('/', function(req, res, next) {
  console.log('*********req.body: ', req.body);
  PhotoSet().update(req.body).then(function(votes, err) {
    console.log('err = ', err);
    res.json({success: true});
  })
})






module.exports = router;
