<template>
  <div>
    <section>
      <el-row>
        <el-col :xs="20" :sm="20" :md="9" :lg="6" :xl="11" :offset="2" class="profile-info">
          <div class="grid-content bg-purple">
            <img :src="'http://127.0.0.1:8000' +data.image" width="120" height="120" />
            <h3>{{ data.user.first_name }} {{ data.user.last_name }}</h3>
            <p class="jop-title">{{ data.position }}</p>
            <p class="jop-status">your status</p>
            <p>{{ data.user.email }}</p>
            <div>
              <span>CV</span>
              <a
                style="margin-right:10px"
                class="cv-file"
                rel="noopener noreferrer"
                :href="'http://127.0.0.1:8000' + data.cv"
                target="_blank"
              >{{ data.user.first_name }}.pdf</a>

              <input type="file" name="file" id="file" class="input-file" />
              <label for="file" class="btn btn-tertiary js-labelFile">
                <span class="js-fileName">Choose a file</span>
              </label>
              <i class="el-icon-upload"></i>
            </div>
          </div>
          <el-row type="flex" class="row-bg" justify="center">
            <el-col :span="24">
              <el-form
                :model="changePassword"
                status-icon
                :rules="rules"
                ref="changePassword"
                class="demo-changePassword"
              >
                <div class="change-new_password-form">
                  <h6>Change password</h6>
                  <el-form-item prop="old_password">
                    <el-input
                      type="password"
                      v-model="changePassword.old_password"
                      autocomplete="off"
                      placeholder="Old password"
                    ></el-input>
                  </el-form-item>
                  <el-form-item prop="new_password">
                    <el-input
                      type="password"
                      v-model="changePassword.new_password"
                      autocomplete="off"
                      placeholder="New password"
                    ></el-input>
                  </el-form-item>
                  <el-form-item prop="checkPass">
                    <el-input
                      type="password"
                      v-model="changePassword.checkPass"
                      placeholder="Confirm new password"
                      autocomplete="off"
                    ></el-input>
                  </el-form-item>
                </div>

                <el-form-item>
                  <el-button
                    class="change-new_password-button"
                    @click="submitForm('changePassword')"
                  >Save</el-button>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
        </el-col>

        <el-col :xs="20" :sm="20" :md="10" :lg="13" :xl="11" :offset="2" >
          <div class="all-solution">
           
          <el-row class="technical request-evaluation" v-for="evaluateTo in evaluatesTo" :key="evaluateTo.id">
              <el-col :xs="12" :sm="12" :md="12" :lg="6" :xl="11">
                <div class="technical-solution technical-solution-first">
                  <h5>{{evaluateTo.created | formatDate}}</h5>
                  <p>{{evaluateTo.created | formatTime}}</p>
                  <p class="type">{{evaluateTo.evaluation.evaluation_type.name}}</p>
                </div>
              </el-col>
              <el-col :xs="12" :sm="12" :md="12" :lg="6" :xl="11">
                <div class="technical-solution">
                  <h5>xWARE</h5>
                  <P>{{evaluateTo.evaluation.from_user.user.email}}</P>
                </div>
              </el-col>
              <el-col :xs="12" :sm="12" :md="12" :lg="6" :xl="11">
                <div class="technical-solution">
                  <h5>Score</h5>
                  <p>score</p>
                </div>
              </el-col>
              <el-col :xs="12" :sm="12" :md="12" :lg="6" :xl="11">
                <div class="technical-solution">
                  <a @click="question(evaluateTo.evaluation.evaluation_type.name , evaluateTo.id )">see full details</a>
                </div>
              </el-col>
            </el-row>
            
            <el-row class="technical" v-for="evaluateFrom in evaluatesFrom" :key="evaluateFrom.id">
              <el-col :xs="12" :sm="12" :md="12" :lg="6" :xl="11">
                <div class="technical-solution technical-solution-first">
                  <h5>{{evaluateFrom.evaluation_type.created | formatDate}}</h5>
                  <p>{{evaluateFrom.evaluation_type.created | formatTime}}</p>
                  <p class="type">{{evaluateFrom.evaluation_type.name}}</p>
                </div>
              </el-col>
              <el-col :xs="12" :sm="12" :md="12" :lg="6" :xl="11">
                <div class="technical-solution">
                  <h5>{{evaluateFrom.enterprise}}</h5>
                  <P>from email</P>
                </div>
              </el-col>
              <el-col :xs="12" :sm="12" :md="12" :lg="6" :xl="11">
                <div class="technical-solution">
                  <h5>Score</h5>
                  <p>score</p>
                </div>
              </el-col>
              <el-col :xs="12" :sm="12" :md="12" :lg="6" :xl="11">
                <div class="technical-solution">
                  <a @click="$router.push('response-evalaute')">see full details</a>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </section>
  </div>
