import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { JsonpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { WeatherComponent } from './weather-widget/component/weather.component';

import { SpeedUnitPipe } from './weather-widget/pipes/speed-unit.pipe';
import { TemperatureUnitPipe } from './weather-widget/pipes/temperature-unit.pipe';

@NgModule({
    declarations: [
        AppComponent,
        WeatherComponent,
        SpeedUnitPipe,
        TemperatureUnitPipe
    ],
    imports: [ 
        BrowserModule,
        JsonpModule
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule {}