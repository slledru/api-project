const api = {
  urlStart: 'http://api.wunderground.com/api/',
  getWeatherInfo: function(path, parseFunc, drawFunc) {
    const url = `${this.urlStart}${path}`
    const $xhr = $.ajax({
      url: url,
      type: 'GET',
    })
    $xhr.done((data, textStatus, jqXHR ) => {
      const result = parseFunc(data)
      drawFunc(result)
    }).fail((data, textStatus, jqXHR ) => {
      console.log(` failed: ${data}  status: ${textStatus}`);
    })
  },
  getCurrentCondition: function(appKey, location, draw) {
    const path = `${appKey}/conditions/q/${location}.json`
    api.getWeatherInfo(path, parse.parseCurrentCondition, draw)
  },
  getWeatherAlerts: function(appKey, location, draw) {
    const path = `${appKey}/alerts/q/${location}.json`
    api.getWeatherInfo(path, parse.parseWeatherAlerts, draw)
  },
  getOneDayForecast: function(appKey, location, draw) {
    const path = `${appKey}/forecast/q/${location}.json`
    api.getWeatherInfo(path, parse.parseOneDayForecast, draw)
  },
  getFiveDayForecast: function(appKey, location, draw) {
    const path = `${appKey}/forecast10day/q/${location}.json`
    api.getWeatherInfo(path, parse.parseFiveDayForecast, draw)
  },
  getHistoricalSummary: function() {

  },
  getCurrentLocation: function(appKey, lat, lon, draw) {
    const path = `${appKey}/geolookup/q/${lat},${lon}.json`
    api.getWeatherInfo(path, parse.parseGeoLookup, draw)
  }
}
