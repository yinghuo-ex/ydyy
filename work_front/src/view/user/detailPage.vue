<template>
    <div class="container">
      <div class="button-container">
        <button class="cancel-button" @click="handleCancel">返回</button>
      </div>
      <div class="input-container">
        <input :value="input1" type="text" placeholder="文章标题" class="input-field input1" readonly>
        <input :value="input2" type="text" placeholder="文章内容" class="input-field input2" readonly>
        <textarea :value="input3" placeholder="写下你的文章" class="input-field input3" readonly></textarea>
      </div>
    </div>
</template>

<script>
import { useStore } from 'vuex'
export default {
  setup () {
    const store = useStore()
    const nowUser = store.state.$nowUser
    return { nowUser }
  },
  created () {
    this.slug = this.$route.query.slug
    this.$axios
      .get(`/articles/${this.slug}`
        , {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QzIiwiZW1haWwiOiJqYWtlMkBqYWtlLmpha2UiLCJpYXQiOjE2ODYxMTA4ODJ9.K4eRrfUcq6REIulv_rhXEmGGMKxKwIfD7wp0sXWtTXQ'
          }
        })
      .then((response) => {
        console.log(response)
        if (response.status === 200) {
          const it = response.data.article
          this.input1 = it.title
          this.input2 = it.description
          this.input3 = it.body
          // 剩余部分
        }
      })
      .catch((error) => {
        console.error('Error:', error.response.data.errors)
      })
  },
  data () {
    return {
      input1: '',
      input2: '',
      input3: '',
      input4: '',
      slug: ''
    }
  },
  methods: {
    handleConfirm () {
      this.$axios
        .patch(`/articles/${this.slug}`, {
          article: {
            title: this.input1,
            description: this.input2,
            body: this.input3,
            tagList: this.input4.split(' ')
          },
          user: {
            email: this.nowUser.email,
            username: this.nowUser.username,
            image: this.nowUser.image
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
            this.$router.push('/article')
          }
        })
        .catch((error) => {
          console.error('Error:', error.response.data.errors)
        })
    },
    handleCancel () {
      this.$router.push('/all')
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
    height: 300px;
  }

  </style>
