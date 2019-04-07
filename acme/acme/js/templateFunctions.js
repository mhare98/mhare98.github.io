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