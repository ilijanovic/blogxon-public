let fs = require('fs')
let webpush = require('web-push')
function makeid(length) {
  var result = ''
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  var charactersLength = characters.length
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

function generateENV() {
  if (!fs.existsSync('.env')) {
    let privateKey = makeid(80)
    const vapidKeys = webpush.generateVAPIDKeys()
    fs.writeFileSync(
      '.env',
      `MONGODB_URI=\nPRIVATE_KEY=${privateKey}\nVAPID_PUBLIC=${vapidKeys.publicKey}\nVAPID_PRIVATE=${vapidKeys.privateKey}\nSENDGRID=`
    )
    console.log(
      '\x1b[32m',
      "'.env' file generated! In addition you will need to add an MongoDB URI key and Sendgrid key"
    )
  } else {
    console.log('\x1b[32m', "'.env' file already exist")
  }
  console.log('\x1b[37m')
}
generateENV()
