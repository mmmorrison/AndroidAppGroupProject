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

router.get('/register/:name/:password', function(req,res,next) {
  // If user exists, check that the password is correct.
  // If the password is correct, return the id,
  // otherwise return a failure status.
  Users().where('name', req.params.name).returning('id','password').then(function(results) {
    console.log("***********", req.params);
    if (results.length != 0) {
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(req.params.password, salt, function(err, hash) {
          bcrypt.compare(hash, results[0].password, function(err) {
            if (!err) {
              res.sendStatus(results[0].id.toString());
            } else {
              res.sendStatus("-1"); // wrong password
            }
          })
        })
      })
    } else {
      // Non-existing user
      // Hash the password and store it in the database
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(req.params.password, salt, function(err, hash) {
        Users().insert({name: req.params.name,
                     password: hash}).returning('id').then(function(results) {
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
