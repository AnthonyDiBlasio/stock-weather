// var stockUrl = "https://www.alphavantage.co/query?"
// var subBtn = $("#stockBtn");
// var apiKey = "U10T2CB0VFD6519Q"
// var params = {
//     apiKey: "&apikey=",
//     sym: "&symbol=",
//     func: "function=",
// }

var stockUrl = "https://www.alphavantage.co/query?"
var subBtn = $("#submitBtn");
var apiKey = "U10T2CB0VFD6519Q"
var params = {
    apiKey: "&apikey=",
    sym: "&symbol=",
    func: "function=TIME_SERIES_DAILY",
}

var weatherBtn = $(".weatherBtn")
var weatherURL = "http://api.weatherapi.com/v1/history.json?key=9b478461b78c4e22b3e04825221204&q=Philadelphia"

var weatherVal = $("#weather-types")

// function test(event) {
//     event.preventDefault();
//     fetch(stockUrl + params.func+ "TIME_SERIES_WEEKLY" + params.sym + "IBM" + params.apiKey + apiKey)
//         .then(function (response) {
//             return response.json();
//         })
//         .then(function (data) {
//             console.log(data);
//             console.log(data["Meta Data"]);
//             console.log(data["Meta Data"]["1. Information"]);
//             console.log(data["Weekly Time Series"]);
//             console.log(data["Weekly Time Series"]["1999-11-12"]);

//         });
// }

// subBtn.on("click", test)
// var myKey = "31f3c7fba0e24b5ad83d1dc92397b585";
// var myUnits = "imperial"
// function test2(event){
//     event.preventDefault(); 
// {
//       fetch(`https://api.openweathermap.org/data/2.5/weather?q=london&appid=${myKey}&units=${myUnits}`)
//         .then(function(response) {
//             return response.json();
//         })
//         .then(function(data) {
//             console.log(data);
//         })
//     }
// }


//  Weather Functions

function getStocks(data) {
    // event.preventDefault();
    var stocks = params.sym
    fetch(stockUrl + params.func+ params.sym + "IBM" + params.apiKey + apiKey)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // console.log(data);
            // console.log(data["Meta Data"]["1. Information"]);
            // console.log(moment().subtract(7, "days"));
            var last7Days = [];
        for(var i = 0; i < 7; i++) {

            var currentDate = moment().subtract(i, "day").format("YYYY-MM-DD")
            last7Days.push(currentDate);
            // if (currentDate== data["Time Series (Daily)"][i]){

            //     console.log(data["Time Series (Daily)"])
                
            // }
        }
        console.log(last7Days);
        var currentDate = moment().subtract(1, "day").format("YYYY-MM-DD")
        console.log(currentDate);
        console.log(data["Time Series (Daily)"])
    //    for ( var i = data["Time Series (Daily)"].length-1; i > data["Time Series (Daily)"].length-7;i--){
    //     console.log(data["Time Series (Daily)"][i]);
    //    }
    //     console.log(Object.keys(data["Time Series (Daily)"]));
        for(var key of Object.keys(data["Time Series (Daily)"])){
            if(last7Days.includes(key)){
                console.log(data["Time Series (Daily)"][key])
            }
        }


        });
}

weatherCondDates = []

function checkWeatherCond(event) {
    event.preventDefault();
    console.log(event);
    console.log(weatherVal.val())
    if (weatherVal === "null") {
        alert("you must choose a weather condition")
    } else if(weatherVal.val() === "hot") {
        getWeather()
    }
    // fetch(weatherURL)
    // .then(function(response) {
    //     return response.json();
    // })
    // .then(function(data){
    //     console.log(data);
    //     console.log(data.forecast.forecastday[0].date);
    //     console.log(data.forecast.forecastday[0].day.avgtemp_f + "\xB0F");
    //     console.log(data.forecast.forecastday[0].day.condition["text"]);
    //     checkTemp(data);
    //     console.log(moment().subtract(1, "day").format("YYYY-MM-DD"))
        // console.log(data["Daily Time Series"])
        // console.log(moment().subtract(7, "days"));
}

cityList = ['new york', 'los angeles', 'chicago', 'phoenix', 'houston']
function getWeather(event) {
    event.preventDefault();
    for(var i = 0; i < cityList.length; i++) {
        var weatherURL = `http://api.weatherapi.com/v1/history.json?key=9b478461b78c4e22b3e04825221204&q=${cityList[i]}`
        // fetch(weatherURL)
        // .then(function(response) {
        //     return response.json();
        // })
        // .then(function(data){
        //     console.log(data)
        // })
        console.log(cityList[i])
        console.log(weatherURL)
        for(var j = 6; j > 0; j--) {
            fetch(weatherURL + `&dt=${moment().subtract(j, "day").format("YYYY-MM-DD")}`)
            .then(function(response) {
                return response.json();
            })
            .then(function(data){
                console.log(data)
                checkTemp(data)
                getStocks(data)
            })
            
            // console.log(data["Daily Time Series"][moment().subtract(i, "day").format("YYYY-MM-DD")])
        }
    }
    // })
}

function checkTemp(data) { 
    var temp =data.forecast.forecastday[0].day.avgtemp_f
    if (temp < 32) {
        console.log("Freezing");
    } else if(temp < 50) {
        console.log("Cold");
    } else if(temp < 70) {
        console.log("Warm");
    } else if(temp < 85) {
        console.log("Hot");
    } else {
        console.log("Very Hot")
    }
}

// function cheackWeatherCond(weatherVal) {
//     if(weatherVal === "hot") {

//     }
// }
//  Stocks Functions
// console.log(moment().subtract(7, "days"));




// Event Listeners
weatherBtn.on("click", getWeather) 

var stockInput = $(".stock-input")
stockInput.on("click", getStocks)