<template>
  <div class="navigation-bar">
    <button v-for="button in buttons" :key="button.id" :class="{ 'disabled-button': button.id === currentId }" @click="handleButtonClick(button.id)">
      {{ button.label }}
    </button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      buttons: [
        { id: 1, label: '作品管理' },
        { id: 2, label: '图书馆' },
        { id: 3, label: '个人空间' }
      ],
      currentId: 1
    }
  },
  methods: {
    handleButtonClick (buttonId) {
      let to = ''
      if (buttonId === 1) to = '/article'
      if (buttonId === 2) to = '/all'
      if (buttonId === 3) to = '/set'
      this.$router.push(to)

      this.currentId = buttonId
    }
  }
}
</script>

<style>
.navigation-bar {
  height: 65px;
  display: flex;
  justify-content: center;
  background-color: #fdc2b7;
}

button {
  margin: 0 20px;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  background-color: #ff6b6b;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
}

button.disabled-button {
  background-color: #fcb3b3;
  cursor: not-allowed;
}

button:hover {
  background-color: #ff8f8f;
}

button:active {
  background-color: #ff4f4f;
}
</style>
