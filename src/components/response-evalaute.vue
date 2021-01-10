<template>
  <div>
    <section>
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :xs="16" :sm="16" :md="16" :lg="16" :xl="16">
          <div class="responses-of-evaluate">
            <h3>Your evalaute</h3>
            <div class="response">
              <h6>16/4/2020</h6>
              <div>
                <el-row>
                  <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="16">
                    <div class="question-ansewer">
                      <el-row>
                        <el-col :xs="17" :sm="16" :md="16" :lg="16">
                          <p>Clean code ?</p>
                        </el-col>
                        <el-col :xs="7" :sm="8" :md="8" :lg="8">
                          <span>Very good</span>
                        </el-col>
                      </el-row>
                    </div>
                    <div class="question-ansewer">
                      <el-row>
                        <el-col :xs="17" :sm="16" :md="16" :lg="16">
                          <p>Technical skills ?</p>
                        </el-col>
                        <el-col :xs="7" :sm="8" :md="8" :lg="8">
                          <span>good</span>
                        </el-col>
                      </el-row>
                    </div>
                    <div class="question-ansewer">
                      <el-row>
                        <el-col :xs="17" :sm="16" :md="16" :lg="16">
                          <p>Git and github skills ?</p>
                        </el-col>
                        <el-col :xs="7" :sm="8" :md="8" :lg="8">
                          <span>good</span>
                        </el-col>
                      </el-row>
                    </div>
                    <div class="question-ansewer">
                      <el-row>
                        <el-col :xs="17" :sm="16" :md="16" :lg="16">
                          <p>Information about backend ?</p>
                        </el-col>
                        <el-col :xs="7" :sm="8" :md="8" :lg="8">
                          <span>good</span>
                        </el-col>
                      </el-row>
                    </div>
                    <div class="question-ansewer">
                      <el-row>
                        <el-col :xs="17" :sm="16" :md="16" :lg="16">
                          <p>Information about frontend ?</p>
                        </el-col>
                        <el-col :xs="7" :sm="8" :md="8" :lg="8">
                          <span>good</span>
                        </el-col>
                      </el-row>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </section>
  </div>
</template>


<script>
export default {
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
section {
  background: #f2f2f2;
}
.responses-of-evaluate {
  padding: 20px;
  margin-top: 60px;
}
h3 {
  margin-bottom: 40px;
}
.response {
  border-left: 10px solid #42b983;
  padding: 10px;
  padding-top: 40px;
  padding-bottom: 40px;
  margin-top: 20px;
  background: white;
  border-radius: 5px;
}
.response h6 {
  font-weight: bold;
  margin-left: 10px;
  vertical-align: middle;
  color: gray;
  text-align: left;
  margin-left: 20px;
}
.response .question-ansewer {
  background: #f2f2f2;
  margin-top: 20px;
  padding-top: 10px;
}
.response p {
  text-align: left;
  margin-left: 10px;
}
.response span {
  font-weight: bold;
  color: #42b983;
}
</style>
