// api f969ae2c4737df8d7f3f538180cd201c
//api to grab lat and lon
// https://api.openweathermap.org/data/2.5/weather?q={cityname}&appid={APIkey}

// feed lat and lon from above api key and pass through this api 
//https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}


//function for search parameter by city (geocoding) and pull lat and lon data

//store lat and lon
//grab by ID and pass template literal 
//example of template literal 
`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${part}&appid=${apiKey}`