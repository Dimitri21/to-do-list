const express = require('express')
var bodyParser = require('body-parser')

var {sequelize,  ListContent} = require('./models')
const app = express()

app.use(bodyParser.json())

// app.get('/', function (req, res) {
//   res.send('Hello World!')
// })

app.get('/api/todo', function(req, res){
    ListContent.findAll({raw:true})
    .then(function(data){
        res.json(data)
    })
})

app.post('/api/todo', function(req, res){
    ListContent.create({
        title: req.body.title,
        status: req.body.status
    })
    .then(function(){
        return ListContent.findAll({raw:true})
    })
    .then(function(data){
        res.json(data)
    })
    .catch(function(){
    })
})

app.put('/api/mark/set/inactive/:id', function(req, res){
    ListContent.update({
        status: "inactive"
    },{
        where: {
            id: req.params.id
        }
    })
    .then(function() {
        return ListContent.findAll({raw:true})
    })
    .then(function(data){
        res.json(data)
    })
    .catch(function(){
        
    })
})

app.put('/api/mark/set/active/:id', function(req, res){
    ListContent.update({
        status: "active"
    },{
        where: {
            id: req.params.id
        }
    })
    .then(function(){
        return ListContent.findAll({raw:true})
    })
    .then(function(data){
        res.json(data)
    })
    .catch(function(){

    })
})

app.delete('/api/delete/:id', function(req, res){
    ListContent.destroy({
        where: {
           id: req.params.id
        }
    })
    .then(function(){
        return ListContent.findAll({raw:true})
    })
    .then(function(data){
        res.json(data)
    })
    .catch(function(){
        res.json({success: 0})
    })

})
app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
})