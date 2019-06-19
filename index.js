const http = require("http");
const axios = require("axios");
const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");
const app     = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "client/build")));

const movieUrl = "http://api.themoviedb.org/3/movie/";
const movieApiKey = "?api_key=2670c7f2a19f27bddd5ef60802a27d1c";

//production mode
if(process.env.NODE_ENV === "production") {  
    app.get("*", (req, res) => {    
        res.sendFile(path.join(__dirname +"/client/public/index.html"));  
    });
}
else{
    //build mode
    app.get("*", (req, res) => {  res.sendFile(path.join(__dirname+"/client/public/index.html"));});
}


//allow cross origin
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//get popular movies
app.post("/movies/popular", function(req, res){
    axios.get(movieUrl + "popular" + movieApiKey)
    .then(response => {
        res.send(response.data);
    })
    .catch(error => {
        res.send(null);
    })
});

//get popular movies
app.post("/movies/top_rated", function(req, res){
    axios.get(movieUrl + "top_rated" + movieApiKey)
    .then(response => {
        res.send(response.data);
    })
    .catch(error => {
        res.send(null);
    })
});

//search movies
app.post("/movies/search", function(req, res){
     axios.get("https://api.themoviedb.org/3/search/movie" + movieApiKey + "&query=" + req.query.search)
     .then(response => {
         res.send(response.data);
     })
     .catch(error => {
         res.send(null);
     })
 });

 //get movie detail
 app.post("/movies/detail", function(req, res){
    axios.get(movieUrl + req.query.id + movieApiKey)
    .then(response => {
        res.send(response.data);
    })
    .catch(error => {
        res.send(null);
    })
});

 //discover movies
app.post("/movies/discover", function(req, res){
    axios.get("https://api.themoviedb.org/3/movie/upcoming?api_key=2670c7f2a19f27bddd5ef60802a27d1c&language=en-US&page=1")
    .then(response => {
        res.send(response.data);
    })
    .catch(error => {
        res.send(null);
    })
});


//get keywords
app.post("/keywords", function(req, res){
    axios.get(movieUrl + req.query.id + "/keywords" + movieApiKey)
    .then(response => {
        res.send(response.data);
    })
    .catch(error => {
        res.send(null);
    })
});

var port = process.env.PORT || 8085;
//start server
app.listen(port, function () {
    console.log("Express server listening on port " + port);
});
exports = module.exports = app;