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
  var crypted = bcrypt.hashSync(req.body.password, 10);
  Users().where('email', req.body.email).returning('id','password').then(function(results) {
    console.log("***********body", req.body);
    if (results.length != 0) {

      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hash) {
          console.log("**********HASH", hash);
          bcrypt.compare(hash, results[0].password, function(err) {
            console.log("***********RESULTS", results);
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
        Users().insert({email: req.body.email,
                     password: hash}).returning('id').then(function(results) {
                       console.log("****************HASH", hash);

                       res.sendStatus(results[0].id.toString())
                     })
                     .catch(function(error) {
            })
         })
      })
    }
  })
})

// router.post('/login', function(req, res, next) {
//   var crypted = bcrypt.hashSync(req.body.password, 8);
//   Users().insert({email: req.body.email, password: crypted}).then(function(val){
//     res.cookie("user", req.body.email);
//     res.redirect("/");
//   });
// });









module.exports = router;
