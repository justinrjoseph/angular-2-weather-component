import { Injectable } from '@angular/core';

import { FORECAST_KEY, FORECAST_ROOT } from '../constants/constants';

@Injectable()
export class WeatherService {
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
}