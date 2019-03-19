var express = require('express')
var router = express.Router()
var axios = require('axios')

var endpoint = [
    'http://localhost:7200/repositories/tab-per-aula5',
    'https://dbpedia.org/sparql'
]

// ------------------Tratamento dos pedidos-------
/* GET users listing. */
router.get('/input', function(req, res) {
  res.render('getInput')
})

router.post('/input', function(req, res){
    var query = req.body.intext
    var encoded = encodeURIComponent(query)

    axios.get(endpoint[0] + '?query=' + encoded)
        .then((result) => {
            res.jsonp(result.data)
        }).catch((err) => {
            console.log(err)
        })
})

module.exports = router 
