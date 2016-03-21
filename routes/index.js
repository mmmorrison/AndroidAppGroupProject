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
  Users().select().then(function(results) {
    res.json(results);
  })
});

router.get('/new', function(req, res, next) {
  Decisions().select().then(function(results) {
    res.json(results);
  })
});

router.get('/edit/:id', function(req, res, next) {
  Decisions().select().then(function(results) {
    res.json(results);
  })
});

router.post('/new', function (req, res, next) {
  Decisions().insert(req.body).then(function(photos) {
    res.json(photos)
  })
})

router.post('/edit/:id', function (req, res, next) {
  Decisions().where('id', req.params.id).first().update(req.body).then(function(photos) {
    console.log("*******************");
    console.log(req.body);
    console.log("*******************");
    res.json(photos)
  })
})

module.exports = router;
