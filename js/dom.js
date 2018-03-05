const dom = {
  drawCurrentCondition: function(data) {
    // console.log('drawCurrentCondition');
    // console.log(data);
  },
  drawWeatherAlerts: function(data) {
    if (Array.isArray(data)) {
      if (data.length > 0) {
        let text = '';
        for (let i = 0; i < data.length; i++) {
          if (text.length > 0) {
            text += ', '
          }
          text += data[i].description
        }
        $('#alerts').text(text)
        $('#alerts').removeClass('no-alert')
        $('#alerts').addClass('alert')
      } else {
        $('#alert-btn').attr('disabled', true)
        $('#alerts').addClass('no-alert')
        $('#alerts').removeClass('alert')
      }
    } else {
      $('#alert-btn').attr('disabled', true)
      $('#alerts').addClass('no-alert')
      $('#alerts').removeClass('alert')
    }
  },
  drawOneDayForecast: function(data) {
    // console.log('drawOneDayForecast');
    // console.log(data);
  },
  drawFiveDayForecast: function(data) {
    // console.log('drawFiveDayForecast');
    // console.log(data);
  },
  drawHistoricalSummary: function(data) {
    // console.log('drawHistoricalSummary');
    // console.log(data);
  }
}
