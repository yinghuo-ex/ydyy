<template>
    <!-- 视图显示部分-->
        <div class="login-container">
            <h2>登录页面</h2>
            <div id="inputStyle" class="inputClass">
                <el-form :model="user1" status-icon :rules="user1" ref="user1" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="邮箱" prop="email">
                        <el-input type="text" v-model="user1.email" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="user1.password" auto-complete="off"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="submit()">提交</el-button>
                        <el-button @click="resetForm()">重置</el-button>
                        <el-button type="text"><router-link to="/">回到首页</router-link></el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </template>

<script>
import store from '../store'

// 编写js行为
export default {
  name: 'LoginView',
  data () {
    return {
      user1: {
        email: '1',
        password: ''
      }
    }
  },
  created () {

  },
  methods: {
    submit () {
      this.$axios
        .post('/users/login', {
          user: {
            password: this.user1.password,
            email: this.user1.email
          }
        }, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QzIiwiZW1haWwiOiJqYWtlMkBqYWtlLmpha2UiLCJpYXQiOjE2ODYxMTA4ODJ9.K4eRrfUcq6REIulv_rhXEmGGMKxKwIfD7wp0sXWtTXQ'
          }
        })
        .then((response) => {
          console.log(response)
          if (response.status === 200) {
            this.user1 = response.data.user
            store.commit('LoginUser', this.user1)
            this.$router.push({
              path: '/article'
              /* query: {
                user: JSON.stringify(this.user1)
              } */
            })
          } else {
            alert('error cant login')
          }
        })
    },
    resetForm (formName) {
      this.user1.email = ''
      this.user1.password = ''
    }
  }
}
</script>
    <style scoped>
    .login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

     .inputClass{
            padding: 20px;
            width: 300px;
            height: 250px;
            margin: 0 auto;
        }
    .Codename{
            margin-right: 227px;
            padding: 10px;
            font-family: PingFang SC

        }
    .name{
            margin-left: -237px;
            padding: 10px;
            font-style: inherit
        }
    </style>
