$(document).ready(() => {
  // const supplement = {
  //   appKey: 'd2009af5b68f488b',
  //   location: 'CO/Boulder'
  // }
  api.getWeatherAlerts(supplement.appKey, supplement.location, dom.drawWeatherAlerts)
})
