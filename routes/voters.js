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

router.get('/decisions', function(req, res, next) {
  User().where({id: req.param})
    Decisions().select().then(function(decisions) {
      res.json(decisions)
    })
});

router.get('/photoSet', function(req, res, next) {
    PhotoSet().select().then(function(photoSet) {
      res.json(photoSet)
    })
});


router.get('/:id', function(req, res, next) {
  Users().where({id: req.params.id}).first().then(function(users) {
    Decisions().where('user_id', users.id).then(function(decisions) {
      PhotoSet().where('decision_id', decisions.id).then(function(photos) {
        res.json(photos)
      })
    })
  })
});

router.post('/', function(req, res, next) {
  Decisions().insert(req.body).then(function() {
    res.json({success: true
    })
  })
})




module.exports = router;