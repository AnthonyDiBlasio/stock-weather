var stockUrl = "https://www.alphavantage.co/query?"
var subBtn = $("#stockBtn");
var apiKey = "U10T2CB0VFD6519Q"
var params = {
    apiKey: "&apikey=",
    sym: "&symbol=",
    func: "function=",
}

var stockUrl = "https://www.alphavantage.co/query?"
var subBtn = $("#submitBtn");
var apiKey = "U10T2CB0VFD6519Q"
var params = {
    apiKey: "&apikey=",
    sym: "&symbol=",
    func: "function=",
}

var weatherBtn = $(".weatherBtn")
var weatherURL = "http://api.weatherapi.com/v1/history.json?key=9b478461b78c4e22b3e04825221204&q=Philadelphia&dt=2022-04-10"

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

function test(event) {
    event.preventDefault();
    fetch(stockUrl + params.func+ "TIME_SERIES_WEEKLY" + params.sym + "IBM" + params.apiKey + apiKey)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            console.log(data["Meta Data"]);
            console.log(data["Meta Data"]["1. Information"]);
            console.log(data["Weekly Time Series"]);
            console.log(data["Weekly Time Series"]["1999-11-12"]);

        });
}

function getWeather(event) {
    event.preventDefault();
    fetch(weatherURL)
    .then(function(response) {
        return response.json();
    })
    .then(function(data){
        console.log(data);
        console.log(data.forecast.forecastday[0].date);
        console.log(data.forecast.forecastday[0].day.avgtemp_f + "\xB0F");
        console.log(data.forecast.forecastday[0].day.condition["text"]);
        checkTemp(data);
    })
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

//  Stocks Functions




// Event Listeners
subBtn.on("click", test)
weatherBtn.on("click", function(event){
    test(event);
    getWeather(event);
    
})
