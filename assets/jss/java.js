
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

var userFormEl = document.querySelector(".cityInputEl")
var cityInputEl = document.querySelector(".inputValue");
var button = document.querySelector(".submitButton");

//function to handle form submission 
var formSubmitHandler = function(event){
    event.preventDefault();
    //grab value from input element
    var cityName = cityInputEl.value.trim();

    if (cityName){
        cityWeatherSearchHandler(cityName);
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
    var currentDate = moment().format('(d/m/YYYY)');
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
}
// END APPEND CURRENT WEATHER FUNCTION 

userFormEl.addEventListener("submit", formSubmitHandler);