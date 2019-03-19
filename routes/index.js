var express = require('express')
var router = express.Router()
var axios = require('axios')

/* GET home page. */
router.get('/', function(req, res) {
  //ask graphDB for the list of repositories
  axios.get('http://localhost:7200/repositories')
      .then((result) => {
        //if we get them, render main page with the list
        res.render('index',{title:"TPC5",repositories:result.data.results.bindings})
      }).catch((err) => {
        //if not, show an error in the page
        res.render('error',{message:"An error ocorred when trying to get repositories",error:err})
      })
})

module.exports = router
