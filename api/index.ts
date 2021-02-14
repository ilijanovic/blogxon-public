import express, { Express, RequestHandler } from 'express'
import postRoutes from './internal/routes/post'
import getRoutes from './internal/routes/get'
import externalGetRoutes from './external/routes/get'
import externalPostRoutes from './external/routes/post'
import { getUserInfo } from './internal/middleware/getUserInfo'
import { startCheckingViews } from './internal/tasks/cronjob'

let app: Express = express()
class App {
  public app: Express
  constructor(app: Express) {
    this.app = app
    this.mountRoutes()
    this.startCronJobs()
  }

  private mountRoutes() {
    this.app.use('/internal/', getRoutes)
    this.app.use('/internal/', express.json(), postRoutes)
    this.app.use('/', <RequestHandler>getUserInfo, externalGetRoutes)
    this.app.use(
      '/',
      <RequestHandler>getUserInfo,
      express.json(),
      externalPostRoutes
    )
  }
  private startCronJobs() {
    startCheckingViews.start()
  }
}

export default {
  path: '/api/',
  handler: new App(app).app,
}
