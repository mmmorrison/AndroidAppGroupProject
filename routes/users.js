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
       Users().insert({name: req.params.name,
                    password: hash}).returning('id').then(function(results) {
                      res.send({status: "success",
                                id: results[0]})
                    })
                    .catch(function(error) {
                      console.log('err: ', error);
                      res.send({status: "failure"})
                    })
      } else {
          res.send({status: "failure"})
      }
    })
   });
 });

//  return trx.insert(info).into('books');
//       });
//     });
//
// })
// .then(function(inserts) {
//   console.log(inserts.length + ' new books saved.');
// })
// .catch(function(error) {
//   // If we get here, that means that neither the 'Old Books' catalogues insert,
//   // nor any of the books inserts will have taken place.
//   console.error(error);
// });





module.exports = router;
