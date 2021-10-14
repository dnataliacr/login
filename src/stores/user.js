import { reactive, computed } from "vue";

const state = reactive({
  email: "",
  name: "",
  error: "",
});

const getters = reactive({
  isLoggedIn: computed(() => state.email !== ""),
});

const actions = {
  async getUser() {
    // const user = await Request.getUser()
    // if (user == null) return
    // state.name = user.name
    // state.username = user.username
  },
  async login(email, password) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    };

    const response = await fetch(
      "https://api_preprod.aequales.com/v1/auth/login",
      options
    );
    const { data, error } = await response.json();

    if (error.message) {
      state.error = error.message;

      return false;
    } else {
      // access_token: "..."
      // expires_at: "2022-10-14 02:48:57"
      // token_type: "Bearer"
      // user_email: ".."
      // user_id: 4097
      // user_name: "Aitor"

      state.email = data.user_email;
      state.name = data.user_name;

      return true;
    }
  },
  async logout() {
    state.name = "";
    state.email = "";
    state.error = "";
  },
};

export default { state, getters, ...actions };
