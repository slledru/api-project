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
    return {
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
  parseSimpleForecast: function(forecast) {
    const {
      conditions,
      high,
      low
    } = forecast
    return {
      conditions,
      high,
      low
    }
  },
  parseTextForecast: function(forecast) {
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
  parseForecast: function(forecast, index) {
    const result = {}
    if (Array.isArray(forecast.simpleforecast.forecastday) &&
        index < forecast.simpleforecast.forecastday.length) {
      result.simple = parse.parseSimpleForecast(forecast.simpleforecast.forecastday[index])
    }
    if (Array.isArray(forecast.txt_forecast.forecastday) &&
        index < forecast.txt_forecast.forecastday.length) {
      result.verbose = parse.parseTextForecast(forecast.txt_forecast.forecastday[index])
    }
    return result
  },

  parseOneDayForecast: function(data) {
    const result = parse.parseForecast(data.forecast, 0)
    return result
  },
  parseFiveDayForecast: function(data) {
    const result = []
    for (let i = 0; i < 10; i++) {
      result.push(parse.parseForecast(data.forecast, i))
    }
    return result
  },
  parseHistoricalSummary: function(data) {
    console.log(data);
  }
}
