import { Component, OnInit } from '@angular/core';

import { WeatherService } from '../services/weather.service';

import { Weather } from '../models/weather';

@Component({
	moduleId: module.id,
	selector: 'weather-widget',
	templateUrl: 'weather.component.html',
	styleUrls: ['weather.component.css'],
	providers: [ WeatherService ]
})
export class WeatherComponent implements OnInit {
	location: Position;
	city = '';
	weather: Weather = new Weather(null, null, null, null, null);
	currentSpeedUnit = 'mph';
	currentTemperatureUnit = 'fahrenheit';

	constructor(private _weatherService: WeatherService) {}

	ngOnInit() {
		this.getCurrentWeather();
	}

	getCurrentWeather() {
		this._weatherService.getCurrentLocation()
							.subscribe(
								location => {
									this.location = location;
									this.getLocationName();
									this.getCurrentWeatherData();
								},
								error => console.error(error));
	}

	getCurrentWeatherData() {
		this._weatherService.getCurrentWeather(
								this.location.coords.latitude,
								this.location.coords.longitude
							)
							.subscribe(
								weather => {
									this.weather.temperature = weather.currently.temperature,
									this.weather.summary = weather.currently.summary,
									this.weather.wind = weather.currently.windSpeed,
									this.weather.humidity = weather.currently.humidity,
									this.weather.icon = weather.currently.icon
								},
								err => console.log(err)
							);
	}

	getLocationName() {
		this._weatherService.getLocationName(
								this.location.coords.latitude,
								this.location.coords.longitude
							)
							.subscribe(location => {
								this.city = location.results[2].formatted_address;
							});
	}
}