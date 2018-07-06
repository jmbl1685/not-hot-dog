'use strict'

const { resolve } = require('path')

const messages = {
  ERROR: {
    message: 'An error has ocurred'
  },
  FILE_EXCEEDED_LIMIT: {
    message: 'The file has exceeded the allowed limit'
  },
  SERVER_START: 'Server running in port %s'
}

module.exports = {
  sizeLimit: 43464400,
  port: process.env.PORT || 3000,
  credentials: {
    cloudinary: require(resolve('./credentials/cloudinary.json')),
    visionapi: require(resolve('./credentials/vision-api.json')),
  },
  messages
}