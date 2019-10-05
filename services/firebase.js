import firebase from "firebase/app";
import "firebase/auth";

const config = {
  apiKey: process.env.NUXT_ENV_API_KEY,
  authDomain: process.env.NUXT_ENV_AUTH_DOMAIN,
  databaseURL: process.env.NUXT_ENV_DATABASE_URL,
  projectId: process.env.NUXT_ENV_PROJECT_ID,
  storageBucket: process.env.NUXT_ENV_STORAGE_BUCKET,
  messagingSenderId: process.env.NUXT_ENV_MESSAGE_SENDER_ID,
  appId: process.env.NUXT_ENV_APP_ID
};

!firebase.apps.length ? firebase.initializeApp(config) : "";

export const auth = firebase.auth();
