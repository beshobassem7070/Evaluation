<template>
  <div>
    <section>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <el-row type="flex" class="row-bg" justify="center">
          <el-col :xs="16" :sm="16" :md="16" :lg="16" :xl="16">
            <div class="all-question">
              <h3>Please answer all question to evaluate</h3>

              <div class="question" v-for="question in questions" :key="question.id">
                <el-row>
                  <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="6">
                    <h6>{{question.question_body}}</h6>
                  </el-col>
                  <el-col :xs="24" :sm="16" :md="16" :lg="16" :xl="16">
                    <el-form-item prop="question1">
                      <el-radio-group v-model="ruleForm.question1" class="choose-answer">
                        <el-row>
                          <el-col :xs="12" :sm="12" :md="12" :lg="6" :xl="16" v-for="choice in question.choices" :key="choice.id">
                            <el-radio :lable="choice.id"  class="radio">{{choice.choice}}</el-radio>
                          </el-col>
                        </el-row>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
              
              <div class="question">
                <el-row>
                  <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="6">
                    <h6>You can sent any notes</h6>
                  </el-col>
                  <el-col :xs="24" :sm="14" :md="15" :lg="15" :xl="16">
                    <el-form-item>
                      <el-input class="note" type="textarea" v-model="ruleForm.notes"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>

              <el-form-item>
                <el-row type="flex" class="row-bg" justify="center">
                  <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="16">
                    <el-button
                      class="answer-button"
                      @click="submitForm('ruleForm')"
                    >Sent your evalaute</el-button>
                  </el-col>
                </el-row>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </section>
  </div>
</template>


<script>
import { HTTP } from "../share/Api";

export default {
  data() {
    return {
      ruleForm: {
        question1: "",
        question2: "",
        question3: "",
        question4: "",
        question5: "",
        notes: ""
      },
      rules: {
        question1: [
          {
            required: true,
            message: "Please select activity resource",
            trigger: "change"
          }
        ],
        question2: [
          {
            required: true,
            message: "Please select activity resource",
            trigger: "change"
          }
        ],
        question3: [
          {
            required: true,
            message: "Please select activity resource",
            trigger: "change"
          }
        ],
        question4: [
          {
            required: true,
            message: "Please select activity resource",
            trigger: "change"
          }
        ],
        question5: [
          {
            required: true,
            message: "Please select activity resource",
            trigger: "change"
          }
        ]
      },
      questions:[]
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$message({
            message: "Welcome",
            type: "success"
          });
        } else {
          this.$message.error("Oops, the username or password incorrect.");
        }
      });
    },
    getQuestion() {
      HTTP.get("evaluations/types/2/questions/").then(response => {
        this.questions = response.data;
      });
    }
  },
  created() {
    this.getQuestion()
  },
};
</script>

<style lang="scss" scoped>
section {
  background: #f2f2f2;
}
.all-question {
  padding: 20px;
  margin-top: 50px;
}
h3 {
  margin-bottom: 40px;
}
.question {
  border-left: 10px solid tomato;
  padding: 10px;
  padding-top: 40px;
  margin-top: 20px;
  background: white;
  border-radius: 5px;
}
.question label {
  font-weight: bold;
}

.question h6 {
  float: left;
  font-weight: bold;
  margin-left: 10px;
}
.question .choose-answer {
  width: 100%;
}
.question .radio {
  float: left;
  margin-left: 10px;
}

.answer-button {
  margin: auto;
  margin-top: 30px;
  color: white;
  background: tomato;
  width: 100%;
  padding: 20px;
  font-size: 17px;
  font-weight: bold;
  border-radius: 10px;
}
</style>
