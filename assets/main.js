var stockUrl = "https://www.alphavantage.co/query?"
var subBtn = $("#submitBtn");
//var apikey2=""
var apiKey = "U10T2CB0VFD6519Q"

var weatherBtn = $(".weatherBtn")
var weatherVal = $("#weather-types")
var params = {
    apiKey: "&apikey=",
    sym: "&symbol=",
    func: "function=TIME_SERIES_DAILY",
}

//  Weather Functions

rainCond = [1030, 1063, 1087, 1150, 1153, 1180, 1183, 1186, 1189, 1192, 1195, 1240, 1243, 1246, 1273, 1276]
snowCond =[1066, 1069, 1072, 1114, 1117, 1147, 1168, 1171, 1198, 1201, 1204, 1207, 1210, 1213, 1216, 1219, 1222, 1225, 1237, 1249, 1252, 1255, 1258, 1261, 1264, 1279, 1282]

function checkConditionRain(data) {
    var code = data.forecast.forecastday[0].day.condition.code;
    for( var i= 0; i< rainCond.length; i++) {
        if (code == rainCond[i]) {
            console.log("Rain");
            newYork.push(data.forecast.forecastday[0].date)
        } else {
            console.log("no condition met")
        }
    } 
};

function checkConditionSnow(data) {
    var code = data.forecast.forecastday[0].day.condition.code;
    for( var j = 0; j< snowCond.length; j++) {
        if (code == snowCond[j]) {
            console.log("Snow");
            newYork.push(data.forecast.forecastday[0].date)
        } else {
            console.log("no condition met")
        }
    }
    return
};

function checkTemp(data) {
    var temp =data.forecast.forecastday[0].day.avgtemp_f
    if (temp < 70) {
        console.log("Cold");
        newYork.push(data.forecast.forecastday[0].date)
    } else if(temp > 70) {
        console.log("Hot");
        newYork.push(data.forecast.forecastday[0].date)
    } else {
        console.log("no condition met")
    };
}

function checkWeatherCond(data) {
    if (weatherVal === "null") {
        alert("you must choose a weather condition")
    } else if(weatherVal.val() === "hot") {
        checkTemp(data)
    } else if(weatherVal.val() === "cold") {
        checkTemp(data)
    } else if(weatherVal.val() === "rainy") {
        checkConditionRain(data);
    } else if(weatherVal.val() === "snow") {
        checkConditionSnow(data)
    }
}

//  Stocks Functions

// this function will append the date to the html
function getDates(data) {
    for(var i =0; i < newYork.length; i++) {
        console.log(data)
        $(`#${data["Meta Data"]["2. Symbol"]}`).append(`<h1>${newYork[i]}</h1>`);
        // 
        // $("#content3").append(data["Time Series (Daily)"][newYork[i][".1 open"]]);
        $(`#${data["Meta Data"]["2. Symbol"]}`).append(`<h5>open:${data["Time Series (Daily)"][newYork[i]]["1. open"]}</h5>`);
        $(`#${data["Meta Data"]["2. Symbol"]}`).append(`<h6>close:${data["Time Series (Daily)"][newYork[i]]["4. close"]}</h6>`);
    }
}

function getStocks() {
    // event.preventDefault()
    var stocks = ["JPM", "VZ", "C", "MET", "PFE"]
    for(var i = 0; i<stocks.length; i++){
        fetch(stockUrl + params.func+ params.sym + stocks[i] + params.apiKey + apiKey)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // console.log(data["Time Series (Daily)"]["2022-04-18"])
            // $("#content3").append(data["Time Series (Daily)"][newYork[i]]);
            $(".card").append(`<div id = ${data["Meta Data"]["2. Symbol"]}><h1>${data["Meta Data"]["2. Symbol"]}</h1></div>`);
            getDates(data)
         
        })
       
    }
    
}


var newYork= []

function displayResults(event) {
    event.preventDefault();
    console.log(event);
    newYork= [];
    var weatherURL = `http://api.weatherapi.com/v1/history.json?key=9b478461b78c4e22b3e04825221204&q=new york}`
    for(var i = 6; i > 0; i--) {
        fetch(weatherURL + `&dt=${moment().subtract(i, "day").format("YYYY-MM-DD")}`)
        .then(function(response) {
            return response.json();
        })
        .then(function(data){
            if (weatherVal.val() === null) {
                // $( function() {
                //     $( "#dialog" ).dialog();
                //   } );
                return;
            } else {
                console.log(data)
                checkWeatherCond(data);
                
            }            
        })
    }
    getStocks()
}

// Event Listeners

$(".genData").on("click", displayResults)
$(".stock-input").on("click", getStocks)