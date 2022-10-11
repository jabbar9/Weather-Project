const express = require("express");
const https = require('node:https');
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));    //used bodyparser to fetch data and to use it in POST method

app.get("/", function(req,res) {
    res.sendFile(__dirname +"/index.html");  //Directory of where our root folder is located
    
})

//POST method is used to post when recieved dataa
app.post("/" , function(req, res) {    

    const query = req.body.cityName;    //Request user inside body section there is a property called as name="cityName" in index.html which is an input
    const appKey = "c98aeb3953203c1cc055f83fad6529d4";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ appKey +"&units="+unit+"";

    //Using URL as a link to fetch api
    https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data) {
        const weatherData = JSON.parse(data);  //JSON.parse is used to convert hexa, binary or decimal data into string and then that string into an "OBJECT"
        const temp = weatherData.main.temp;
        const weatherDescription = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const imageURl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"        
        res.write("<p>The Weather is currently " +weatherDescription+ "</p>")
        res.write("<h1>The temperature in "+query+" is " +temp+ " degree celcius.</h1>")
        res.write("<img src="+imageURl+">");
    })
    })
})


app.listen(3000, function() {
    console.log("Server is  running on port 3000")
})