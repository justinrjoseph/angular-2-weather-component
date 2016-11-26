import { Component, OnInit } from '@angular/core';

import { Weather } from '../models/weather';

import { WeatherService } from '../service/weather.service';

import { WEATHER_COLORS } from '../constants/constants';

declare var Skycons: any;

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
	icons = new Skycons({ color: '#fff' });

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
									console.log(weather);
									this.setIcon();
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

	toggleUnits() {
		this.toggleTempUnits();
		this.toggleSpeedUnits();
	}

	toggleTempUnits() {
		this.currentTemperatureUnit = this.currentTemperatureUnit === 'fahrenheit' ? 'celsius' : 'fahrenheit';
	}

	toggleSpeedUnits() {
		this.currentSpeedUnit = this.currentSpeedUnit === 'mph' ? 'kph' : 'mph';
	}

	setIcon() {
		this.icons.add('icon', this.weather.icon);
		this.icons.play();
	}

	setStyles() : Object {
		if ( this.weather.icon ) {
			this.icons.color = WEATHER_COLORS[this.weather.icon]['color'];
			return WEATHER_COLORS[this.weather.icon];
		} else {
			this.icons.color = WEATHER_COLORS.default.color;
			return WEATHER_COLORS.default;
		}
	}
}