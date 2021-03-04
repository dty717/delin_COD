var jwt = require("jsonwebtoken");
var authorizationToken = jwt.sign(
  {
    iss: "FZZVSRYRV4",
    iat: Math.round(new Date().getTime() / 1000),
  },
  fs.readFileSync("C:/Users/18751/Downloads/AuthKey_PMD235SDRM.p8", "utf8"),
  {
    header: {
      alg: "ES256",
      kid: "PMD235SDRM",
    },
  }
);
var http2 = require('http2');
IS_PRODUCTION = true
var client = http2.connect(
  IS_PRODUCTION ? 'https://api.push.apple.com' : 'https://api.sandbox.push.apple.com'
);

var request = client.request({
  ':method': 'POST',
  ':scheme': 'https',
  'apns-topic': 'org.dty.delinCOD',
  ':path': '/3/device/' +  "6dbbe9c9da2c82219544a739dda62d09219a3cffb1cf76e8409a45b6ee1080d5", // This is the native device token you grabbed client-side
  authorization: `bearer ${authorizationToken}`, // This is the JSON web token we generated in the "Authorization" step above
});
request.setEncoding('utf8');

request.write(
  JSON.stringify({
    aps: {
      alert: {
        title: "\uD83D\uDCE7 You've got mail!!!!",
        body: 'Hello world! \uD83C\uDF10',
      },
    },
    experienceId: '@yourExpoUsername/yourProjectSlug', // Required when testing in the Expo Go app
  })
);
request.end();

