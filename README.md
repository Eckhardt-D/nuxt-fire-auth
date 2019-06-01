## Authenticating users with Firebase and Nuxt SSR

### Relevant directories:

- store/index.js

  > nuxtServerInit checks for the cookie, and sets user to store on server.

- store/users/index.js

  > Where login action happens and JWT cookie from Firebase is set.

- middleware/authenticated.js

  > Where routes are authenticated and redirects happen if !user.

- pages/index.vue

  > Where the login form resides.
