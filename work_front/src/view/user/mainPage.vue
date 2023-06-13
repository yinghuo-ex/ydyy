<template>
  <TopNav :image="avatarImage" :text="avatarText" />
  <router-view></router-view>
  <Footer />
  <ChildComponent @update-user-info="handleUpdateUserInfo"></ChildComponent>
</template>
<script>
import TopNav from '@/components/TopNav.vue'
import Footer from '@/components/Footer.vue'
import { useStore } from 'vuex'
import { ref } from 'vue'
export default {
  setup () {
    const store = useStore()
    const nowUser = store.state.$nowUser
    const avatarImage = ref(nowUser.image)
    const avatarText = ref(nowUser.username)

    return {
      nowUser,
      avatarImage,
      avatarText
    }
  },
  components: {
    TopNav,
    Footer
  }
// 页面其他配置和方法
}
</script>
