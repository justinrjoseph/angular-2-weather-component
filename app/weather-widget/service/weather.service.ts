import { Injectable } from '@angular/core';

import { Jsonp } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { FORECAST_KEY, FORECAST_ROOT } from '../constants/constants';

@Injectable()
export class WeatherService {
    constructor(private _jsonp: Jsonp) {}

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
        const URL = FORECAST_ROOT + FORECAST_KEY;
        const PARAMS = '/' + lat + ',' + long + '?callback=JSONP_CALLBACK';

        return this._jsonp.get(URL + PARAMS)
                          .map(data => data.json())
                          .catch(err => {
                            console.error('Unable to get weather data - ', err);
                            return Observable.throw(err.json());  
                          });
    }
}