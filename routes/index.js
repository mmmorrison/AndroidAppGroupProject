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
//   Learning().where({id: req.params.id}).then(function(results) {
//     Comments().where('learning_id, req.params.id').then(function(comments) {
//       resource.comments = comments;
//       res.json(results)
//     })
//   })
// });

//
// router.get('/:id', function(req, res, next) {
//   Learning().where({id: req.params.id}).first().then(function(resource) {
//     Comments().where('learning_id', req.params.id).then(function(comments) {
//       resource.comments = comments;
//       res.json(resource)
//     })
//   })
// });
//
// router.post('/', function(req, res, next) {
//   Learning().insert(req.body).then(function() {
//     res.json({success: true
//     })
//   })
// })




module.exports = router;
