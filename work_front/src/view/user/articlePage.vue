<template>
    <div class="article-list-container">
      <button class="write-article-button" @click="write()">写文章</button>
      <ul>
        <li v-for="article in articles" :key="article.slug" @click="navigateToArticle(article.slug)">
          <h3>{{ article.title }}</h3>
          <p>{{ article.body }}</p>
        </li>
      </ul>
    </div>
  </template>

<script>
import { useStore } from 'vuex'
export default {
  created () {
    const store = useStore()
    const nowUser = store.state.$nowUser
    this.$axios
      .get('/articles', {
        params: {
          author: nowUser.username
        }
      }
      , {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QzIiwiZW1haWwiOiJqYWtlMkBqYWtlLmpha2UiLCJpYXQiOjE2ODYxMTA4ODJ9.K4eRrfUcq6REIulv_rhXEmGGMKxKwIfD7wp0sXWtTXQ'
        }
      })
      .then((response) => {
        console.log(response)
        if (response.status === 200) {
          this.articles = response.data.articles
        }
      })
      .catch((error) => {
        console.error('Error:', error.response.data.errors)
      })
  },
  data () {
    return {
      articles: [] // 存储文章列表的数组
    }
  },
  methods: {
    write () {
      this.$router.push({
        path: '/write'
      })
    },
    navigateToArticle (slug) {
      this.$router.push({
        path: '/rewrite', // 将文章slug添加到URL路径中
        query: { slug: slug }
      })
    }
  }
}
</script>

  <style scoped>
  .article-list-container {
    height: 450px;
    background-color: #ffb8a9;
    padding: 15px;
    margin-bottom: 10px;
    overflow-y: scroll;
  }

  .write-article-button {
    align-self: flex-end;
    border: none;
    border-radius: 5px;
    background-color: #ff6b6b;
    margin-left: 235px;
    color: #fff;
    font-weight: bold;
    cursor: pointer;
  }

  .write-article-button:hover {
    background-color: #ff8f8f;
  }

  .write-article-button:active {
    background-color: #ff4f4f;
  }
  ul {
    margin-top: 10px;
    margin-bottom: 10px;
  }

  li {
    margin-bottom: 10px;
  }

  </style>
