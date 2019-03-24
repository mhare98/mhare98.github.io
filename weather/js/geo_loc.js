/* Location based functions*/
'use strict';
  

let statusContainer = document.getElementById('pagestatus');
let contentContainer = document.getElementById('maincontent');

//let storage = window.localStorage;
getGeoLocation();
buildPage();

function getGeoLocation()
    {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
             const lat = position.coords.latitude;
             const long = position.coords.longitude;
          
             // Combine the values
             const locale = lat + "," + long;
             console.log(`Lat and Long are: ${locale}.`);
             storage.setItem("cords", lat.toFixed(2) + " N, " + long.toFixed(2)+ " W");
             getLocation(locale);
            })
           } else {
            console.log("Your browser doesn't support Geolocation or it is not enabled!");
           } // end else

           
    }


    function buildPage()
    {
    let contentHeading = document.getElementById('locname');
    contentHeading.innerHTML = storage.getItem("locName") + ", " + storage.getItem("locState");
    // The h1 in main h1 should now say your city and state


    // Set the temperature information
    let tempcontainer = document.getElementById("currtemp");
    tempcontainer.innerHTML = storage.getItem("currtemp") + "&deg;F";

    // Set high temp
    let hightempcontainer = document.getElementById("high");
    hightempcontainer.innerHTML = storage.getItem("high") + "&deg;F";
    
    // Set low temp
    let lowtempcontainer = document.getElementById("low");
    lowtempcontainer.innerHTML = storage.getItem("low") + "&deg;F";

    // Set Feels like
    buildWC(storage.getItem("windspeed"), storage.getItem("currtemp"));

    // Set the wind information
    let windspeedcontainer = document.getElementById("strength") ;
    windspeedcontainer.innerHTML = storage.getItem("windspeed") + " mph";

    let winddircontainer = document.getElementById("direc");
    winddircontainer.innerHTML = "<strong>Direction: </strong>" + storage.getItem("direc");

    let windgustcontainer = document.getElementById("gust");
    windgustcontainer.innerHTML = "<strong>Gusts: </strong>" + storage.getItem("gusts");

    windDial(storage.getItem("direc"));

    // Set the current conditions information
    let condition = getCondition(storage.getItem("summaryshort"));
    changeSummaryImage(condition);

    // Set the hourly temperature information
    let forcasttemp = buildHourlyData(13, storage.getItem("hourly"));
    let hourlycontainer = document.getElementById("hourlylist");
    hourlycontainer.innerHTML = forcasttemp; 

    //set long lat
    let longlatcontainer = document.getElementById("longlat");
    longlatcontainer.innerHTML = storage.getItem("cords");

    //set elavation
    convertMeters(storage.getItem("elevation"));

    //set zip
    let zipcontainer = document.getElementById("zip");
    zipcontainer.innerHTML = "None";
    // Change the status of the containers
    contentContainer.setAttribute('class', ''); // removes the hide class
    statusContainer.setAttribute('class', 'hide'); // hides the status container
    }
   
