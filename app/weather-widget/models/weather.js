"use strict";
var Weather = (function () {
    function Weather(temperature, summary, wind, humidity, icon) {
        this.temperature = temperature;
        this.summary = summary;
        this.wind = wind;
        this.humidity = humidity;
        this.icon = icon;
    }
    return Weather;
}());
exports.Weather = Weather;
//# sourceMappingURL=weather.js.map