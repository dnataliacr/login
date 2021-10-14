<template>
  <div v-if="!userStore.getters.isLoggedIn">
    <LoginForm />
  </div>
  <div v-else>
    <h2>Welcome, {{ userStore.state.name }}</h2>
    <el-button type="primary" @click="userStore.logout()">Logout</el-button>
  </div>
</template>

<script>
import { defineComponent, onMounted } from "vue";
import LoginForm from "@/components/LoginForm.vue";
import userStore from "@/stores/user";

export default defineComponent({
  name: "App",
  components: { LoginForm },
  setup() {
    onMounted(userStore.getUser);
    return { userStore };
  },
});
</script>
