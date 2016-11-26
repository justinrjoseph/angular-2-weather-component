import { Component } from '@angular/core';

import { WeatherService } from '../service/weather.service';

@Component({
	moduleId: module.id,
	selector: 'weather-widget',
	templateUrl: 'weather.component.html',
	styleUrls: ['weather.component.css'],
	providers: [ WeatherService ]
})
export class WeatherComponent {
	location: Position;

	constructor(private _weatherService: WeatherService) {
		this._weatherService.getCurrentLocation()
							.subscribe(
								location => {
									this.location = location;
									this._weatherService.getCurrentWeather(
															this.location.coords.latitude,
															this.location.coords.longitude
														)
														.subscribe(
															weather => console.log(weather),
															err => console.log(err)
														);
								},
								error => console.error(error));
	}
}