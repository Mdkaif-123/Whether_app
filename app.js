const express = require('express')

const app = express();

const bodyParser = require('body-parser')
const port = 3000;

const https = require('https');
const { toNamespacedPath } = require('path');
const { urlToHttpOptions } = require('url');

app.use(bodyParser.urlencoded({extended:true}))
app.get('/',(req,res)=>{

    res.sendFile(__dirname+ "/index.html");
})

app.post('/' ,(req,res)=>{
const query =req.body.cityName;
const id="f696fc6ed8a09dcc7d64b8b4c73f6ad4";
const unit = "metric";


const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ id +"&units="+ unit ;
https.get(url, (response)=>{

    response.on('data' ,function(data){

        console.log(response.statusCode)
        const whetherData = JSON.parse(data);

        const temp = whetherData.main.temp;
        const description = whetherData.weather[0].description;
        const icon = whetherData.weather[0].icon;
        const img = "https://openweathermap.org/img/wn/"+icon+"@2x.png"; 

        console.log(temp)
        console.log(description)
        res.write("<p>The Weather is currently " + description+ "</p>")
        res.write("<h1>The temprature in "+query+" is " + whetherData.main.temp + " Degree Celcious</h1>")
        res.write("<img src="+ img +">");
        res.send();
    })
    // res.send("The temprature in Asansol is" + whetherData.main.temp + "Degree Celcious</h1>")
})
})


app.listen(port ,()=>{
    console.log('port is running in ' + port)
})