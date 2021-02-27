import fs from "fs"
function checkMongodbConnectionUri(): Boolean {
  return typeof process.env.MONGODB_URI === 'string' && process.env.MONGODB_URI !== ""
}
function checkVapidPublicKey(): Boolean {
  return typeof process.env.VAPID_PUBLIC === 'string'
}
function checkVapidPrivateKey(): Boolean {
  return typeof process.env.VAPID_PRIVATE === 'string'
}
function checkPrivateKey(): Boolean {
  return typeof process.env.PRIVATE_KEY === 'string'
}

function checkSendgridKey(): Boolean {
  return typeof process.env.SENDGRID === 'string'
}


function requirementsCheck(): void {
  console.log('Requirements check...')
  if (!fs.existsSync(".env")) {
    console.log("Cannot find '.env' file. Please type in the command", "\x1b[32m", "npm run env", "\x1b[37m", "to generate an '.env' file")
    process.exit()
  }
  let connectCheck = checkMongodbConnectionUri()
  let vapidPublicCheck = checkVapidPublicKey()
  let vapidPrivateCheck = checkVapidPrivateKey()
  let privateKeyCheck = checkPrivateKey()
  let sendgridKeyCheck = checkSendgridKey()

  if (
    !connectCheck ||
    !vapidPublicCheck ||
    !vapidPrivateCheck ||
    !privateKeyCheck ||
    !sendgridKeyCheck
  ) {
    console.log("\x1b[31m", 'Requirements check failed. Check your ".env" file for mistakes or missing values')
    process.exit()
  }
}

export default function () {

  //@ts-expect-error
  this.nuxt.hook("build:before", () => {

    requirementsCheck()

  })
}