import { auth } from "@/services/firebase";
import Cookie from "js-cookie";

export const state = () => ({
  user: null
});

export const mutations = {
  SET_USER: (state, account) => {
    state.user = account;
  }
};

export const actions = {
  async login({ commit }, account) {
    try {
      // Login the user
      await auth.signInWithEmailAndPassword(account.email, account.password);

      // Get JWT from Firebase
      const token = await auth.currentUser.getIdToken();
      const { email, uid } = auth.currentUser;

      // Set JWT to the cookie
      Cookie.set("access_token", token);

      // Set the user locally
      commit("SET_USER", { email, uid });
    } catch (error) {
      throw error;
    }
  }
};
