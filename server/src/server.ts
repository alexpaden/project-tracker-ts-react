import app from './app'
import http from 'http'
import { PORT } from './utils/config'

import { AppDataSource } from './data-source'

// temporary db housing
AppDataSource.initialize()
  .then(() => {
    console.log('Database initialized')
  })
  .catch((error) => {
    console.log('Database initialization failed')
    console.log(error)
  })

const server = http.createServer(app)

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
