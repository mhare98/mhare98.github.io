/* **********************************
* Weather Site JavaScript Functions
*************************************/
//build functions

const temp = 31;
const speed = 5;
buildWC(speed, temp);

const direction = "NNE";
windDial(direction);

const weatherType = "Snowing"
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
    switch (weatherType)
    {
        case "clear":
            picture.setAttribute("class", "clear");
            break;
        case "rain":
            picture.setAttribute("class", "rain");
            break;
        case "snow":
            picture.setAttribute("class", "snow");
            break;
        case "fog":
            picture.setAttribute("class", "fog");
            break;
        case "cloudy":
            picture.setAttribute("class", "cloudy");
            break;
    }
}

//convert meters to feet for elevation
function convertMeters(meters)
{
    const textBox = document.getElementById("elevation");
    textBox.innerHTML = Math.round(meters *3.2808);
}