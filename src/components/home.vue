<template>
  <div>
    <p class="title">
      Hello
      <span>{{data.user.first_name }} {{ data.user.last_name }}</span> your next technical evaluation request will be avalible
    </p>

    <section>
      <div>
        <el-form ref="sentEmails" :model="sentEmails">
          <el-row type="flex" class="row-bg" justify="center">
            <el-col :xs="12" :sm="10" :md="7" :lg="7" :xl="7" class="select-col">
              <el-select
                v-model="selectedEmails"
                placeholder="Supervisor's email"
                multiple
                class="select-input"
              >
                <el-option
                  v-for="item in emails"
                  :key="item.user.id"
                  :label="item.user.email"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-col>
          </el-row>
          <div>
            <el-row type="flex" class="row-bg div-buttons" justify="center" :gutter="20">
              <el-col
                v-for="typ in types"
                :key="typ.index"
                :value="typ.id"
                v-model="evaluation_type"
                :xs="20"
                :sm="12"
                :md="8"
                :lg="4"
                :xl="4"
                class="technical-button-col"
              >
                <div>
                  <el-button
                    :xs="24"
                    @click.prevent="requestEvaluate(typ.id)"
                    :class="['button', typ.id===1?'technical-button':'personal-button']"
                  >{{typ.name}} evaluation</el-button>
                </div>
              </el-col> 
            </el-row> 
          </div>
        </el-form>
        <div class="image">
          <img src="../assets/image/panda.png" width="70" height="70" />
          <span class="good-luck">Goog luck</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { HTTP } from "../share/Api";
//import store from "../store";

export default {
  data() {
    return {
      sentEmails: {},
      selectedEmails: [],
      evaluation_type: "",
      emails: [],
      token: "",
      value: "",
      data: {
        user: {}
      },
      types: [],
      technicalButton: ""
    };
  },

  methods: {
    getEmails() {
      HTTP.get("emails")
        .then(response => {
          this.emails = response.data;
        })
        .catch(() => {
          this.$message.error("Please, try later.");
        });
    },
    getTypes() {
      HTTP.get("types").then(response => {
        this.types = response.data;
      });
    },
    requestEvaluate(id) {
      if (this.selectedEmails.length > 0) {
        var emailObj = {
          from_user: this.data.id,
          evaluation_type: id,
          to_user: this.selectedEmails,
          enterprise: "xWare"
        };
        HTTP.post("http://127.0.0.1:8000/evaluations/", emailObj)
          .then(response => {
            // const token = response.data.token;
            // store.commit("SAVE_TEKEN", token);
            if (response.status === 201) {
              this.$message({
                message: "Your request has been sent",
                type: "success"
              });
            }
          })
          .catch(() => {
            this.$message.error("Please, try later.");
          });
      } else {
        this.$message.error("Sorry, you must choose the emails first.");
      }
      this.selectedEmails = [];
    },
    getData() {
      HTTP.get("profile").then(response => {
        this.data = response.data.profile;
        console.log(this.data);
      });
    }
  },

  created() {
    this.getEmails();
    //this.token = localStorage.getItem("token");
    this.getData();
    this.getTypes();
  }
};
</script>

<style lang="scss" scoped>
.title {
  margin-top: 100px;
  margin-bottom: 30px;
  padding: 30px;
}
section {
  padding: 20px;
  background: #f2f2f2;
}
section .select-input {
  margin-bottom: 40px;
  width: 100%;
}
section button {
  border-radius: 8px;
  padding-top: 40px;
  padding-bottom: 40px;
  width: 100%;
  margin-top: 20px;
}
section .technical-button {
  background: #42b983;
  color: #fff;
}

section .personal-button {
  background: tomato;
  color: #fff;
}
.image {
  margin-top: 191px;
}
@media screen and (max-width: 550px) {
  section .select-col {
    width: 100%;
  }
  section .div-buttons {
    display: block;
    margin-left: 10% !important;
  }
}
</style>
