<template>
  <div>
    <section>
      <h1>
        <span>E</span>valuate
      </h1>
      <p>Sign in</p>
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :xs="16" :sm="10" :md="8" :lg="6" :xl="8">
          <el-form
            :model="loginForm"
            :rules="rules"
            status-icon
            ref="loginForm"
            class="demo-dynamic"
          >
            <el-row>
              <el-col>
                <el-form-item prop="username">
                  <el-input v-model="loginForm.username" placeholder="Username" class="input"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-form-item prop="password">
              <el-input
                type="password"
                v-model="loginForm.password"
                autocomplete="off"
                placeholder="Password"
              ></el-input>
            </el-form-item>

            <el-form-item>
              <el-button @click="loginSubmit('loginForm')" class="button login-button">Login</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </section>
  </div>
</template>


<script>
import axios from "axios";
// import store from "../store";

var validateEmail = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("Please input the username"));
  } else callback();
};
var validatePass = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("Please input the password"));
  }
  callback();
};
export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      },
      post: [],
      error: [],
      rules: {
        password: [{ validator: validatePass, trigger: "change" }],
        username: [{ validator: validateEmail, trigger: "change" }]
      }
    };
  },
  methods: {
    loginSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          axios
            .post("http://127.0.0.1:8000/auth/login/", this.loginForm)
            .then(response => {
              const token = response.data.token;
              localStorage.setItem("token", token);
              //store.commit("SAVE_TEKEN", token);
              if (response.status === 200) {
                this.$router.replace("/home");
                this.$message({
                  message: "Welcome",
                  type: "success"
                });
              }
            })
            .catch(() => {
              this.$message.error("Oops, the username or password incorrect.");
            });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
section {
  margin-top: 200px;
}
section h1 span {
  color: #42b983;
}
section h1 {
  margin-bottom: 30px;
}
section p {
  margin-bottom: 25px;
}
.button {
  width: 100%;
  background: #42b983;
  color: white;
}
.el-input__inner {
  border-radius: 0;
  border-radius: 10px !important;
}
</style>
