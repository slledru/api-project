const api = {
  weatherUrl: 'https://g-wunderground.herokuapp.com/',
  getWeatherInfo: function(path, parseFunc, drawFunc, userData = null) {
    const url = `${this.weatherUrl}${path}`
    const $xhr = $.ajax({
      url: url,
      type: 'GET',
    })
    $xhr.done((data, textStatus, jqXHR ) => {
      try {
        const result = parseFunc(data)
        drawFunc(result, userData)
      } catch (e) {
        console.log(e);
      }
    }).fail((data, textStatus, jqXHR ) => {
      console.log(` failed: ${data}  status: ${textStatus}`);
    })
  },
  getCurrentCondition: function(appKey, location, draw) {
    let data = storage.getLastCondition()
    if (data === null) {
      const path = `/conditions/q/${location}.json`
      api.getWeatherInfo(path, parse.parseCurrentCondition, draw)
    } else {
      draw(data)
    }
  },
  getWeatherAlerts: function(appKey, location, draw) {
    let data = storage.getLastAlerts()
    if (data === null) {
      const path = `/alerts/q/${location}.json`
      api.getWeatherInfo(path, parse.parseWeatherAlerts, draw)
    } else {
      draw(data)
    }
  },
  getOneDayForecast: function(appKey, location, draw) {
    let data = storage.getLastOneDay()
    if (data === null) {
      const path = `/forecast/q/${location}.json`
      api.getWeatherInfo(path, parse.parseOneDayForecast, draw)
    } else {
      draw(data)
    }
  },
  getFiveDayForecast: function(appKey, location, draw) {
    let data = storage.getLastFiveDay()
    if (data === null) {
      const path = `/forecast10day/q/${location}.json`
      api.getWeatherInfo(path, parse.parseFiveDayForecast, draw)
    } else {
      draw(data)
    }
  },
  getHistoricalSummary: function(location, history, draw) {
    const keys = Object.keys(history.days)
    if (keys.length > 0) {
      for (let i = 0; i < keys.length; i++) {
        const path = `/${keys[i]}/q/${location}.json`
        api.getWeatherInfo(path, parse.parseHistoricalSummary, draw, history)
      }
    }
  },
  getCurrentLocation: function(appKey, lat, lon, draw) {
    const path = `/geolookup/q/${lat},${lon}.json`
    api.getWeatherInfo(path, parse.parseGeoLookup, draw)
  },
  getRadarImage: function(appKey, location, draw) {
    const path = `${this.weatherUrl}/animatedradar/q/${location}.gif?newmaps=1&timelabel=1&timelabel.y=10&num=10&delay=50`
    draw(path, location)
  }
}
