"use strict"

let arrayOfCountries = [];
// let arrayOfSlugs = []
const URL = "https://api.covid19api.com/live/country"

const graphURL = "https://quickchart.io/chart?c={type:'line',data:{labels:"

let graphDataDates = [];
let graphDataSetsCases = [];

function setInitialConditions() {
  $('#selectCountryForm').show();
  console.log("***setInitialConditions ran***")
}

function clearResults() {
  $('#countries').empty();
}

function clearGraph() {
  $('#graphDisplay').empty();
  }

function getListOfCountries() {
  fetch('https://api.covid19api.com/countries')
  .then(response => response.json())
  // .then(responseJson => console.log(responseJson))
  .then(responseJson => createSelectElement(responseJson));
}

function createSelectElement(responseJson) {
  clearResults();
  clearGraph();
  // console.log(responseJson);
  // let arrayOfCountries = [];
  for (let i = 0; i < responseJson.length; i++) {
    arrayOfCountries.push(responseJson[i].Country);
    // arrayOfSlugs.push(responseJson[i].Slug);
  }
  arrayOfCountries.sort();
  console.log(arrayOfCountries);

  function turnArrayOfCountriesIntoListOfCountries(arrayOfCountries) {
    function searchForSlug(nameKey, myArray) {
      for (let j = 0; j < myArray.length; j++) {
        if (myArray[j].Country === nameKey) {
          return myArray[j].Slug;
        }
      }
    }
    for (let i = 0; i < arrayOfCountries.length; i++) {
      let countryValue = searchForSlug(arrayOfCountries[i], responseJson);
      // console.log(countryValue);
      // console.log(responseJson);
      $('#countries').append(`<option value="${countryValue}">${arrayOfCountries[i]}</option>`);
    }
    }
    turnArrayOfCountriesIntoListOfCountries(arrayOfCountries);
  }

 
  function handleSubmitForm() {
    $('#selectCountryForm').submit(function() {
      event.preventDefault();
      getCovidData();
      displayGraph();
    });
  }

  function getCovidData() {
    console.log($("#countries").val());
    console.log($("#dataType").val());
    console.log($("#afterDate").val());
    fetch(URL + '/' + `${$("#countries").val()}` + '/status/' + `${$("#dataType").val()}` + '/date/' + `${$("#afterDate").val()}` + 'T00:00:00Z')
    .then(response => response.json())
    // .then(responseJsonCases => console.log(responseJsonCases))
    .then(responseJsonCases => aggregateGraphInfo(responseJsonCases))
    console.log('***getCovidData ran***');
  }

  function aggregateGraphInfo(responseJsonCases) {
    console.log(responseJsonCases);
    for (let k = 0; k < responseJsonCases.length; k++) {
      graphDataDates.push(responseJsonCases[k].Date);
    }
    for (let l = 0; l < responseJsonCases.length; l++) {
    graphDataSetsCases.push(responseJsonCases[l].Confirmed);
    }
    console.log(graphDataDates);
    console.log(graphDataSetsCases);
  }

  function displayGraph() {
    console.log(graphDataDates.toString());
    console.log(graphDataSetsCases.toString());
    
    // console.log(graphURL + graphDataDates);
  }




function handleSearchCovid19Data() {
  setInitialConditions();
  getListOfCountries();
  handleSubmitForm();
}


$(handleSearchCovid19Data);