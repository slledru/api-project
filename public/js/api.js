const api = {
  urlStart: 'https://crossorigin.me/',
  weatherUrl: 'https://api.wunderground.com/api/',
  getWeatherInfo: function(path, parseFunc, drawFunc) {
    const url = `${this.urlStart}${this.weatherUrl}${path}`
    const $xhr = $.ajax({
      url: url,
      type: 'GET',
    })
    $xhr.done((data, textStatus, jqXHR ) => {
      try {
        const result = parseFunc(data)
        drawFunc(result)
      } catch (e) {
        console.log(e);
      }
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
  },
  getRadarImage: function(appKey, location, draw) {
    const path = `${this.weatherUrl}${appKey}/animatedradar/q/${location}.gif?newmaps=1&timelabel=1&timelabel.y=10&num=10&delay=50`
    draw(path, location)
  }
}
