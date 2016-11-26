import { Injectable } from '@angular/core';

import { Http, Jsonp } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { 
	FORECAST_KEY,
	FORECAST_BASE_URL,
	GEOCODING_KEY,
	GEOCODING_BASE_URL
} from '../constants/constants';

@Injectable()
export class WeatherService {
	constructor(private _jsonp: Jsonp, private _http: Http) {}
	
	getCurrentLocation() : Observable<any> {
		if ( navigator.geolocation ) {
			return Observable.create(observer => {
				navigator.geolocation.getCurrentPosition(
					location => observer.next(location),
					error => {
						return Observable.throw(error);
					} 
				);
			});
		} else {
			return Observable.throw('Geolocation unavailable.');
		}
	}
	
	getCurrentWeather(lat: number, long: number) : Observable<any> {
		const URL = FORECAST_BASE_URL + FORECAST_KEY;
		const PARAMS = '/' + lat + ',' + long + '?callback=JSONP_CALLBACK';

		return this._jsonp.get(URL + PARAMS)
											.map(data => data.json())
											.catch(err => {
												console.error('Unable to get weather data - ', err);
												return Observable.throw(err.json());  
											});
	}
	
	getLocationName(lat: number, long: number) : Observable<any> {
		const URL = GEOCODING_BASE_URL;
		const PARAMS = '?latlng=' + lat + ',' + long + '&key=' + GEOCODING_KEY;

		return this._http.get(URL + PARAMS)
											.map(location => location.json())
											.catch(err => {
												console.error(err);
												return Observable.throw(err);
											});
	}
}