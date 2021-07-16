const app = require('./app')
const http = require('http')
const cors = require('cors')
const mongoose = require('mongoose')

const server = http.createServer(app)


const config = require('./utils/config')
const logger = require('./utils/logger')




server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})