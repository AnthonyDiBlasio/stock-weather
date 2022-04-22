var stockUrl = "https://www.alphavantage.co/query?"
var subBtn = $("#submitBtn");
var apiKey4 = "EOSD65H8WUJT4FN6"
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
    // if (code != rainCond){
    //     $("body").append(` <div class="notification">
    //         <button class="delete"></button>
    //         Lorem ipsum dolor sit amet, consectetur
    //         adipiscing elit lorem ipsum dolor. <strong>Pellentesque risus mi</strong>, tempus quis placerat ut, porta nec nulla. Vestibulum rhoncus ac ex sit amet fringilla. Nullam gravida purus diam, et dictum <a>felis venenatis</a> efficitur.
    //       </div>
    //       `)
    // }
  
    
    rainyDays=[]
    for( var i= 0; i< rainCond.length; i++) {
        if (code == rainCond[i]) {
            console.log("Rain");
            newYork.push(data.forecast.forecastday[0].date)
            console.log(rainyDays.includes(data.forecast.forecastday[0].date))
        if(rainyDays.includes(data.forecast.forecastday[0].date) === false) {
                rainyDays.push(data.forecast.forecastday[0].date)
              
                console.log("no condition met")       
        } 
    
    }

};
}
function checkConditionSnow(data) {
    snowyDays=[]
    var code = data.forecast.forecastday[0].day.condition.code;
    // if (code != snowCond){
    //     $("body").append(` <div class="notification">
    //         <button class="delete"></button>
    //         Lorem ipsum dolor sit amet, consectetur
    //         adipiscing elit lorem ipsum dolor. <strong>Pellentesque risus mi</strong>, tempus quis placerat ut, porta nec nulla. Vestibulum rhoncus ac ex sit amet fringilla. Nullam gravida purus diam, et dictum <a>felis venenatis</a> efficitur.
    //       </div>
    //       `)
    // }
  
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
function checkTempCold(data) {
    hotDays=[]
    coldDays=[]
    var temp =data.forecast.forecastday[0].day.avgtemp_f
    if (temp < 60) {
        console.log("Cold");
        newYork.push(data.forecast.forecastday[0].date)
    } else {
       console.log("no condition met")
    };
}
function checkTempHot(data) {
    hotDays=[]
    coldDays=[]
    var temp =data.forecast.forecastday[0].day.avgtemp_f
    if(temp > 60) {
        console.log("Hot");
        newYork.push(data.forecast.forecastday[0].date)
    } else {
        console.log("no condition met")
    };
    
}
//  Stocks Functions
// this function will append the date to the html
//  *** Cal edit ***
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
            console.log(data)
           if(newYork.length>0) {
             $(".card").append(`<div class ="box" id =${data["Meta Data"]["2. Symbol"]}><h1>${data["Meta Data"]["2. Symbol"]}</h1></div>`);
            getDates(data)
            // storeStocks(data)
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
    console.log(choice)
    $(".card").empty();
    console.log(event);
    newYork= [];
    var weatherURL = `http://api.weatherapi.com/v1/history.json?key=9b478461b78c4e22b3e04825221204&q=new york}`
    getStocks();
    for(var i = 6; i > 0; i--) {
        await fetch(weatherURL + `&dt=${moment().subtract(i, "day").format("YYYY-MM-DD")}`)
        .then(function(response) {
            return response.json();
        })
        .then(function(data){
            if(choice.getAttribute("id") === "hot") {
                checkTempHot(data)
                storeLastCall()
                console.log("hot!")
            } else if(choice.getAttribute("id") === "cold") {
                checkTempCold(data)
                storeLastCall()
                console.log("cold!")
            } else if(choice.getAttribute("id") === "rainy") {
                checkConditionRain(data);
                storeLastCall()
                console.log("rainy!")
            } else if(choice.getAttribute("id") === "snow") {
                checkConditionSnow(data)
                storeLastCall()
                console.log("snowy!")
            }
            // storeLastCall()
        })
        // storeLastCall()
    }
    if (newYork===0){

        $(".card").append(` <div class="notification">
            <button class="delete"></button>
            Lorem ipsum dolor sit amet, consectetur
            adipiscing elit lorem ipsum dolor. <strong>Pellentesque risus mi</strong>, tempus quis placerat ut, porta nec nulla. Vestibulum rhoncus ac ex sit amet fringilla. Nullam gravida purus diam, et dictum <a>felis venenatis</a> efficitur.
          </div>
          `)
    }
    // if (checkTempCold(data)==null){
    //     $("body").append(` <div class="notification">
    //         <button class="delete"></button>
    //         Lorem ipsum dolor sit amet, consectetur
    //         adipiscing elit lorem ipsum dolor. <strong>Pellentesque risus mi</strong>, tempus quis placerat ut, porta nec nulla. Vestibulum rhoncus ac ex sit amet fringilla. Nullam gravida purus diam, et dictum <a>felis venenatis</a> efficitur.
    //       </div>
    //       `)
    // }
  
}
function init() {
    var storedResult = JSON.parse(localStorage.getItem("lastSearch"));
    $(".card").append(storedResult)
}

$(".genData").on("click", displayResults)
// $(".weatherParam").on("click", getStocks)
init()

document.addEventListener('click', () => {
    (document.querySelectorAll('.notification .delete') || []).forEach(($delete) => {
      const $notification = $delete.parentNode;
  
      $delete.addEventListener('click', () => {
        $notification.parentNode.removeChild($notification);
      });
    });
  });
