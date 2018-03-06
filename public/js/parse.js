const parse = {
  parseCurrentCondition: function(data) {
    if (data.current_observation) {
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
      let result = {
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
      storage.setLastCondition(result)
      return result
    }
    throw new Error('error result')
  },
  parseWeatherAlerts: function(data) {
    if (data.alerts) {
      const alerts = null
      if (Array.isArray(data.alerts)) {
        for (const alert of data.alerts) {
          const {
            description,
            date,
            expires,
            message,
            significance,
            type
          } = alert

          alerts.push({
            description,
            date,
            expires,
            message,
            significance,
            type
          })
        }
        storage.setLastAlerts(alerts)
      }
      return alerts
    }
    throw new Error('error result')
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
    if (forecast.forecastday) {
      let result = {}
      if (Array.isArray(forecast.forecastday) &&
          index < forecast.forecastday.length) {
        result = parse.parseSimple(forecast.forecastday[index])
      }
      return result
    }
    throw new Error('error result')
  },
  parseTextForecasts: function(forecast, index) {
    if (forecast.forecastday) {
      let result = {}
      if (Array.isArray(forecast.forecastday) &&
          index < forecast.forecastday.length) {
        result = parse.parseText(forecast.forecastday[index])
      }
      return result
    }
    throw new Error('error result')
  },
  parseOneDayForecast: function(data) {
    if (data.forecast &&
        data.forecast.simpleforecast &&
        data.forecast.txt_forecast) {
      const simple = parse.parseSimpleForecasts(data.forecast.simpleforecast, 0)
      const verbose = parse.parseTextForecasts(data.forecast.txt_forecast, 0)
      let result = {
        simple,
        verbose
      }
      storage.setLastOneDay(result)
      return result
    }
    throw new Error('error result')
  },
  parseFiveDayForecast: function(data) {
    if (data.forecast &&
        data.forecast.simpleforecast &&
        data.forecast.txt_forecast &&
        data.forecast.simpleforecast.forecastday &&
        data.forecast.txt_forecast.forecastday) {
      const result = []
      let simpleCount = data.forecast.simpleforecast.forecastday.length / 2
      const verboseCount = data.forecast.txt_forecast.forecastday.length / 2
      if (simpleCount * 2 > verboseCount) {
        sampleCount = verboseCount / 2
      }
      for (let i = 0; i < simpleCount; i++) {
        const simple = parse.parseSimpleForecasts(data.forecast.simpleforecast, i)
        const day = parse.parseTextForecasts(data.forecast.txt_forecast, i * 2)
        const night = parse.parseTextForecasts(data.forecast.txt_forecast, i * 2 + 1)
        result.push({ simple, day, night})
      }
      if (result.length > 0) {
        storage.setLastFiveDay(result)
      }
      return result
    }
    throw new Error('error result')
  },
  parseHistoricalSummary: function(data) {
    console.log(data);
  },
  parseGeoLookup: function(data) {
    if (data.location &&
        data.location.state &&
        data.location.city) {
      return `${data.location.state}/${data.location.city}`
    }
    throw new Error('error result')
  }
}
