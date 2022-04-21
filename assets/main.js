var stockUrl = "https://www.alphavantage.co/query?"
var subBtn = $("#submitBtn");
var apiKey3 = "1IJ0ELIHP9MOU66R"
var apiKey2= "BJHAE5GE3G9E1K2J"
var apiKey = "U10T2CB0VFD6519Q"
var hot = $("#hot");
var cold = $("#cold");
var rainy = $("#rainy");
var snow = $("#snow");
var hotDays = [];
var coldDays = [];
var rainyDays = [];
var snowyDays = [];
var weatherBtn = $(".weatherBtn");
var weatherVal = $("#weather-types");
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
    rainyDays=[]
    for( var i= 0; i< rainCond.length; i++) {
        if (code == rainCond[i]) {
            console.log("Rain");
            newYork.push(data.forecast.forecastday[0].date)
            console.log(rainyDays.includes(data.forecast.forecastday[0].date))
            if(rainyDays.includes(data.forecast.forecastday[0].date) === false) {
                rainyDays.push(data.forecast.forecastday[0].date)
            };
        } else {
            console.log("no condition met")
        }
    } 
};

function checkConditionSnow(data) {
    snowyDays=[]
    var code = data.forecast.forecastday[0].day.condition.code;
    for( var j = 0; j< snowCond.length; j++) {
        if (code == snowCond[j]) {
            console.log("Snow");
            newYork.push(data.forecast.forecastday[0].date)
            // console.log(snowyDays.includes(data.forecast.forecastday[0].date))
            // if(snowyDays.includes(data.forecast.forecastday[0].date) === false) {
            //     snowyDays.push(data.forecast.forecastday[0].date)
            // };
        } else {
            modal.style.display = "block";
        }
    }
    return
};

function checkTempCold(data) {
    hotDays=[]
    coldDays=[]
    var temp =data.forecast.forecastday[0].day.avgtemp_f
    if (temp < 70) {
        console.log("Cold");
        newYork.push(data.forecast.forecastday[0].date)
    } else {
     // Get the modal
var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
$(".genData").onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.on = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
    };
}

function checkTempHot(data) {
    hotDays=[]
    coldDays=[]
    var temp =data.forecast.forecastday[0].day.avgtemp_f
    if(temp > 70) {
        console.log("Hot");
        newYork.push(data.forecast.forecastday[0].date)
    } else {
        console.log("no condition met")
    };
}

// function checkWeatherCond(data) {
//     if (weatherVal === "null") {
//         alert("you must choose a weather condition")
//     }

var stocks = ["JPM", "VZ", "C", "MET", "PFE"]


function getDates(data) {
    stockDates = Object.keys(data["Time Series (Daily)"])
    for(var i =0; i < newYork.length; i++) {
        
        if(stockDates.includes(newYork[i])) {
            $(`#${data["Meta Data"]["2. Symbol"]}`).append(`<h1>${newYork[i]}</h1>`);
            // $("#content3").append(data["Time Series (Daily)"][newYork[i][".1 open"]]);
            $(`#${data["Meta Data"]["2. Symbol"]}`).append(`<h5>open:${data["Time Series (Daily)"][newYork[i]]["1. open"]}</h5>`);
            $(`#${data["Meta Data"]["2. Symbol"]}`).append(`<h5>close:${data["Time Series (Daily)"][newYork[i]]["4. close"]}</h5>`);
        }
    }
}

function getStocks() {
    // event.preventDefault()
    // var stocks = ["JPM", "VZ", "C", "MET", "PFE"]
    for(var i = 0; i<stocks.length; i++){
        fetch(stockUrl + params.func+ params.sym + stocks[i] + params.apiKey + apiKey2)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            $(".card").append(`<div id = ${data["Meta Data"]["2. Symbol"]}><h1>${data["Meta Data"]["2. Symbol"]}</h1></div>`);
            getDates(data)
            storeStocks(data)
        })
    }
}

function storeStocks(data) {
    var stockDates = Object.keys(data["Time Series (Daily)"]).slice(0, 7);
    $("#past-stocks").empty()
    for(var i = 0; i<stockDates.length; i++) {
        $("#past-stocks").append(`<li><button>${stockDates[i]}</button></li>`)
    }
    console.log(stockDates)
    for(var i = 0; i<stocks.length; i++) {
        console.log(stocks[i])
        for(var j =0; j <stockDates.length; j++) {
            var stockKey = data["Meta Data"]["2. Symbol"] + " " + stockDates[j];
            var dailyValues = data["Time Series (Daily)"][stockDates[j]]
            localStorage.setItem(stockKey, JSON.stringify(dailyValues))
        }
    }
}

function historyData(event) {
    event.preventDeafault();
    

}

// Display functions

var newYork= []

function displayResults(event) {
    event.preventDefault();
    choice = event.target;
    console.log(choice)
    $(".card").empty();
    console.log(event);
    newYork= [];
    var weatherURL = `http://api.weatherapi.com/v1/history.json?key=9b478461b78c4e22b3e04825221204&q=new york}`
    getStocks()
    for(var i = 6; i > 0; i--) {
        fetch(weatherURL + `&dt=${moment().subtract(i, "day").format("YYYY-MM-DD")}`)
        .then(function(response) {
            return response.json();
        })
        .then(function(data){
            if(choice.getAttribute("id") === "hot") {
                checkTempHot(data)
                console.log("hot!")
            } else if(choice.getAttribute("id") === "cold") {
                checkTempCold(data)
                console.log("cold!")
            } else if(choice.getAttribute("id") === "rainy") {
                checkConditionRain(data);
                console.log("rainy!")
            } else if(choice.getAttribute("id") === "snow") {
                checkConditionSnow(data)
                console.log("snowy!")
            }
        })
    }
    // getStocks()
    // $(".weatherParam").on("click", getStocks)
}
function displayHistory(event) {
    event.preventDefault();
}

// Event Listeners

$(".genData").on("click", displayResults);
// $(".weatherParam").on("click", getStocks)
