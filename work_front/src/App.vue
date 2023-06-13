<template>
  <div>
    <header v-if="isBackend"> <!-- 后台固定的组件放在这里 --> </header>
    <main>
      <router-view></router-view> <!-- 路由对应的组件显示在这里 -->
    </main>
    <footer> <!-- 前台固定的组件放在这里 --> </footer>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isBackend: false // 控制后台组件的显示与隐藏
    }
  },
  created () {
    // 根据路由判断是否为后台页面
    this.$router.beforeEach((to, from, next) => {
      if (to.path.startsWith('/main')) {
        this.isBackend = true // 显示后台组件
      } else {
        this.isBackend = false // 隐藏后台组件
      }
      next()
    })
  }
}
</script>
