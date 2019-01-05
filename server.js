'use strict'
// Node Modules

// dependencies

const express = require('express')
const cors = require('cors')

// Load env vars
require('dotenv').config()

const PORT = process.env.PORT || 3000

// app
const app = express()

app.use(cors())

// Get Location Data
app.get('/location', (request, response) => {
  const locationData = searchToLatLong(request.query.data)
  response.send(locationData)
})

function searchToLatLong (query) {
  const geoData = require('./data/geo.json')
  const location = new Location(geoData.results[0])
  return location
}
function Location (location) {
  this.formatted_query = location.formatted_address
  this.county = location.address_components[1].long_name
  this.bounds = location.geometry.bounds
  this.place_id = location.place_id
}
// Give Error Messages if incorrect

// app.get('/*', function (request, response) {
//   response.status(404).send('You Died')
// })

// start the app

app.listen(PORT, () => {
  console.log(`app is up on port : ${PORT}`)
})
