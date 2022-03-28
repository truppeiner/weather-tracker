
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

// var cityName = document.getElementsByClassName("inputValue");
var cityName = ("Miami");
var button = document.getElementsByClassName("submitButton")

var openWeatherCityUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=f969ae2c4737df8d7f3f538180cd201c`;



fetch(openWeatherCityUrl).then(function(response){
    //if request successful 
    if(response.ok){
        response.json().then(function(data){
            console.log(data);
            var lat = (data.coord.lat);
            var lon = (data.coord.lon);
            //pass lat/lon into detailed api 
            var openWeatherLatLonUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=f969ae2c4737df8d7f3f538180cd201c`
                fetch(openWeatherLatLonUrl).then(function(response){
                    //if request successful 
                    if(response.ok){
                        response.json().then(function(data){
                            console.log(data);
                        })
                    } else {
                        console.log('error: '+ response.statusText);
                    }
                })
        });
    } else {
        console.log('error: '+ response.statusText);
    }
})

