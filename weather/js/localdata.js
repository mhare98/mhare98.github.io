"use strict";

let pageNav = document.getElementById('nav');
let statusContainer = document.getElementById('pagestatus');
let contentContainer = document.getElementById('maincontent');

let weatherURL = "/weather/js/weather.json";
fetchData(weatherURL);
function fetchData(weatherURL){
  let cityName = 'Greenville'; // The data we want from the weather.json file
  fetch(weatherURL)
  .then(function(response) {
  if(response.ok){
  return response.json();
  }
  throw new ERROR('Network response was not OK.');
  })
  .then(function(data){
    // Check the data object that was retrieved
    console.log(data);
    // data is the full JavaScript object, but we only want the greenville part
    // shorten the variable and focus only on the data we want to reduce typing
    let g = data["Greenville"];

    // ************ Get the content ******************************

    // Get the location data
    let locName = g.City;
    let locState = g.State;
    // Put them together
    let fullName = locName+', '+locState;
    // See if it worked
    console.log('fullName is: '+fullName);

    // Get the temperature data
    let hightemp = g.High + "&deg;F";
    console.log("High: " + hightemp);

    let lowtemp = g.Low + "&deg;F";
    console.log("Low: " + lowtemp);

    let temp = g.Temp + "&deg;F";
    console.log("Temp: " + temp);
    // Get the wind data 
    let windspeed = g.Wind + " mph";
    let winddir = "<strong>Direction: </strong>" + g.Direction;
    let windgusts = "<strong>Gusts:</strong> " + g.Gusts + " mph";
    console.log("speed: " + windspeed + "  dir: " + winddir + "  Gusts: " + windgusts);

    // Get the current conditions
    let summary = g.Summary;
    console.log("Sum: " + summary);

    // Get the hourly data 
    let hourly = g.Hourly;
    console.log("Hourly: " + hourly);

    //get long and lat
    let longlat = g.Longitude + "&deg;N "+ g.Latitude + "&deg;W";

    //get meters
    let meters = g.Elevation;

    //get zip
    let zip = g.Zip;

    // ************ Display the content ******************************
    // Set the title with the location name at the first
    // Gets the title element so it can be worked with
    let pageTitle = document.getElementById('title');
    // Create a text node containing the full name 
    let fullNameNode = document.createTextNode(fullName);
    // inserts the fullName value before any other content that might exist
    pageTitle.insertBefore(fullNameNode, pageTitle.childNodes[0]);
    // When this is done the title should look something like this:
    // Greenville, SC | The Weather Site

    // Set the Location information
    // Get the h1 to display the city location
    let contentHeading = document.getElementById('locname');
    contentHeading.innerHTML = fullName;
    // The h1 in main h1 should now say "Greenville, SC"


    // Set the temperature information
    let tempcontainer = document.getElementById("currtemp");
    tempcontainer.innerHTML = temp;

    // Set high temp
    let hightempcontainer = document.getElementById("high");
    hightempcontainer.innerHTML = hightemp;
    
    // Set low temp
    let lowtempcontainer = document.getElementById("low");
    lowtempcontainer.innerHTML = lowtemp;

    // Set Feels like
    buildWC(g.Wind, g.Temp);

    // Set the wind information
    let windspeedcontainer = document.getElementById("strength");
    windspeedcontainer.innerHTML = windspeed;

    let winddircontainer = document.getElementById("direc");
    winddircontainer.innerHTML = winddir;

    let windgustcontainer = document.getElementById("gust");
    windgustcontainer.innerHTML = windgusts;

    windDial(g.Direction);

    // Set the current conditions information
    let condition = getCondition(summary);
    changeSummaryImage(condition);

    // Set the hourly temperature information
    let forcasttemp = buildHourlyData(10, hourly);
    let hourlycontainer = document.getElementById("hourlylist");
    hourlycontainer.innerHTML = forcasttemp; 

    //set long lat
    let longlatcontainer = document.getElementById("longlat");
    longlatcontainer.innerHTML = longlat;

    //set elavation
    convertMeters(meters);

    //set zip
    let zipcontainer = document.getElementById("zip");
    zipcontainer.innerHTML = zip;
    // Change the status of the containers
    contentContainer.setAttribute('class', ''); // removes the hide class
    statusContainer.setAttribute('class', 'hide'); // hides the status container
  })
  .catch(function(error){
  console.log('There was a fetch problem: ', error.message);
  statusContainer.innerHTML = 'Sorry, the data could not be processed.';
  })
}