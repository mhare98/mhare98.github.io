//These are JS functions to help build the page
buildNav();

function buildNav()
{
    const anvilCont = document.getElementById("anvil");
    const tntCont = document.getElementById("tnt");
    const decoyCont = document.getElementById("decoy");
    const trapCont = document.getElementById("trap");

    let url = "/acme/acme/js/acme.json";
    
    fetch(url)
  .then(function(response) {
  if(response.ok){
  return response.json();
  }
  throw new ERROR('Network response was not OK.');
  })
  .then(function(data){
    console.log(Object.keys(data));
    anvilCont.innerHTML = Object.keys(data)[0];
    tntCont.innerHTML = Object.keys(data)[1];
    decoyCont.innerHTML = Object.keys(data)[2];
    trapCont.innerHTML = Object.keys(data)[3]

})
.catch(function(error){
console.log('There was a fetch problem: ', error.message);
statusContainer.innerHTML = 'Sorry, the data could not be processed.';
})
}

function buildHome()
{
  console.log("HOME PAGE");
  document.getElementById("homeSec").setAttribute("class", "");
  document.getElementById("content").setAttribute("class", "hide");
  document.getElementById("title").innerHTML = "ACME shop"
}

function buildContent(input)
{
  console.log(input + "Page");
  document.getElementById("homeSec").setAttribute("class", "hide");
  document.getElementById("content").setAttribute("class", "");
  let title = document.getElementById("contentTitle");
  let par = document.getElementById("contentDesc");
  let rev = document.getElementById("rev");
  let manufactur = document.getElementById("made");
  let price = document.getElementById("price");
  let img = document.getElementById("contentImg");

  let url = "/acme/acme/js/acme.json";
    
    fetch(url)
  .then(function(response) {
  if(response.ok){
  return response.json();
  }
  throw new ERROR('Network response was not OK.');
  })
  .then(function(data){

    let sec = Object.keys(data)[input];
    document.getElementById("title").innerHTML = data[sec]["name"];
    title.innerHTML = data[sec]["name"];
    par.innerHTML = data[sec]["description"];
    rev.innerHTML = data[sec]["reviews"];
    manufactur.innerHTML = data[sec]["manufacturer"];
    price.innerHTML = "Price: $" + data[sec]["price"];
    img.setAttribute("src", data[sec]["path"]);


  })
  .catch(function(error){
  console.log('There was a fetch problem: ', error.message);
  statusContainer.innerHTML = 'Sorry, the data could not be processed.';
  })
}