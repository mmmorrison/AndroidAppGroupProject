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

router.post('/register', function(req,res,next) {
  console.log("***********register initiated");

  Users().where('name', req.body.name).returning('id','password').then(function(results) {
    console.log("***********", typeof req.body);
    if (results.length != 0) {
      console.log("********results.length != 0");
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hash) {
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
      console.log("*********else");
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
