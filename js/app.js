$(document).ready(() => {
  // const supplement = {
  //   appKey: 'd2009af5b68f488b',
  //   location: 'CO/Boulder'
  // }
  //api.getCurrentCondition(appKey, location, dom.drawCurrentCondition)
  api.getWeatherAlerts(supplement.appKey, supplement.location, dom.drawWeatherAlerts)
  //api.getOneDayForecast(appKey, location, dom.drawOneDayForecast)
  //api.getFiveDayForecast(appKey, location, dom.drawFiveDayForecast)

})
