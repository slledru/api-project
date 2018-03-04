$(document).ready(() => {
  const appKey = 'd2009af5b68f488b'
  const location = 'CO/Boulder'
  api.getCurrentCondition(appKey, location, dom.drawCurrentCondition)
  api.getWeatherAlerts(appKey, location, dom.drawWeatherAlerts)
  api.getOneDayForecast(appKey, location, dom.drawOneDayForecast)
  api.getFiveDayForecast(appKey, location, dom.drawFiveDayForecast)

})
