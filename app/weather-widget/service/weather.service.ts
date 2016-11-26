import { Injectable } from '@angular/core';

import { Jsonp } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { FORECAST_KEY, FORECAST_ROOT } from '../constants/constants';

@Injectable()
export class WeatherService {
    constructor(private _jsonp: Jsonp) {}

    getCurrentLocation() : [number, number] {
         if ( navigator.geolocation ) {
            navigator.geolocation.getCurrentPosition(
                pos => {
                    console.log('Postion: ', pos.coords.latitude, ', ', pos.coords.longitude);
                    return [pos.coords.latitude, pos.coords.longitude];
                },
                error => {
                    console.error('Unable to get position - ', error);
                }
            );
         } else {
             console.error('Geolocation unavailable.');
             return [0, 0];
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