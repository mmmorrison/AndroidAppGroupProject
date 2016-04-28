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
  bcrypt.genSalt(10, function(err, salt) {
   bcrypt.hash(req.params.password, salt, function(err, hash) {
     if (!err) {
       Users.insert({name: req.params.name,
                    password: hash}).then(function() {
                      res.send({status: "success"})
                    })
      } else {
          res.send({status: "failure"})
      }
    })
   });
 });






module.exports = router;
