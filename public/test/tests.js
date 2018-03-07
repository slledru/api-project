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
})
