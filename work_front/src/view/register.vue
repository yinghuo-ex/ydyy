<template>
  <!-- 视图显示部分-->
  <div class="register-container">
    <h2>注册页面</h2>
    <div id="inputStyle" class="inputClass">
      <el-form :model="user1" status-icon :rules="user1" ref="user1" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input type="text" v-model="user1.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="user1.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input type="text" v-model="user1.email"></el-input>
        </el-form-item>
        <el-form-item label="头像" prop="image">
          <input type="file" accept="image/*" @change="handleFileChange">
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
import { reactive } from 'vue'
import { mapGetters, mapMutations, useStore } from 'vuex'
import store from '../store'
export default {
  computed: {
    ...mapGetters(['getNowUser'])
  },
  data () {
    return {
      user1: {
        username: '1',
        password: '',
        email: '',
        image: ''
      }
    }
  },
  setup (props) {
    const store = useStore()
    const nowUser = store.state.$nowUser
    const state = reactive({
      data: ''
    })
    return { state, nowUser }
  },
  methods: {
    ...mapMutations(['loginUser']),
    submit () {
      this.$axios
        .post('/users', {
          user: {
            username: this.user1.username,
            password: this.user1.password,
            email: this.user1.email,
            image: this.user1.image
          }
        }, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QzIiwiZW1haWwiOiJqYWtlMkBqYWtlLmpha2UiLCJpYXQiOjE2ODYxMTA4ODJ9.K4eRrfUcq6REIulv_rhXEmGGMKxKwIfD7wp0sXWtTXQ'
          }
        })
        .then((response) => {
          console.log(response)
          if (response.status === 201) {
            this.user1 = response.data.user
            store.commit('LoginUser', this.user1)
            this.$router.push({
              path: '/article'
              /* query: {
                user: JSON.stringify(this.user1)
              } */
            })
          } else {
            alert('error cant create')
          }
        })
    },
    handleFileChange (event) {
      const file = event.target.files[0] // 获取选择的文件
      if (file) {
        const reader = new FileReader() // 创建文件读取器
        reader.onload = (e) => {
          // 读取文件完成时触发的回调函数
          this.user1.image = e.target.result // 将读取的文件内容赋值给 user1.avatar
        }
        reader.readAsDataURL(file) // 读取文件内容
        // 回调函数
      }
    },
    resetForm () {
      this.user1.username = '1'
      this.user1.password = ''
      this.user1.email = ''
      this.user1.image = ''
    }
  }
}
</script>
<style scoped>
  .register-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
