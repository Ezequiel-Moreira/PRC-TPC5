var express = require('express')
var router = express.Router()
var axios = require('axios')

var endpoint = [
    'http://localhost:7200/repositories/',
    'https://dbpedia.org/sparql'
]

// ------------------Tratamento dos pedidos-------
/* GET users listing. */
router.get('/input/:id', function(req, res) {
  res.render('getInput',{id: req.params.id})
})

router.post('/input/:id', function(req, res){
    var query = req.body.intext
    var encoded = encodeURIComponent(query)

    axios.get(endpoint[0] + req.params.id + '?query=' + encoded)
        .then((result) => {
            res.jsonp(result.data)
        }).catch((err) => {
            console.log(err)
        })
})

module.exports = router 
