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
    })
    describe('parseText', function() {
      it('is a function', function() {
        expect(parse.parseText).to.be.a('function')
      })
    })
    describe('parseSimpleForecasts', function() {
      it('is a function', function() {
        expect(parse.parseSimpleForecasts).to.be.a('function')
      })
    })
    describe('parseTextForecasts', function() {
      it('is a function', function() {
        expect(parse.parseTextForecasts).to.be.a('function')
      })
    })
    describe('parseOneDayForecast', function() {
      it('is a function', function() {
        expect(parse.parseOneDayForecast).to.be.a('function')
      })
    })
    describe('parseFiveDayForecast', function() {
      it('is a function', function() {
        expect(parse.parseFiveDayForecast).to.be.a('function')
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
