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

// router.get('/test/:id', function(req, res, next) {
//   Users().where({id: req.params.id}).then(function(users) {
//     Decisions().where('user_id, req.params.id').then(function(decisions) {
//       res.json(results)
//     })
//   })
// });

//
// router.get('/:id', function(req, res, next) {
//   Users().where({id: req.params.id}).first().then(function(users) {
//     PhotoSet().where('decision_id', req.params.id).then(function(photos) {
//       res.json(resource)
//     })
//   })
// });
//
// router.post('/', function(req, res, next) {
//   Decisions().insert(req.body).then(function() {
//     res.json({success: true
//     })
//   })
// })




module.exports = router;
