import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'speedUnit'
})
export class SpeedUnitPipe implements PipeTransform {
    transform(speed: number, unitType: string) {
        switch ( unitType ) {
            case 'mph':
                const MILES = speed * 1.6;
                return MILES + 'mph';
            default:
                return speed + 'kph';
        }
    }
}