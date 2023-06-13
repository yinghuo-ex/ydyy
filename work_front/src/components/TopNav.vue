<template>
    <div class="avatar-text">
      <div class="avatar">
        <img :src="image" alt="Avatar" />
      </div>
      <div class="text">{{ text }}</div>
    </div>
  </template>

<script>
export default {
  props: {
    image: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    }
  }
}
</script>

  <style scoped>
  /* 组件样式 */
  .avatar-text {
    height: 65px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    background-color: #fdc2b7;
    margin-bottom: 10px;
    /* 其他样式设置 */
  }

  .avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 100px;
    /* 其他样式设置 */
  }

  .avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  </style>
