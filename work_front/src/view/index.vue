<template>
  <div class="container">
    <h1>请选择操作</h1>
    <router-link class="button" to="/login">登录</router-link>
    <router-link class="button" to="/register">注册</router-link>
  </div>
</template>

<script>
import { reactive } from 'vue'

export default {
  setup () {
    const state = reactive({
      data: ''
    })
    return {
      state
    }
  }
}
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60vh;
}

h1 {
  margin-top: 0;
  font-size: 24px;
  color: #333;
  text-align: center;
}

.button {
  display: inline-block;
  padding: 10px 20px;
  font-size: 18px;
  background-color: #4286f4;
  color: #ffffff;
  border-radius: 5px;
  margin: 10px;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.button:hover {
  background-color: #0a59c1;
}

@media screen and (max-width: 375px) {
  h1 {
    font-size: 20px;
  }

  .button {
    font-size: 16px;
    padding: 8px 16px;
  }
}
</style>
