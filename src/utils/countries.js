const request = require("request");

const countries = (countryName, callback) => {
  const url = `https://restcountries.eu/rest/v2/name/${countryName}`;

  request({ url: url, json: true }, (error, response, body) => {
    if (body === undefined) {
      callback("Please enter a country name", undefined);
    } else if (body.status) {
      callback("Please enter a correct country name", undefined);
    } else {
      callback(undefined, body);
    }
  });
};

module.exports = countries;
