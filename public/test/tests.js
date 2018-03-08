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
    describe('parseHistoricalWeather', function() {
      it('is a function', function() {
        expect(parse.parseHistoricalWeather).to.be.a('function')
      })
      it('sampleData.historicalWeather', function() {
        let result = parse.parseHistoricalWeather(sampleData.historicalWeather)
        expect(result.dateString).to.be.not.equal(null)
        expect(result.date).to.be.not.equal(null)
        expect(result.maxtempi).to.be.not.equal(null)
        expect(result.maxtempm).to.be.not.equal(null)
        expect(result.meantempi).to.be.not.equal(null)
        expect(result.meantempm).to.be.not.equal(null)
        expect(result.mintempi).to.be.not.equal(null)
        expect(result.mintempm).to.be.not.equal(null)
        expect(result.simple).to.be.not.equal(null)
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
describe('Utilities', function() {
  describe('Historic Data String', function() {
    describe('generateHistoryString', function() {
      it('is a function', function() {
        expect(historicData.generateHistoryString).to.be.a('function')
      })
      it('Date(1999, 9, 4), the month is zero-based', function() {
        expect(historicData.generateHistoryString(new Date(1999, 9, 4))).to.be.equal('history_19991004')
      })

    })
    describe('generateHistoryArray', function() {
      it('is a function', function() {
        expect(historicData.generateHistoryArray).to.be.a('function')
      })
      it('generateHistoryArray daily', function() {
        const today = new Date(1990, 0, 12)
        let result = historicData.generateHistoryArray(today, 3, 'days')
        expect(result.history_19900110).to.be.equal(false)
        expect(result.history_19900111).to.be.equal(false)
        expect(result.history_19900112).to.be.equal(false)
      })
      it('generateHistoryArray weekly', function() {
        const today = new Date(1990, 0, 12)
        result = historicData.generateHistoryArray(today, 7, 'weeks')
        expect(result.history_19891201).to.be.equal(false)
        expect(result.history_19891208).to.be.equal(false)
        expect(result.history_19891215).to.be.equal(false)
        expect(result.history_19891222).to.be.equal(false)
        expect(result.history_19891229).to.be.equal(false)
        expect(result.history_19900105).to.be.equal(false)
        expect(result.history_19900112).to.be.equal(false)
      })
      it('generateHistoryArray monthly', function() {
        const today = new Date(1990, 0, 12)
        result = historicData.generateHistoryArray(today, 3, 'months')
        expect(result.history_19891112).to.be.equal(false)
        expect(result.history_19891212).to.be.equal(false)
        expect(result.history_19900112).to.be.equal(false)
      })
    })
  })
})
