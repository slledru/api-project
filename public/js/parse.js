const parse = {
  parseCurrentCondition: function(data) {
    const {
      observation_time,
      feelslike_f,
      feelslike_c,
      icon_url,
      temp_f,
      temp_c,
      weather,
      wind_string,
      relative_humidity
    } = data.current_observation
    const {
      full: full_location
    } = data.current_observation.display_location
    return {
      full_location,
      observation_time,
      feelslike_f,
      feelslike_c,
      icon_url,
      temp_f,
      temp_c,
      weather,
      wind_string,
      relative_humidity
    }
  },
  parseWeatherAlerts: function(data) {
    const alerts = []
    if (Array.isArray(data.alerts)) {
      for (const alert of data.alerts) {
        const {
          description,
          expires,
          message,
          significance,
          type
        } = alert

        alerts.push({
          description,
          expires,
          message,
          significance,
          type
        })
      }
    }
    return alerts
  },
  parseSimple: function(forecast) {
    const {
      conditions,
      high,
      low,
      date
    } = forecast
    return {
      conditions,
      high,
      low,
      date
    }
  },
  parseText: function(forecast) {
    const {
      fcttext,
      fcttext_metric,
      icon_url,
      title
    } = forecast
    return {
      fcttext,
      fcttext_metric,
      icon_url,
      title
    }
  },
  parseSimpleForecasts: function(forecast, index) {
    let result = {}
    if (Array.isArray(forecast.forecastday) &&
        index < forecast.forecastday.length) {
      result = parse.parseSimple(forecast.forecastday[index])
    }
    return result
  },
  parseTextForecasts: function(forecast, index) {
    let result = {}
    if (Array.isArray(forecast.forecastday) &&
        index < forecast.forecastday.length) {
      result = parse.parseText(forecast.forecastday[index])
    }
    return result
  },

  parseOneDayForecast: function(data) {
    const simple = parse.parseSimpleForecasts(data.forecast.simpleforecast, 0)
    const verbose = parse.parseTextForecasts(data.forecast.txt_forecast, 0)
    return {
      simple,
      verbose
    }
  },
  parseFiveDayForecast: function(data) {
    console.log(data);
    const result = []
    for (let i = 0; i < 10; i++) {
      //result.push(parse.parseForecast(data.forecast, i))
    }
    return result
  },
  parseHistoricalSummary: function(data) {
    console.log(data);
  },
  parseGeoLookup: function(data) {
    return `${data.location.state}/${data.location.city}`
  }
}
