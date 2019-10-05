## Differences from server version documented here.

- Middleware is removed
- Use router.beforeEach method in plugin
- Add a function to handle checking the cookie in the header
- Set a localStorage version of the user when logging in

## Some important things to note when making this your own

- You have to update `services/firebase.js` with your own firebase config.
- You must change the url as specified in the comment in `plugins/checkIfUser.js`

> NB if you're developing local - you have to use `firebase serve` and change the url to the one provided in the logs (usually localhost:5001/...)

- In `functions/index.js` add your website's origin to the headers. Also if your localhost port is changed.



The flow of the authentication works like this:

### Load '/'
The `beforeEach` method in plugin fires before all routes and if it's not blocked, it continues.

### Login
The app logs in through firebase and sets the user and cookie locally, and redirects to `/admin`

### Load '/admin'
The `beforeEach` method sees that it is a blocked route and checks if there is a user in the store or in localStorage.

### No user locally
Send a fetch request with credentials (cookie) to the firebase function. The function parses the cookie and sends back the user.
If the user object isn't null, we set a user in the store and then continue to the page. Now the user will be available every time we visit protected routes and won't redirect back home.

### Protected
The app is also now protected by checking if a user exists even if we manually enter `/admin`.


# NB - This is client-side authentication, it's important to support it with strong API/server protection. eg. Only send the logged in user's data back.