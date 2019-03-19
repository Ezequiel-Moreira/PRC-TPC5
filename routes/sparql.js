var express = require('express')
var router = express.Router()
var axios = require('axios')

//lugar onde os repositorios do graphdb estão em
var endpoint = 'http://localhost:7200/repositories/'


router.get('/input/:id', function(req, res) {
  res.render('getInput',{identity: req.params.id})
})

router.post('/input/:id', function(req, res){
    //obter query do texto
    var query = req.body.intext
    //codificar query 
    var encoded = encodeURIComponent(query)

    //obter formato da resposta
    var format = req.body.selection
    //criar header para formatar resposta
    var headerFormat = "application/sparql-results+" + format


    //questionar o endpoint com a query e o header correto
    axios.get(endpoint + req.params.id + '?query=' + encoded,{'headers': { 'Accept': headerFormat }} )
        .then((result) => {
            //se tivermos resultado, retornar no formato apropriado
            if(format == 'json'){
                res.jsonp(result.data)
            }else{
                res.set('Content-Type', 'text/xml')
                res.send(result.data)
            }
        }).catch((err) => {
            //caso contrário, mostrar erro
            res.render('error',{message:"An error ocorred when trying to make the query",error:err})
        })
})

module.exports = router 
