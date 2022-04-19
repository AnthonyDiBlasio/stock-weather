var stockUrl = "https://www.alphavantage.co/query?"
var subBtn = $("#submitBtn");
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

function getStocks(data) {
    var stocks = ["GOOG","AMZN","TSLA","AAPL","JPM"]
    for(var i = 0;i<stocks.length;i++){
        fetch(stockUrl + params.func+ params.sym + stocks[i] + params.apiKey + apiKey)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var last7Days = [];
            for(var i = 0; i < 7; i++) {

            var currentDate = moment().subtract(i, "day").format("YYYY-MM-DD")
            last7Days.push(currentDate);
            }
        })
        console.log(last7Days);
        var currentDate = moment().subtract(1, "day").format("YYYY-MM-DD")
        console.log(currentDate);
        console.log(data["Time Series (Daily)"])
        for(var key of Object.keys(data["Time Series (Daily)"])){
            if(last7Days.includes(key)){
                console.log(data["Time Series (Daily)"][key])
            }
        }
    }
    
}
    
// Render Function

var newYork= []

function displayResults(event) {
    event.preventDefault();
    console.log(event);
    newYork= [];
    var weatherURL = `http://api.weatherapi.com/v1/history.json?key=9b478461b78c4e22b3e04825221204&q=philadelphia}`
    for(var j = 6; j > 0; j--) {
        fetch(weatherURL + `&dt=${moment().subtract(j, "day").format("YYYY-MM-DD")}`)
        .then(function(response) {
            return response.json();
        })
        .then(function(data){

            if (weatherVal.val() === null) {
                alert("you must choose a weather condition");
                return;
            } else {
                console.log(data)
                checkWeatherCond(data);
            }            
        })
    }
}

// Event Listeners

$(".genData").on("click", displayResults)