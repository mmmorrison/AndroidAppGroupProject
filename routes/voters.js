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
  console.log('*********req.body: ', req.body);
  console.log('******* req.body.votes', req.body.votes);
  PhotoSet().where(id, req.body.id).first().update('votes', req.body.votes).then(function(votes, err) {
    console.log('err = ', err);
    res.json({success: true});
  })
})






module.exports = router;
