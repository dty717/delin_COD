const jwt = require("jsonwebtoken");
const authorizationToken = jwt.sign(
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
const http2 = require('http2');

const client = http2.connect(
  IS_PRODUCTION ? 'https://api.push.apple.com' : 'https://api.sandbox.push.apple.com'
);

const request = client.request({
  ':method': 'POST',
  ':scheme': 'https',
  'apns-topic': 'YOUR-BUNDLE-IDENTIFIER',
  ':path': '/3/device/' + nativeDeviceToken, // This is the native device token you grabbed client-side
  authorization: `bearer ${authorizationToken}`, // This is the JSON web token we generated in the "Authorization" step above
});
request.setEncoding('utf8');

request.write(
  JSON.stringify({
    aps: {
      alert: {
        title: "\uD83D\uDCE7 You've got mail!",
        body: 'Hello world! \uD83C\uDF10',
      },
    },
    experienceId: '@yourExpoUsername/yourProjectSlug', // Required when testing in the Expo Go app
  })
);
request.end();