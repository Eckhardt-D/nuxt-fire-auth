const url = "http://localhost:5001/nuxtfire-temp/us-central1/auth";

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
        store.commit("users/SET_USER", { uid, email });
        return next();
      });
    }
  });
}

async function requestUserWithCookie() {
  const response = await fetch(
    /*

      NB! Remember to change the url when hosting
      https://us-central1-<YOUR-PROJECT-ID>.cloudfunctions.net/auth

    */
    url,
    { credentials: "include" }
  );

  return await response.json();
}
