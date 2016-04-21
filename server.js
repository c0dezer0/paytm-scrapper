var express = require('express');
var app = express();
var fs = require('fs');
var request = require('request');
var bodyParser = require('body-parser');
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


var baseUrl = 'https://catalog.paytm.com/v1/g/electronics/computers-accessories/laptops';
//var query = '?page_count=1&items_per_page=3&resolution=960x720&quality=high&skipFilters=1&_type=1&sort_popular=1&cat_tree=1&callback=angular.callbacks._d&channel=web&version=2';

app.get('/', function(res, res) {
    res.render('index');
})
app.post('/', function(req, res) {
    var query = '?resolution=960x720&quality=high';
    query += req.body.items && req.body.items <= 30 ? "&items_per_page=" + req.body.items : "&items_per_page=30";
    query += req.body.page && req.body.page <= 30 ? "&page_count=" + req.body.page : "$page_count=1";
    request.get(baseUrl + query, function(err, response, body) {
        if (!err) {
            //console.log(body);
            var laptops = JSON.parse(body).grid_layout;
            // writing to the file 
            console.log(laptops.length);
            fs.writeFile('laptops.json', JSON.stringify(laptops), function(err) {
                res.send(laptops);
            })
           // console.log(JSON.parse(body));
        }
    })
})
app.listen(9000, function() {
    console.log("server running at port : 9000");
})
