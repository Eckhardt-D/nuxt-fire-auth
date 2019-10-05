/*
  NB! Remember to change the url when hosting
  https://us-central1-<YOUR projectId>.cloudfunctions.net/auth
*/
const url = "https://us-central1-nuxtfire-temp.cloudfunctions.net/auth";

export default async function({ app }) {
  const { store } = app.context;

  app.router.beforeEach((to, _, next) => {
    const user =
      store.state.users.user || JSON.parse(localStorage.getItem("cached_user"));
    const blockedRoute = /\/admin\/*/g;
    const homeRoute = "/";

    if (to.path === homeRoute) return next();
    if (user && to.path.match(blockedRoute)) return next();

    if (!user && to.path.match(blockedRoute)) {
      requestUserWithCookie().then(({ uid, email }) => {
        if (!uid || !email) next("/");
        localStorage.setItem("cached_user", JSON.stringify({ uid, email }));
        store.commit("users/SET_USER", { uid, email });
        return next();
      });
    }
  });
}

async function requestUserWithCookie() {
  const response = await fetch(url, { credentials: "include" });
  return await response.json();
}
