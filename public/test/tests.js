const expect = chai.expect

const sampleData = {
  alertCedarvale: JSON.parse(alertCedarvale),
  currentWeather: JSON.parse(currentWeather),
  historicalSummary: JSON.parse(historicalSummary),
  historicalWeather: JSON.parse(historicalWeather),
  oneDay: JSON.parse(oneDay),
  tenDay: JSON.parse(tenDay)
}

describe('API', function() {
  console.log(sampleData.alertCedarvale);
  console.log(sampleData.currentWeather);
  console.log(sampleData.historicalSummary);
  console.log(sampleData.historicalWeather);
  console.log(sampleData.oneDay);
  console.log(sampleData.tenDay);
  describe('Parsing methods', function() {
    describe('parseCurrentCondition', function() {
      it('is a function', function() {
        expect(parse.parseCurrentCondition).to.be.a('function')
      })
      it('sampleData.currentWeather', function() {
        let result = parse.parseCurrentCondition(sampleData.currentWeather)
        expect(result.observation_time).to.be.not.equal(null)
        expect(result.feelslike_f).to.be.not.equal(null)
        expect(result.feelslike_c).to.be.not.equal(null)
        expect(result.icon_url).to.be.not.equal(null)
        expect(result.temp_f).to.be.not.equal(null)
        expect(result.temp_c).to.be.not.equal(null)
        expect(result.weather).to.be.not.equal(null)
        expect(result.wind_string).to.be.not.equal(null)
        expect(result.relative_humidity).to.be.not.equal(null)
      })
    })
    describe('parseWeatherAlerts', function() {
      it('is a function', function() {
        expect(parse.parseWeatherAlerts).to.be.a('function')
      })
      it('sampleData.alertCedarvale', function() {
        let result = parse.parseWeatherAlerts(sampleData.alertCedarvale)
        expect(result.length).to.be.gt(0)
        for (let i = 0; i < result.length; i++) {
          expect(result[i].description).to.be.not.equal(null)
          expect(result[i].date).to.be.not.equal(null)
          expect(result[i].expires).to.be.not.equal(null)
          expect(result[i].message).to.be.not.equal(null)
          expect(result[i].significance).to.be.not.equal(null)
          expect(result[i].type).to.be.not.equal(null)
        }
      })
    })
    describe('parseSimple', function() {
      it('is a function', function() {
        expect(parse.parseSimple).to.be.a('function')
      })
      it('sampleData.oneDay', function() {
        let result = parse.parseSimple(sampleData.oneDay.forecast.simpleforecast.forecastday[0])
        expect(result.conditions).to.be.not.equal(null)
        expect(result.high).to.be.not.equal(null)
        expect(result.high.fahrenheit).to.be.not.equal(null)
        expect(result.high.celsius).to.be.not.equal(null)
        expect(result.low).to.be.not.equal(null)
        expect(result.low.fahrenheit).to.be.not.equal(null)
        expect(result.low.celsius).to.be.not.equal(null)
        expect(result.date).to.be.not.equal(null)
        expect(result.date.pretty).to.be.not.equal(null)
      })
    })
    describe('parseText', function() {
      it('is a function', function() {
        expect(parse.parseText).to.be.a('function')
      })
      it('sampleData.oneDay', function() {
        let result = parse.parseText(sampleData.oneDay.forecast.txt_forecast.forecastday[0])
        expect(result.fcttext).to.be.not.equal(null)
        expect(result.fcttext_metric).to.be.not.equal(null)
        expect(result.icon_url).to.be.not.equal(null)
        expect(result.title).to.be.not.equal(null)
      })
    })
    describe('parseSimpleForecasts', function() {
      it('is a function', function() {
        expect(parse.parseSimpleForecasts).to.be.a('function')
      })
      it('sampleData.oneDay', function() {
        let result = parse.parseSimpleForecasts(sampleData.oneDay.forecast.simpleforecast, 0)
        expect(result.conditions).to.be.not.equal(null)
        expect(result.high).to.be.not.equal(null)
        expect(result.high.fahrenheit).to.be.not.equal(null)
        expect(result.high.celsius).to.be.not.equal(null)
        expect(result.low).to.be.not.equal(null)
        expect(result.low.fahrenheit).to.be.not.equal(null)
        expect(result.low.celsius).to.be.not.equal(null)
        expect(result.date).to.be.not.equal(null)
        expect(result.date.pretty).to.be.not.equal(null)
      })
    })
    describe('parseTextForecasts', function() {
      it('is a function', function() {
        expect(parse.parseTextForecasts).to.be.a('function')
      })
      it('sampleData.oneDay', function() {
        let result = parse.parseTextForecasts(sampleData.oneDay.forecast.txt_forecast, 0)
        expect(result.fcttext).to.be.not.equal(null)
        expect(result.fcttext_metric).to.be.not.equal(null)
        expect(result.icon_url).to.be.not.equal(null)
        expect(result.title).to.be.not.equal(null)
      })
    })
    describe('parseOneDayForecast', function() {
      it('is a function', function() {
        expect(parse.parseOneDayForecast).to.be.a('function')
      })
      it('sampleData.oneDay', function() {
        let result = parse.parseOneDayForecast(sampleData.oneDay)
        expect(result.simple).to.be.not.equal(null)
        expect(result.verbose).to.be.not.equal(null)
      })
    })
    describe('parseFiveDayForecast', function() {
      it('is a function', function() {
        expect(parse.parseFiveDayForecast).to.be.a('function')
      })
      it('sampleData.tenDay', function() {
        let result = parse.parseFiveDayForecast(sampleData.tenDay)
        expect(Array.isArray(result)).to.be.equal(true)
        expect(result.length).to.be.equal(5)
        for (let i = 0; i < result.length; i++) {
          expect(result[i].day).to.be.not.equal(null)
          expect(result[i].night).to.be.not.equal(null)
          expect(result[i].simple).to.be.not.equal(null)
        }
      })
    })
    describe('parseHistoricalSummary', function() {
      it('is a function', function() {
        expect(parse.parseHistoricalSummary).to.be.a('function')
      })
    })
    describe('parseGeoLookup', function() {
      it('is a function', function() {
        expect(parse.parseGeoLookup).to.be.a('function')
      })
      it('{location: {city: "Boulder", state: "CO"}}', function() {
        expect(parse.parseGeoLookup({location: {city: "Boulder", state: "CO"}}))
          .to.be.equal('CO/Boulder')
      })
    })
  })
})
