const htmlTags = {
  getImageTag: function(src, width, height) {
    return `<img src="${src}" width="${width}px" height="${height}px">`
  },
  getDivTags: function(text) {
    return `<div>${text}</div>`
  }
}
const dom = {
  drawCurrentCondition: function(data) {
    // console.log('drawCurrentCondition');
    // console.log(data);
    $('#current-temperature').text(`${data.temp_f}°F`)
    const imageTag = $(htmlTags.getImageTag(data.icon_url, 100, 100))
    imageTag.addClass('center-image')
    $('#weather-image').append(imageTag)
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
        $('#alerts').text('No Active Alerts')
        $('#alert-btn').attr('disabled', true)
        $('#alerts').addClass('no-alert')
        $('#alerts').removeClass('alert')
      }
    } else {
      $('#alerts').text('No Active Alerts')
      $('#alert-btn').attr('disabled', true)
      $('#alerts').addClass('no-alert')
      $('#alerts').removeClass('alert')
    }
  },
  drawOneDayForecast: function(data) {
    // console.log('drawOneDayForecast');
    console.log(data);
    $('#high-temp').text(`${data.simple.high.fahrenheit}°F`)
    $('#low-temp').text(`${data.simple.low.fahrenheit}°F`)
    $('#today').append($(htmlTags.getDivTags(data.simple.date.pretty)))
    $('#today').append($(htmlTags.getDivTags(data.verbose.fcttext)))
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