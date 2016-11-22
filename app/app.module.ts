import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { WeatherComponent } from './weather-widget/component/weather.component';

@NgModule({
    declarations: [
        AppComponent,
        WeatherComponent
    ],
    imports: [ BrowserModule ],
    bootstrap: [ AppComponent ]
})
export class AppModule {}