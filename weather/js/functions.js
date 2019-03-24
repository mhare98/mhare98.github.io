/* **********************************
* Weather Site JavaScript Functions
*************************************/
//build functions

const temp = 31;
const speed = 5;
buildWC(speed, temp);

const direction = "NNE";
windDial(direction);

const weatherType = "Raining"
let fixedWeatherType = getCondition(weatherType);

convertMeters(1514.246);

changeSummaryImage(fixedWeatherType);

var idHeader = {
    headers: {
      "User-Agent": "Student Learning Project - har16064@byui.edu"
    }
  };


let storage = window.localStorage;



//Calculate Wind Chill
function buildWC(speed, temp)
{
    const feelTemp = document.getElementById('feelTemp');

    let wc = 35.74 + 0.6215 * temp - 35.75 * Math.pow(speed, 0.16) + 0.4275 * temp * Math.pow(speed, 0.16);
    wc = Math.floor(wc);

    //if chill is greater than temp use temp
    wc = (wc> temp)?temp:wc;

    console.log( "wind chill: " + wc);
    feelTemp.innerHTML = wc;
}

//Wind Dial function
function windDial(direction)
{
    const dial = document.getElementById("windpic");

    switch (direction){
        case "North":
        case "N":
         dial.setAttribute("class", "n"); //"n" is the CSS rule selector
         break;
        case "NE":
        case "NNE":
        case "ENE":
         dial.setAttribute("class", "ne");
         break;
        case "NW":
        case "NNW":
        case "WNW":
         dial.setAttribute("class", "nw");
         break;
        case "South":
        case "S":
         dial.setAttribute("class", "s");
         break;
        case "SE":
        case "SSE":
        case "ESE":
         dial.setAttribute("class", "se");
         break;
        case "SW":
        case "SSW":
        case "WSW":
         dial.setAttribute("class", "sw");
         break;
        case "East":
        case "E":
         dial.setAttribute("class", "e");
         break;
        case "West":
        case "W":
         dial.setAttribute("class", "w");
         break;
       }
}

//convert to known conditions
function getCondition(weatherType)
{
 let output = "";
    switch (weatherType)
    {
        case "Overcast":
        case "Cloudy":
            output = "cloudy";
            break;
        case "Wet Weather":
        case "Raining":
        case "Rain":
        case "Thunderstorms":
        case "Chance Rain Showers":
            output = "rain";
            break;
        case "Snowing":
        case "Blizzard":
        case "Snow":
            output = "snow";
            break;
        case "Bright":
        case "Sunny":
        case "Fair":
        case "Clear":
            output = "clear";
            break;
        case "Dense":
        case "Fog":
            output = "fog"
            break;
    }
    console.log(output);
    return output;
}

//change the sum image
function changeSummaryImage(weatherType)
{
    const picture = document.getElementById("status");
    const label = document.getElementById("sumlabel")
    switch (weatherType)
    {
        case "clear":
            picture.setAttribute("class", "clear");
            label.innerText = "Clear";
            break;
        case "rain":
            picture.setAttribute("class", "rain");
            label.innerText = "Rain";
            break;
        case "snow":
            picture.setAttribute("class", "snow");
            label.innerText = "Snow";
            break;
        case "fog":
            picture.setAttribute("class", "fog");
            label.innerText = "Fog";
            break;
        case "cloudy":
            picture.setAttribute("class", "cloudy");
            label.innerText = "Clouds";
            break;
    }
}

//convert meters to feet for elevation and inject into page
function convertMeters(meters)
{
    const textBox = document.getElementById("elevation");
    textBox.innerHTML = Math.round(meters *3.2808);
}

//convert and format hours to a 12 hour format
function format_time(hour) {
    if(hour > 23){ 
     hour -= 24; 
    } 
    let amPM = (hour > 11) ? "pm" : "am"; 
    if(hour > 12) { 
     hour -= 12; 
    } 
    if(hour == 0) { 
     hour = "12"; 
    } 
    return hour + amPM;
   }

   // Build the hourly temperature list
function buildHourlyData(nextHour,hourlyTemps) {
    // Data comes from a JavaScript object of hourly temp name - value pairs
    // Next hour should have a value between 0-23
    // The hourlyTemps variable holds an array of temperatures
    // Line 8 builds a list item showing the time for the next hour 
    // and then the first element (value in index 0) from the hourly temps array
     let hourlyListItems = '<li>' + format_time(nextHour) + ': ' + hourlyTemps[0] + '&deg;F | </li>';
     // Build the remaining list items using a for loop
     for (let i = 1, x = hourlyTemps.length; i < x; i++) {
      hourlyListItems += '<li>' + format_time(nextHour+i) + ': ' + hourlyTemps[i] + '&deg;F | </li>';
     }
     console.log('HourlyList is: ' +hourlyListItems);
     return hourlyListItems;
    }

     // Gets location information from the NWS API
