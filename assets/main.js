var stockUrl = "https://www.alphavantage.co/query?"
var subBtn = $("#submitBtn");
var apiKey = "U10T2CB0VFD6519Q"
var params = {
    apiKey: "&apikey=",
    sym: "&symbol=",
    func: "function=",
}

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

subBtn.on("click", test)