<template>
  <el-form
    ref="ruleForm"
    :model="ruleForm"
    status-icon
    :rules="rules"
    label-width="120px"
    class="demo-ruleForm"
  >
    <el-form-item label="email" prop="email">
      <el-input
        v-model="ruleForm.email"
        type="email"
        autocomplete="on"
        name="email"
      ></el-input>
    </el-form-item>

    <el-form-item label="Password" prop="pass">
      <el-input
        v-model="ruleForm.pass"
        type="password"
        autocomplete="off"
        name="password"
      ></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')"
        >Submit</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script>
import userStore from "@/stores/user";

export default {
  data() {
    const validateEmail = (rule, value, callback) => {
      if (!value) {
        callback(new Error("Please enter your email!"));
      } else if (
        !/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(
          value
        )
      ) {
        callback(new Error("Please enter a valid email address!"));
      } else {
        callback();
      }
    };

    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please input the password"));
      } else {
        callback();
      }
    };

    return {
      ruleForm: {
        email: "",
        pass: "",
      },
      rules: {
        email: [{ validator: validateEmail, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
      },
      userStore,
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.$refs[formName];

          const result = await userStore.login(
            this.$refs[formName].model.email,
            this.$refs[formName].model.pass
          );

          if (!result) {
            alert(userStore.state.error);
          }
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>