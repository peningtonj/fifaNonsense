
const mysql= require('mysql');
const express = require('express');
var bodyParser = require('body-parser')

 var connection = mysql.createConnection({
   host     : 'localhost',
   user     : 'root',
   database : 'fifa'
 });

 var app = express();
 app.use(bodyParser());
 app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE, FETCH');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

 app.get("/fifa/stats",function(req,res){
   console.log("Fifa Stats Get")
   var mySql = 'SELECT * FROM stats'
   connection.query(mySql, function(err, rows, fields) {
     if (err) throw err;
     res.send(rows)
   })
 });

 app.get("/fifa/teams",function(req,res){
   console.log("Fifa Teams Get")
   var mySql = 'SELECT * FROM teams GROUP BY name'
   connection.query(mySql, function(err, rows, fields) {
     if (err) throw err;
     res.send(rows)
   })
 });

 app.get("/fifa/whoops",function(req,res){
   var getid = 'SELECT MAX(id) AS id FROM fifa '
   connection.query(getid, function(err, rows, fields) {
     if (err) throw err;
     var mySql = 'DELETE FROM fifa WHERE id=' + rows[0].id
     connection.query(mySql, function(err, rows, fields) {
       if (err) throw err;
       res.send('')
   })
 })
});

 app.post("/fifa/teams",function(req,res){
   console.log("Fifa Teams Post")
   var mySql = 'INSERT INTO teams VALUES (\''+ req.body.team +'\')'
   connection.query(mySql, function(err, rows, fields) {
     if (err) throw err;
     res.send('')
   })
 });



 app.post("/fifa/stats",function(req,res){
   console.log("Fifa Stats Post")
   req.body.update.forEach(entry => {
     var mySql = 'UPDATE stats SET '
     + 'games = ' + entry.games + ', '
     + 'wins = ' + entry.wins + ', '
     + 'draws = ' + entry.draws + ', '
     + 'losses = ' + entry.losses + ', '
     + 'points = ' + entry.points + ', '
     + 'gf = ' + entry.gf + ', '
     + 'ga = ' + entry.ga + ', '
     + 'elo = ' + entry.elo
     + ' WHERE player = \'' + entry.player + '\''
     console.log(mySql)
     connection.query(mySql, function(err, rows, fields) {
       if (err) throw err;
       console.log("stats")
       console.log(rows)
     })
  })
   res.send('')
 });
 app.get("/fifa/all", function(req,res){
   console.log(req.body)
   var mysql = 'SELECT * FROM fifa WHERE id '
    + ' BETWEEN 0 '
    + 'AND (SELECT MAX(id) FROM fifa)'
    connection.query(mysql, function (err, result) {
      if (err) throw err;
      res.send(result)
    })
  });



 app.post("/fifa/recent", function(req,res){
   console.log("Fifa Recent Post")
   var mysql = 'SELECT * FROM fifa WHERE id '
    + ' BETWEEN (SELECT GREATEST (0, (SELECT MAX(id) FROM fifa) - '
    + req.body.num + ')) '
    + 'AND (SELECT MAX(id) FROM fifa)'
    connection.query(mysql, function (err, result) {
      if (err) throw err;
      res.send(result)
    })


 });

 app.post("/fifa/mysql", function(req,res){
   console.log("Fifa Add Game")
   var mySql = 'INSERT INTO fifa (id, home, homeTeam, away, awayTeam, homeScore, awayScore, played) VALUES (NULL,"' +
   req.body.home + '", "'   +
   req.body.homeTeam + '", "'   +
   req.body.away + '", "'   +
   req.body.awayTeam + '", "'   +
   req.body.homeScore + '", "'   +
   req.body.awayScore +'", "'   +
   req.body.date + '"'
   + ')';
   connection.query(mySql, function (err, result) {
     if (err) throw err;
   })
   res.send('')
 })

 app.listen(3001);
