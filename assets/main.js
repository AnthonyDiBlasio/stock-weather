var stockUrl = "https://www.alphavantage.co/query?"
var apiKey4 = "EOSD65H8WUJT4FN6"
var apiKey3 = "1IJ0ELIHP9MOU66R"
var apiKey2= "BJHAE5GE3G9E1K2J"
var apiKey = "U10T2CB0VFD6519Q"
var hot = $("#hot");
var cold = $("#cold");
var rainy = $("#rainy");
var snow = $("#snow");
var weatherBtn = $(".weatherBtn");
var weatherVal = $("#weather-types");
var rainCond = [1030, 1063, 1087, 1150, 1153, 1180, 1183, 1186, 1189, 1192, 1195, 1240, 1243, 1246, 1273, 1276]
var snowCond =[1066, 1069, 1072, 1114, 1117, 1147, 1168, 1171, 1198, 1201, 1204, 1207, 1210, 1213, 1216, 1219, 1222, 1225, 1237, 1249, 1252, 1255, 1258, 1261, 1264, 1279, 1282]
var params = {
    apiKey: "&apikey=",
    sym: "&symbol=",
    func: "function=TIME_SERIES_DAILY",
}

//  Weather Functions

function checkConditionRain(data) {
    var code = data.forecast.forecastday[0].day.condition.code;
    for( var i= 0; i< rainCond.length; i++) {
        if (code == rainCond[i]) {
            newYork.push(data.forecast.forecastday[0].date)
        } 
    }
    return
};

function checkConditionSnow(data) {
    var code = data.forecast.forecastday[0].day.condition.code;
    snowyDays=[]
    for( var j = 0; j< snowCond.length; j++) {
        if (code == snowCond[j]) {
            newYork.push(data.forecast.forecastday[0].date)
        }
    }
    return
};

function checkTempCold(data) {
    var temp =data.forecast.forecastday[0].day.avgtemp_f
    if (temp <= 60) {
        newYork.push(data.forecast.forecastday[0].date)
    }
}

function checkTempHot(data) {
    var temp =data.forecast.forecastday[0].day.avgtemp_f
    if(temp > 60) {
        newYork.push(data.forecast.forecastday[0].date)
    }
}

//  Stocks Functions
// this function will append the date to the html
var stocks = ["JPM", "VZ", "C", "MET", "PFE"]
function getDates(data) {
    stockDates = Object.keys(data["Time Series (Daily)"])
    for(var i =0; i < newYork.length; i++) {
        if(stockDates.includes(newYork[i])) {
            $(`#${data["Meta Data"]["2. Symbol"]}`).append(`<h1>${newYork[i]}</h1>`);
            $(`#${data["Meta Data"]["2. Symbol"]}`).append(`<h2>open:${data["Time Series (Daily)"][newYork[i]]["1. open"]}</h2>`);
            $(`#${data["Meta Data"]["2. Symbol"]}`).append(`<h3>close:${data["Time Series (Daily)"][newYork[i]]["4. close"]}</h3>`);
        }
    }
}

async function getStocks() {
    for(var i = 0; i<stocks.length; i++){
        await fetch(stockUrl + params.func+ params.sym + stocks[i] + params.apiKey + apiKey4)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            stockDates = Object.keys(data["Time Series (Daily)"])
            for(var i = newYork.length-1; i < newYork.length; i++)
            if(stockDates.includes(newYork[i])) {
                $(".card").append(`<div class ="box" id =${data["Meta Data"]["2. Symbol"]}><h1>${data["Meta Data"]["2. Symbol"]}</h1></div>`);
                getDates(data)
           }
        })
    }
}

// Display functions
function storeLastCall() {
    var result = $(".card").get(0).outerHTML;
    localStorage.setItem("lastSearch", JSON.stringify(result));
}
var newYork= []
async function displayResults(event) {
    event.preventDefault();
    choice = event.target;
    $(".card").empty();
    newYork= [];
    var weatherURL = `https://api.weatherapi.com/v1/history.json?key=9b478461b78c4e22b3e04825221204&q=new york}`
    // getStocks();
    for(var i = 6; i > 0; i--) {
        await fetch(weatherURL + `&dt=${moment().subtract(i, "day").format("YYYY-MM-DD")}`)
        .then(function(response) {
            return response.json();
        })
        .then(function(data){
            if(choice.getAttribute("id") === "hot") {
                checkTempHot(data)
                // storeLastCall()
            } else if(choice.getAttribute("id") === "cold") {
                checkTempCold(data)
                // storeLastCall()
            } else if(choice.getAttribute("id") === "rainy") {
                checkConditionRain(data);
                // storeLastCall()
            } else if(choice.getAttribute("id") === "snow") {
                checkConditionSnow(data)
                // storeLastCall()
            }
        })
    }
    
    setTimeout(function() {
        getStocks();
    }, 1000);

    setTimeout(function() {
        if ($(".card")[0].innerHTML === ""){

            $(".card").append(` <div class="notification">
                <button class="delete"></button>
                The data for this weather type is unavailable! Please try another weather type.
              </div>
              `)
        }
    }, 2000);

    storeLastCall()
  
    // if ($(".card")[0].innerHTML === ""){

    //     $(".card").append(` <div class="notification">
    //         <button class="delete"></button>
    //         The data for this weather type is unavailable! Please try another weather type.
    //       </div>
    //       `)
    // }
}

function init() {
    var storedResult = JSON.parse(localStorage.getItem("lastSearch"));
    $(".card").append(storedResult)
}

$(".genData").on("click", displayResults)
init()

document.addEventListener('click', () => {
    (document.querySelectorAll('.notification .delete') || []).forEach(($delete) => {
      const $notification = $delete.parentNode;
  
      $delete.addEventListener('click', () => {
        $notification.parentNode.removeChild($notification);
      });
    });
  });