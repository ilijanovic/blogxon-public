class StartupService {
  private checkMongodbConnectionUri(): Boolean {
    return typeof process.env.MONGODB_URI === 'string'
  }
  private checkVapidPublicKey(): Boolean {
    return typeof process.env.VAPID_PUBLIC === 'string'
  }
  private checkVapidPrivateKey(): Boolean {
    return typeof process.env.VAPID_PRIVATE === 'string'
  }
  private checkPrivateKey(): Boolean {
    return typeof process.env.PRIVATE_KEY === 'string'
  }

  private checkSendgridKey(): Boolean {
    return typeof process.env.SENDGRID === 'string'
  }
  public requirementsCheck(): void {
    console.log('Requirements check...')
    let connectCheck = this.checkMongodbConnectionUri()
    let vapidPublicCheck = this.checkVapidPublicKey()
    let vapidPrivateCheck = this.checkVapidPrivateKey()
    let privateKeyCheck = this.checkPrivateKey()
    let sendgridKeyCheck = this.checkSendgridKey()
    console.log(
      'MongoDB URI check: ' + connectCheck ? '%cSuccess' : '%cFailed',
      'color: green'
    )
    if (
      !connectCheck ||
      !vapidPublicCheck ||
      !vapidPrivateCheck ||
      !privateKeyCheck ||
      !sendgridKeyCheck
    ) {
      console.log('Requirements check failed')
      process.exit()
    }
  }
}

export const startupService: StartupService = new StartupService()
