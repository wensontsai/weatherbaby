var _ = require('lodash');

var rootUrl = 'http://api.openweathermap.org/data/2.5/weather?APPID=e2d4f5caaf923d945d45e96e080365e3';

var kelvinToF = function(kelvin){
	return Math.round((kelvin-273.15) * 1.8 + 32) + ' ˚F';
};

module.exports = function(latitude, longitude){
	var url = `${rootUrl}&lat=${latitude}&lon=${longitude}`;
	// make request, fetch returns a promise, call .json on it, which returns yet another promise, second .then to access json data object
	return fetch(url)
		.then(function(response){
			return response.json()	
		})
		.then(function(json){
			return {
				city: json.name,
				temperature: kelvinToF(json.main.temp),
				description: _.capitalize(json.weather[0].description)
			}
		});
}