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

router.get('/decisions/:id', function(req, res, next) {
  Users().where({id: req.params.id}).then(function (users) {
    Decisions().select().then(function(decisions) {
      res.json({"decisions":decisions})
    })
  })
})

router.get('/photoSet', function(req, res, next) {
    PhotoSet().select().then(function(photoSet) {
      res.json({"photos":photoSet})
    })
});


router.get('/:id', function(req, res, next) {
  var allPhotos = [];
  Users().where({id: req.params.id}).first().then(function(users) {
    Decisions().where('user_id', users.id).then(function(decisions) {
      decisions.forEach(function(decision) {
        PhotoSet().where('decision_id', decision.id).then(function(photos, index) {
          allPhotos.push(photos)
          if (index = photos.length-1) {
            res.json(photos);
          }
        })
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
