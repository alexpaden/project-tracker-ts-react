import app from '../src/app'
import request from 'supertest'
import http from 'http'
import shutdown from 'http-graceful-shutdown'
import { AppDataSource } from '../src/data-source'
import { PORT } from '../src/utils/config'

describe('GET /projects', () => {
  let server: http.Server

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then(() => {
        console.log('Database initialized')
      })
      .catch((error) => {
        console.log('Database initialization failed')
        console.log(error)
      })
    server = http.createServer(app)
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  })

  afterAll(async () => {
    await shutdown(server)
    return new Promise<void>((resolve, reject) => {
      server.close((err) => {
        err ? reject(err) : resolve()
      })
    })
  })

  it('should return an array of projects', () => {
    return request(server)
      .get('/projects')
      .expect(200)
      .then((response) => {
        expect(response.body).toBeInstanceOf(Array)
      })
  })
})
