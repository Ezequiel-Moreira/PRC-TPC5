var express = require('express')
var router = express.Router()
var axios = require('axios')

var endpoint = 'http://localhost:7200/repositories/'

// ------------------Tratamento dos pedidos-------
/* GET users listing. */
router.get('/input/:id', function(req, res) {
  res.render('getInput',{identity: req.params.id})
})

router.post('/input/:id', function(req, res){
    //TODO: voltar a ver isto quando tiver vários tipos disponiveis
    //obter query do texto
    var query = req.body.intext
    var encoded = encodeURIComponent(query)

    //debug
    console.log(query)
    console.log(encoded)

    //questionar o endpoint com a query
    axios.get(endpoint + req.params.id + '?query=' + encoded)
        .then((result) => {
            //se tivermos resultado, retornar para o ecra
            console.log(result.data.results.bindings)
            res.jsonp(result.data.results.bindings)
        }).catch((err) => {
            //caso contrário, mostrar erro
            //console.log(err)
            res.render('error',{message:"An error ocorred when trying to make the query",error:err})
        })
})

module.exports = router 