</template>


<script>
import { HTTP } from "../share/Api";
import moment from 'moment';

export default {
  data() {
    var validateOldPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please input the password"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please input the password"));
      } else if (value.length < 10) {
        callback(new Error("Please the minmum size is 10 chars "));

        callback();
      } else {
        if (this.changePassword.checkPass !== "") {
          this.$refs.changePassword.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please input the password again"));
      } else if (value !== this.changePassword.new_password) {
        callback(new Error("Two inputs don't match!"));
      } else {
        callback();
      }
    };
    return {
      changePassword: {
        old_password: "",
        new_password: "",
        checkPass: ""
      },
      data: {
        user: {}
      },
      rules: {
        old_password: [{ validator: validateOldPass, trigger: "change" }],
        new_password: [{ validator: validatePass, trigger: "change" }],
        checkPass: [{ validator: validatePass2, trigger: "change" }]
      },
      evaluatesFrom : [],
      evaluatesTo : []
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          HTTP.put(
            "http://127.0.0.1:8000/change-password/",
            this.changePassword
          )
            .then(response => {
              const token = response.data.token;
              localStorage.setItem("token", token);
              if (response.status === 200) {
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
    },
    getData() {
      HTTP.get("profile").then(response => {
        this.data = response.data.profile;

        const userDate = response.data;
        localStorage.setItem("userData ", userDate);
      });
    },
    getevaluateFrom(){
      HTTP.get("evaluations/from").then(response => {
        this.evaluatesFrom = response.data
        console.log(this.evaluatesFrom);
        
      })
    },
    getevaluateTo(){
      HTTP.get("evaluations/to").then(response => {
        this.evaluatesTo = response.data
        console.log(this.evaluatesTo);
        
      })
    },
    question(evalauteType, id) {
      if( evalauteType == "Technical") {
        this.$router.push(`technical-question/${evalauteType}/${id}`)
      }
      else {
        this.$router.push({
          name:"personal",
          params: { type:evalauteType , id:id}
        })
      }
    }
  },
  filters: {
  formatDate: function (value) {
    if (value) return moment(String(value)).format('MM/DD/YYYY')
  },
  formatTime: function (value) {
    if (value) return moment(String(value)).format('hh:mm')
  }
},
  created() {
    this.getData();
    this.getevaluateFrom();
    this.getevaluateTo();
  },
};
</script>

<style lang="scss" scoped>
section {
  background: #f2f2f2;
}
.profile-info {
  background: white;
  padding: 20px;
  padding-top: 40px;
}
.profile-info img {
  border-radius: 50%;
  border: 3px solid black;
}
.profile-info h3 {
  margin-top: 15px;
}
.profile-info .jop-status {
  margin-top: -15px;
}
.profile-info span {
  float: left;
  font-weight: bold;
}
.profile-info .cv-file {
  line-height: 0px;
  color: gray;
}
/************** */

$background-color: #42b983;
$button-color: #42b983;
$button-width: 10em;

label[for="file-input"] {
  display: block;
  margin-bottom: 1em;
  font-size: 1em;
  color: #fff;
  opacity: 0.9;
  font-weight: bold;
}

.btn-tertiary {
  color: white;
  padding: 10;
  background: $button-color;
  margin: auto;
  border-radius: 8px;
}

.input-file {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
  + .js-labelFile {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 0 10px;
    cursor: pointer;
  }
  + .js-labelFile:hover {
    color: white;
  }
}

section .el-icon-upload {
  font-size: 20px;
  margin-top: -10px;
  position: relative;
  bottom: -5px;
}

.change-new_password-form {
  background: #f2f2f2;
  padding: 15px;
  border-radius: 5px;
  margin-top: 30px;
}
.change-new_password-form h6 {
  float: left;
  font-weight: bold;
  padding: 5px;
}
.change-new_password-button {
  margin-top: 20px;
  float: right;
  padding-top: 5px;
  padding-bottom: 5px;
  border-radius: 10px;
  color: white;
  background: #42b983;
  font-size: 12px;
  font-weight: bold;
}
.all-solution {
  padding: 10px;
  margin-top: 40px;
}
.all-solution p {
  margin-top: -5px;
  color: gray;
  font-size: 14px;
}
.all-solution .type {
  margin-top: -20px;
  margin-bottom: -20px;
}
.technical {
  border-left: 10px solid tomato;
  padding: 20px;
  background: white;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-radius: 6px;
}
.request-evaluation {
  border-left: 10px solid #42b983;

}

.technical-solution {
  border-left: 2px solid #ddd;
  text-align: left;
  padding-left: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
}
.technical-solution-first {
  padding-left: 0 !important;
  border: none;
}
a {
  cursor: pointer;
  text-decoration: underline;
  line-height: 60px;
  vertical-align: middle;
}
</style>
