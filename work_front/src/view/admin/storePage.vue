<template>
    <!-- 视图显示部分-->
        <div>
            <h2>店铺信息</h2>
            <div id="inputStyle" class="inputClass">
                <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="用户名" prop="uname">
                        <el-input type="text" v-model="store1.store_name" auto-complete="off" :value=this.store1.store_name ></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="pass">
                        <el-input type="password" v-model="store1.store_password" auto-complete="off" :value=this.store1.store_password></el-input>
                    </el-form-item>
                    <el-form-item label="地址" prop="pos">
                        <el-input  type="text" v-model.number="store1.store_address"  auto-complete="off" :value=this.store1.store_address></el-input>
                    </el-form-item>
                    <el-form-item label="大小" prop="size">
                        <el-input type="number" v-model.number="store1.store_size" :value=this.store1.store_size></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="updateStore()">修改</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </template>

<script>
// 编写js行为
export default {
  name: 'LoginView',
  data () {
    return {
      store1: {
        store_id: '',
        store_name: '',
        store_password: '',
        store_address: '',
        store_size: 0
      }
    }
  },
  created () {
    this.store1.store_id = this.$route.query.name
    this.$axios
      .get('StoreList', {})
    // 写成功
      .then((response) => {
        // 打印到控制台
        console.log(response)
        // 是否是200
        if (response.data.statusCode === 200) {
          // 接受数据
          for (let i = 0; i < response.data.data.length; i++) {
            if (response.data.data[i].store_id === this.store1.store_id) {
              this.store1 = response.data.data[i]
            }
          }
        }
      })
      .catch((error) => {
        alert(error)
      })
  },
  methods: {
    updateStore () {
      this.$axios
        .put('updateStore', {
          store_id: this.store1.store_id,
          store_name: this.store1.store_name,
          store_password: this.store1.store_password,
          store_address: this.store1.store_address,
          store_size: this.store1.store_size + 0.0
        })
        .catch((error) => {
          this.$message(error)
        })
    }
  }
}
</script>
    <style scoped>
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