function getLocation(locale) {
    const URL = "https://api.weather.gov/points/" + locale; 
    // NWS User-Agent header (built above) will be the second parameter 
    fetch(URL, idHeader) 
    .then(function(response){
      if(response.ok){ 
       return response.json(); 
      } 
      throw new ERROR('Response not OK.');
    })
    .then(function (data) { 
      // Let's see what we got back
      console.log('Json object from getLocation function:'); 
      console.log(data);
      // Store data to localstorage 
      storage.setItem("locName", data.properties.relativeLocation.properties.city); 
      storage.setItem("locState", data.properties.relativeLocation.properties.state); 
   
      // Next, get the weather station ID before requesting current conditions 
      // URL for station list is in the data object 
      let stationsURL = data.properties.observationStations;
      getHourly(data.properties.forecastHourly);
      getForecast(data.properties.forecast);
      // Call the function to get the list of weather stations
      getStationId(stationsURL); 
     }) 
    .catch(error => console.log('There was a getLocation error: ', error)) 
   } // end getLocation function

    // Gets weather station list and the nearest weather station ID from the NWS API
function getStationId(stationsURL) 
{ 
    // NWS User-Agent header (built above) will be the second parameter 
    fetch(stationsURL, idHeader) 
    .then(function(response){
      if(response.ok){ 
       return response.json(); 
      } 
      throw new ERROR('Response not OK.');
    })
    .then(function (data) { 
      // Let's see what we got back
      console.log('From getStationId function:'); 
      console.log(data);
    
      // Store station ID and elevation (in meters - will need to be converted to feet) 
      let stationId = data.features[0].properties.stationIdentifier; 
      let stationElevation = data.features[0].properties.elevation.value; 
      console.log('Station and Elevation are: ' + stationId, stationElevation); 
   
      // Store data to localstorage 
      storage.setItem("stationId", stationId); 
      storage.setItem("stationElevation", stationElevation); 
   
      // Request the Current Weather for this station 
      getWeather(stationId);
     }) 
    .catch(error => console.log('There was a getStationId error: ', error)) 
   } // end getStationId function}

// Gets current weather information for a specific weather station from the NWS API
function getWeather(stationId) { 
    // This is the URL for current observation data 
    const URL = 'https://api.weather.gov/stations/' + stationId + '/observations/latest';
    // NWS User-Agent header (built above) will be the second parameter 
    fetch(URL, idHeader) 
    .then(function(response){
      if(response.ok){ 
       return response.json(); 
      } 
      throw new ERROR('Response not OK.');
    })
    .then(function (data) { 
      // Let's see what we got back
      console.log('From getWeather function:'); 
      console.log(data);
    
      // Store weather information to localStorage
      //elevation
      let elevation = data.properties.elevation.value; 
      storage.setItem("elevation", elevation);
      console.log("elevation: " + elevation);
  
      // Build the page for viewing 
      
     }) 
    .catch(error => console.log('There was a getWeather error: ', error)) 
   } // end getWeather function

   //get data from the hourly API
   function getHourly(url)
   {
       fetch(url, idHeader)
       .then(function(response){
        if(response.ok){ 
            return response.json(); 
           } 
           throw new ERROR('Response not OK.');
       })
       .then(function (data) { 
        console.log("From the getHourly function: ");
        console.log(data);
    
        // Temp
        let currtemp = data.properties.periods[0].temperature;
        storage.setItem("currtemp", currtemp);
        console.log("temp: " + currtemp);
      // Store Hourly Information
      let hourlytemp = [];

      for (let i = 0; i < 13; i++) {
        hourlytemp[i] = data.properties.periods[i].temperature;
      }

      storage.setItem("hourly", hourlytemp);

      // Wind
      let direc = data.properties.periods[0].windDirection;
      storage.setItem("direc", direc);
      console.log("direc: " + direc);
      let speed = data.properties.periods[0].windSpeed.split(" ")[0];
      storage.setItem("windspeed", speed);
      console.log("Wind speed: " + speed);

       })
       .catch(error => console.log('There was a getHourly error: ', error))
   }

   //get data from forecast api
   function getForecast(url)
   {
    fetch(url, idHeader)
    .then(function(response){
     if(response.ok){ 
         return response.json(); 
        } 
        throw new ERROR('Response not OK.');
    })
    .then(function (data) { 
     console.log("From the getForecast function: ");
     console.log(data);
 
     // Gusts
     let gusts = data.properties.periods[0].windSpeed;
     storage.setItem("gusts", gusts);
     console.log("Gusts: " + gusts);

     // High Temp
     let high = data.properties.periods[0].temperature;
     storage.setItem("high", high);
     console.log("high: " + high);

     // Low Temp
     let low = data.properties.periods[1].temperature;
     storage.setItem("low", low);
     console.log("Low: " + low);

     // Summary conditions
     let shortSum = data.properties.periods[0].shortForecast;
     storage.setItem("summaryshort", shortSum);
     console.log(shortSum);

     storage.setItem(
       "summary",
       data.properties.periods[0].detailedForecast
     );
    })
    .catch(error => console.log('There was a getForecast error: ', error))
   }


    