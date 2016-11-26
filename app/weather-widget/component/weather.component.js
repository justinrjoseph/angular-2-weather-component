"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var weather_service_1 = require('../services/weather.service');
var weather_1 = require('../models/weather');
var WeatherComponent = (function () {
    function WeatherComponent(_weatherService) {
        this._weatherService = _weatherService;
        this.city = '';
        this.weather = new weather_1.Weather(null, null, null, null, null);
        this.currentSpeedUnit = 'mph';
        this.currentTemperatureUnit = 'fahrenheit';
    }
    WeatherComponent.prototype.ngOnInit = function () {
        this.getCurrentWeather();
    };
    WeatherComponent.prototype.getCurrentWeather = function () {
        var _this = this;
        this._weatherService.getCurrentLocation()
            .subscribe(function (location) {
            _this.location = location;
            _this.getLocationName();
            _this.getCurrentWeatherData();
        }, function (error) { return console.error(error); });
    };
    WeatherComponent.prototype.getCurrentWeatherData = function () {
        var _this = this;
        this._weatherService.getCurrentWeather(this.location.coords.latitude, this.location.coords.longitude)
            .subscribe(function (weather) {
            _this.weather.temperature = weather.currently.temperature,
                _this.weather.summary = weather.currently.summary,
                _this.weather.wind = weather.currently.windSpeed,
                _this.weather.humidity = weather.currently.humidity,
                _this.weather.icon = weather.currently.icon;
        }, function (err) { return console.log(err); });
    };
    WeatherComponent.prototype.getLocationName = function () {
        var _this = this;
        this._weatherService.getLocationName(this.location.coords.latitude, this.location.coords.longitude)
            .subscribe(function (location) {
            _this.city = location.results[2].formatted_address;
        });
    };
    WeatherComponent.prototype.toggleUnits = function () {
        this.toggleTempUnits();
        this.toggleSpeedUnits();
    };
    WeatherComponent.prototype.toggleTempUnits = function () {
        this.currentTemperatureUnit = this.currentTemperatureUnit === 'fahrenheit' ? 'celsius' : 'fahrenheit';
    };
    WeatherComponent.prototype.toggleSpeedUnits = function () {
        this.currentSpeedUnit = this.currentSpeedUnit === 'mph' ? 'kph' : 'mph';
    };
    WeatherComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'weather-widget',
            templateUrl: 'weather.component.html',
            styleUrls: ['weather.component.css'],
            providers: [weather_service_1.WeatherService]
        }), 
        __metadata('design:paramtypes', [weather_service_1.WeatherService])
    ], WeatherComponent);
    return WeatherComponent;
}());
exports.WeatherComponent = WeatherComponent;
//# sourceMappingURL=weather.component.js.map