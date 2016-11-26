import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'speedUnit'
})
export class SpeedUnitPipe implements PipeTransform {
    transform(speed: number, unitType: string) {
        switch ( unitType ) {
            case 'mph':
                const MILES = Number(speed * 1.6).toFixed(0);
                return MILES + 'mph';
            default:
                const KILOMS = Number(speed).toFixed(0); 
                return KILOMS + 'kph';
        }
    }
}