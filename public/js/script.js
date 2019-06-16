const countryForm = document.querySelector("form");
const countrySearch = document.getElementById("countryName");

const errorSection = document.getElementById("error-section");
const successSection = document.getElementById("success-section");

const errorMessage = document.getElementById("errorMessage");

const imageFlagResult = document.getElementById("imageFlagResult");
const countryNameResult = document.getElementById("countryNameResult");
const capitalCityResult = document.getElementById("capitalCityResult");
const countryDescriptionResult = document.getElementById(
  "countryDescriptionResult"
);

countryForm.addEventListener("submit", event => {
  event.preventDefault();

  const countryName = countrySearch.value;

  successSection.style.display = "none";
  errorSection.style.display = "none";

  errorMessage.textContent = "";

  fetch(`http://localhost:3000/countries?countryName=${countryName}`)
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        errorMessage.textContent = data.error;
        errorSection.style.display = "block";
      } else {
        const countryData = data[0];

        const flag = countryData.flag;
        const name = countryData.name;
        const capital = countryData.capital;

        const subRegion = countryData.subregion;
        const population = countryData.population.toLocaleString();
        const timezonesLength = countryData.timezones.length;

        const currenciesSymbol = countryData.currencies[0].symbol;
        const currenciesName = countryData.currencies[0].name;

        const languages = countryData.languages[0].nativeName;
        const languagesName = countryData.languages[0].name;

        const regionalBlocsSymbol = countryData.regionalBlocs[0].acronym;
        const regionalBlocsName = countryData.regionalBlocs[0].name;

        const countryDescription = `${name} is a country located in ${subRegion}. The capital city of ${name} is ${capital}. The total population of ${name} is ${population}. This country has ${timezonesLength} timezone(s). ${name} currency is '${currenciesSymbol}' or ${currenciesName}. ${name} native language is ${languages} (${languagesName}). ${name} regional blocs is ${regionalBlocsName} (${regionalBlocsSymbol}).`;

        imageFlagResult.src = flag;

        countryNameResult.textContent = name;
        capitalCityResult.textContent = capital;

        countryDescriptionResult.textContent = countryDescription;

        successSection.style.display = "block";
      }
    })
    .catch(error => {
      console.log(error);
    });

  countrySearch.value = "";
});
