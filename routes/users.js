var express = require('express');
var router = express.Router();
var knex = require('../db/knex.js');
var bcrypt = require('bcryptjs');

function Users() {
  return knex('users')
}



/* GET users listing. */
router.get('/', function(req, res, next) {
  Users().select().then(function(results) {
    res.json(results);
  })
});

router.get('/register', function (req, res, next) {
  res.send("at the register page")
})

router.post('/register', function(req,res,next) {
  Users().where('name', req.body.name).returning('id','password').then(function(results) {
    console.log("***********body", req.body);
    if (results.length != 0) {

      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hash) {
          bcrypt.compare(hash, results[0].password, function(err) {
            if (!err) {
              res.sendStatus(results[0].id.toString());
            } else {
              res.sendStatus("-1");
            }
          })
        })
      })

    } else {

      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hash) {
        Users().insert({name: req.body.name,
                     password: req.body.password}).returning('id').then(function(results) {
                       res.sendStatus(results[0].id.toString())
                     })
                     .catch(function(error) {
            })
         })
      })
    }
  })
})









module.exports = router;
