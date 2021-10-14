<template>
  <div class="common-layout">
    <el-container>
      <el-header></el-header>
      <el-main>
        <div v-if="!userStore.getters.isLoggedIn">
          <LoginForm />
        </div>
        <div v-else>
          <h2>Welcome, {{ userStore.state.name }}</h2>
          <el-button type="primary" @click="userStore.logout()"
            >Logout</el-button
          >
        </div>
      </el-main>
    </el-container>
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
<style>
.el-header {
   background-color: #e9eef3;
 
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 60px;
}

.el-main {
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 160px;
  height: 90vh;
}

body > .el-container {
  margin-bottom: 40px;
}
</style>