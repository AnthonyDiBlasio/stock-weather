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
// var weatherURL = "http://api.weatherapi.com/v1/history.json?key=9b478461b78c4e22b3e04825221204&q=Philadelphia"

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


function getStocks(data) {
    // event.preventDefault();
    var stocks = ["GOOG","AMZN","TSLA","AAPL","JPM"]
    for(var i = 0;i<stocks.length;i++){
        fetch(stockUrl + params.func+ params.sym + stocks[i] + params.apiKey + apiKey)
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


// function checkTemp(data) { 


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


rainCond = [1030, 1063, 1087, 1150, 1153, 1180, 1183, 1186, 1189, 1192, 1195, 1240, 1243, 1246, 1273, 1276]
snowCond =[1066, 1069, 1072, 1114, 1117, 1147, 1168, 1171, 1198, 1201, 1204, 1207, 1210, 1213, 1216, 1219, 1222, 1225, 1237, 1249, 1252, 1255, 1258, 1261, 1264, 1279, 1282]

function checkCondition(data) {
    var code = data.forecast.forecastday[0].day.condition.code;
    for( var i= 0; i< rainCond.length; i++) {
        if (code == rainCond[i]) {
            console.log("Rain");
        } 
    }  
    for( var j = 0; j< snowCond.length; j++) {
        if (code == snowCond[j]) {
                console.log("Snow");
        }
    }
    return
};

function checkTemp(data) {
    var temp =data.forecast.forecastday[0].day.avgtemp_f
    if (temp < 40) {
        console.log("Cold");
    } else if(temp > 70) {
        console.log("Hot");
    } else {
        return
    };
}

function displayResults(event) {
    event.preventDefault();
    console.log(event);
    for(var i = 0; i < cityList.length; i++) {
        var weatherURL = `http://api.weatherapi.com/v1/history.json?key=9b478461b78c4e22b3e04825221204&q=${cityList[i]}`
        for(var j = 6; j > 0; j--) {
            fetch(weatherURL + `&dt=${moment().subtract(j, "day").format("YYYY-MM-DD")}`)
            .then(function(response) {
                return response.json();
            })
            .then(function(data){
                // console.log(data)
                if (weatherVal.val() === null) {
                    // weatherVal.dialogue({dialogueClass})
                    alert("you must choose a weather condition");
                } else {
                    checkCondition(data);
                    checkTemp(data);
                }
                // console.log(data.forecast.forecastday[0].day.condition.code)
                
            })
        }
    }
}
// Event Listeners
weatherBtn.on("click", getWeather) 

var stockInput = $(".stock-input")
stockInput.on("click", getStocks)

$(".genData").on("click", displayResults)