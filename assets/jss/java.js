
// api f969ae2c4737df8d7f3f538180cd201c
//api to grab lat and lon
// https://api.openweathermap.org/data/2.5/weather?q={cityname}&appid={APIkey}

// feed lat and lon from above api key and pass through this api 
//https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}


//function for search parameter by city (geocoding) and pull lat and lon data

//store lat and lon
//grab by ID and pass template literal 
//example of template literal 
// `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${part}&appid=${apiKey}`

// GLOBAL VARIABLES
var userFormEl = document.querySelector(".cityInputEl")
var cityInputEl = document.querySelector(".inputValue");
var button = document.querySelector(".submitButton");
var searchStorage = new Array();
var listContainerEl = document.querySelector(".listNameLogLi");
var fiveDayEl = document.querySelectorAll(".fiveDay1");
// END GLOBAL VARIABLES

//function to handle form submission 
var formSubmitHandler = function(event){
    event.preventDefault();
    //grab value from input element
    var cityName = cityInputEl.value.trim();

    if (cityName){
        cityWeatherSearchHandler(cityName);
        //set to local storage
        searchStorage.push(cityName);
        localStorage.setItem(".cityNameLog", JSON.stringify(searchStorage));
        console.log(searchStorage);
        searchHistory(cityName);
            console.log(searchHistory);
    } else {
        alert("Please enter a location");
    }
    console.log(event);
};


// WEATHER SEARCH FUNCTION 
var cityWeatherSearchHandler = function(cityName){
    var openWeatherCityUrl = ('https://api.openweathermap.org/data/2.5/weather?q='+ cityName + '&units=imperial&appid=f969ae2c4737df8d7f3f538180cd201c');
    fetch(openWeatherCityUrl).then(function(response){
    //if request successful 
    if(response.ok){
        response.json().then(function(data){
            console.log(data);
            var lat = (data.coord.lat);
            var lon = (data.coord.lon);
            var searchName = (data.name);
            var weatherIcon = (data.weather[0].icon);
            //append name and icon
            displaySearchTerm(searchName, weatherIcon);
            //pass lat/lon into detailed api 
            var openWeatherLatLonUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=f969ae2c4737df8d7f3f538180cd201c`
                fetch(openWeatherLatLonUrl).then(function(response){
                    //if request successful 
                    if(response.ok){
                        response.json().then(function(data){
                            console.log(data);
                            //daily variables
                            var tempCurrent = (data.current.temp);
                            var windCurrent = (data.current.wind_speed);
                            var humCurrent = (data.current.humidity);
                            var uvCurrent = (data.current.uvi);
                            //append daily variables
                            displayCurrentWeather(tempCurrent, windCurrent, humCurrent, uvCurrent);
                            // catch 5 day forecast in for loop
                            for(let i = 0; i < 5; i++){
                            var fiveDay = (data.daily[i+1]);
                                var fiveTemp = (data.daily[i+1].temp.day);
                                var fiveWind = (data.daily[i+1].wind_speed);  
                                var fiveHum = (data.daily[i+1].humidity);                                   
                                var fiveIcon = (data.daily[i+1].weather[0].icon)                                  
                                var fiveDate = moment.unix(data.daily[i+1].dt).format('(MM/D/YYYY)');                 
                            var fiveDayDiv = (fiveDayEl[i]);
                            logFiveDay(fiveTemp, fiveWind, fiveHum, fiveDate, fiveIcon, fiveDayDiv);
                            }
                        })
                    } else {
                        console.log('error: '+ response.statusText);
                    }
                })
                .catch(function(error){
                    alert("Unable to connect to Open Weather API");
                })
        });
    } else {
        console.log('error: '+ response.statusText);
    }
})
};
// END WEATHER SEARCH FUNCTION 

// APPEND NAME ICON CURRENT DATE 
let displaySearchTerm = function(searchName, weatherIcon, currentDate){
    // moment.js current date 
    var currentDate = moment().format('(MM/D/YYYY)');
    // weather icon
    document.querySelector(".weatherIconDisplay").src = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";
   //append name and date
    document.querySelector(".searchName").textContent = searchName + " " + currentDate;
};
// END FUNCTION 


// APPEND CURENT WEATHER FUNCTION 
let displayCurrentWeather = function(tempCurrent, windCurrent, humCurrent, uvCurrent){
    document.querySelector(".temp").textContent = "Temp: " + tempCurrent + "°F";
    document.querySelector(".windCurrent").textContent = "Wind: " + windCurrent + " MPH";
    document.querySelector(".humidity").textContent = "Humidity: " + humCurrent + "%";
    document.querySelector(".uvIndex").textContent = "UV Index: " + uvCurrent;
    console.log(windCurrent); 
};
// END APPEND CURRENT WEATHER FUNCTION 

//FUNCTION FOR LOCAL STORAGE
var searchCityLog = document.querySelector(".listNameLogLi");
var searchHistory = function(){
    //check if list is empty
    if (searchStorage.length === 0){
        return;
    }
    //clear list 
    listContainerEl.innerHTML = "";
    //parse local storage array
    searchStorage = JSON.parse(localStorage.getItem(".cityNameLog"));
    for (let i = 0; i < searchStorage.length; i++){
        var searchedCity = document.createElement("li");
        searchedCity.textContent = searchStorage[i];
        searchCityLog.appendChild(searchedCity);
        
    }
}
// END FUNCTION FOR LOCAL STORAGE

// FUNCTION FOR FIVE DAY FORECAST DISPLAY

var logFiveDay = function(fiveTemp, fiveWind, fiveHum, fiveDate, fiveIcon, fiveDayDiv){
    //variables
    var fiveDayH4 = document.createElement("h4");
    var fiveDayImg = document.createElement("img");
    var fiveDayLi2 = document.createElement("p");
    var fiveDayLi3 = document.createElement("p");
    var fiveDayLi4 = document.createElement("p");
    //modify text content
    fiveDayH4.textContent = fiveDate;
    fiveDayImg.src = "http://openweathermap.org/img/wn/" + fiveIcon + "@2x.png";
    fiveDayLi2.textContent = "Temp: " + fiveTemp + "°F";
    fiveDayLi3.textContent = "Wind: " + fiveWind + " MPH";
    fiveDayLi4.textContent = "Humidity: " + fiveHum + "%";
    // append to div 
    fiveDayDiv.append(fiveDayH4, fiveDayImg, fiveDayLi2, fiveDayLi3, fiveDayLi4);
}
// ENDFUNCTION FOR FIVE DAY FORECAST DISPLAY
// logFiveDay();
searchHistory();
userFormEl.addEventListener("submit", formSubmitHandler);