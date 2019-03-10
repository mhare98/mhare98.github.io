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
     let hourlyListItems = '<li>' + format_time(nextHour) + ': ' + hourlyTemps[0] + '&deg;F</li>';
     // Build the remaining list items using a for loop
     for (let i = 1, x = hourlyTemps.length; i < x; i++) {
      hourlyListItems += '<li>' + format_time(nextHour+i) + ': ' + hourlyTemps[i] + '&deg;F</li>';
     }
     console.log('HourlyList is: ' +hourlyListItems);
     return hourlyListItems;
    }