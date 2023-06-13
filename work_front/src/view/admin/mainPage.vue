<template>
    <el-container style="height: 600px; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu :default-openeds="['1', '3']">
      <el-submenu index="1">
        <template v-slot:title><i class="el-icon-message"></i>导航一</template>
          <el-menu-item index="1-1"><router-link :to="
          {
            path:'showStudent',
            query: { name: this.userId}
          }">员工信息</router-link></el-menu-item>
          <el-menu-item index="1-2"><router-link :to="
          {
            path:'showArrange',
            query: { name: this.userId}
          }"> 生成排班</router-link></el-menu-item>
          <el-menu-item index="1-3"><router-link :to="
          {
            path:'showStore',
            query: { name: this.userId}
          }">店铺信息</router-link></el-menu-item>
      </el-submenu>
    </el-menu>
  </el-aside>
    <el-container>
         <el-header style="text-align: right; font-size: 12px">
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>

          <el-dropdown>
  <span class="el-dropdown-link">下拉菜单<i class="el-icon-arrow-down el-icon--right"></i></span>
  <template v-slot:dropdown>
    <el-dropdown-menu>
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
        </el-dropdown-menu>
  </template>
</el-dropdown>

        </el-dropdown>
        <span>{{ $route.query.name}}</span>
      </el-header>

    <el-main>
      <!-- 子路由视图，显示后台业务数据 -->
      <router-view/>
    </el-main>
    </el-container>
    </el-container>
</template>

<script>
export default {
  created () {
    this.userId = this.$route.query.name
  },
  data () {
    return {
      userId: ''
    }
  }
}
</script>

<style>
 .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  .el-aside {
    background-color: #D3DCE6;
    color: #D3DCE6;
    text-align: center;
    line-height: 200px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
