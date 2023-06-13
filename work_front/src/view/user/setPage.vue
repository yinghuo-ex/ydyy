<template>
  <div class="container">
    <div class="button-container">
      <button class="confirm-button" @click="handleConfirm">修改</button>
    </div>
    <div class="input-container">
      <label for="input1" class="input-label">账号：</label>
      <input v-model="user1.username" type="text" class="input-field input1">
      <label for="input2" class="input-label">密码：</label>
      <input v-model="user1.password" type="text" class="input-field input2">
      <label for="input3" class="input-label">头像：</label>
      <el-form-item  prop="user1.image">
          <input type="file" accept="image/*" @change="handleFileChange">
      </el-form-item>
    </div>
  </div>
</template>
<script>
import { mapMutations, useStore } from 'vuex'
import store from '../../store'
export default {
  setup () {
    const store = useStore()
    const nowUser = store.state.$nowUser
    return { nowUser }
  },
  created () {
    this.user1.username = this.nowUser.username
    this.user1.email = this.nowUser.email
    console.log('eeee')
    console.log(this.nowUser)
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
  methods: {
    ...mapMutations(['loginUser']),
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
    handleConfirm () {
      this.$axios
        .patch('/user', {
          user: {
            email: this.nowUser.email,
            username: this.user1.username,
            password: this.user1.password,
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
          if (response.status === 200) {
            this.user1 = response.data
            store.commit('LoginUser', this.user1)
            this.$router.push('/login')
          }
        })
        .catch((error) => {
          console.error('Error:', error.response.data.errors)
        })
    }
  }
}
</script>
<style scoped>
.container {
  height: 450px;
  background-color: #ffb8a9;
  padding: 15px;
  margin-bottom: 10px;
}

.button-container {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
}

.confirm-button,
.cancel-button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #ff6b6b;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  margin-left: 10px;
}

.input-container {
  height: 400px; /* 设置输入栏容器的高度 */
  display: flex;
  flex-direction: column;
}

.input-field {
  padding: 10px;
  margin-bottom: 10px;
  border: none;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 300px; /* 设置输入栏的宽度 */
}

.input1 {
  height: 30px;
}

.input2 {
  height: 30px;
}

.input3 {
  height: 30px;
}

.input4 {
  height: 30px;
}

.input-label {
  margin-bottom: 5px;
  font-weight: bold;
}
</style>
