import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'temperatureUnit'
})
export class TemperatureUnitPipe implements PipeTransform {
    transform(temperature: number, unitType: string) {
        if ( unitType === 'celsius' ) {
            const CELSIUS = ( temperature - 32 ) * 0.5556;
            return CELSIUS;
        } else {
            return temperature;
        }
    }
}