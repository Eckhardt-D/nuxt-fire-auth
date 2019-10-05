const functions = require("firebase-functions");
const cookieparser = require("cookieparser");
const JWTDecode = require("jwt-decode");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.auth = functions.https.onRequest((req, res) => {
  if (
    req.headers.origin.match("http://localhost:5000") ||
    req.headers.origin.match("http://localhost:3000") ||
    req.headers.origin.match("https://nuxtfire-temp.firebaseapp.com")
    // ADD YOUR WEBSITE'S ORIGIN ABOVE
  ) {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Credentials", "true");
  }

  if (!req.headers.cookie) return res.json({ uid: null, email: null });

  const parsed = cookieparser.parse(req.headers.cookie);
  const accessTokenCookie = parsed.access_token;

  if (!accessTokenCookie) return res.json({ uid: null, email: null });

  const decoded = JWTDecode(accessTokenCookie);

  if (decoded) {
    return res.json({
      uid: decoded.user_id,
      email: decoded.email
    });
  }

  return res.status(500).json({ error: "Error occurred on server" });
});
