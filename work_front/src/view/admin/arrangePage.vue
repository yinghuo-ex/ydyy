<template>
  <div>
    <el-table :data="students" stripe style="width: 100%">
      <el-table-column prop="rule_type" label="类型" width="330"></el-table-column>
      <el-table-column prop="rule_value" label="内容" width="420"></el-table-column>
      <el-table-column label="操作">
        <template v-slot="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
            <el-button size="mini" rule_type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            <el-select v-model="scope.row.isUsed" placeholder="状态" style="width: 80px">
              <el-option label="启用" :value="'启用'"></el-option>
              <el-option label="不启用" :value="'不启用'"></el-option>
            </el-select>
          </template>
      </el-table-column>
    </el-table>
    <!-- Form -->
    <el-dialog title="修改规则" v-model="dialogFormVisible">
      <el-form :model="student">
        <el-form-item label="内容" :label-width="formLabelWidth">
          <el-input v-model="student1.rule_value" autocomplete="off" :value=this.student1.rule_value ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button rule_type="primary" @click="updateStudent()">确 定</el-button>
        </div>
      </template>
    </el-dialog>
    <!-- Form -->
    <el-button rule_type="primary" @click="addView()">添加规则</el-button>
    <el-dialog title="添加规则" v-model="dialogFormVisible1">
      <el-form :model="student1">
        <el-form-item label="类型" :label-width="formLabelWidth">
          <el-select v-model="student1.rule_type" placeholder='请选择类型'>
            <el-option label="起始时间" value="openTime"></el-option>
            <el-option label="结束时间" value="endTime"></el-option>
            <el-option label="倾向职业" value="preferenceClass"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="内容" :label-width="formLabelWidth">
          <el-input v-model="student1.rule_value" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button rule_type="primary" @click="addStudent()">确 定</el-button>
      </template>
    </el-dialog>
    <!-- Form -->
    <el-button rule_type="primary" @click="createAns()">生成排班表</el-button>
  </div>
</template>
<script>
export default {
  data () {
    return {
      dialogFormVisible: false,
      dialogFormVisible1: false,
      formLabelWidth: '120px',
      student: {
        store_id: '',
        rule_type: '',
        rule_value: ''
      },
      student1: {
        store_id: '',
        rule_type: '',
        rule_value: ''
      },
      store1: {
        store_id: '',
        store_name: '',
        store_password: '',
        store_address: '',
        store_size: 0
      },
      students: [],
      emps: [],
      prefs: [],
      userId: ''
    }
  },
  // 页面加载时触发
  created () {
    this.userId = this.$route.query.name
    this.student1.store_id = this.userId
    this.store1.store_id = this.$route.query.name
    this.$axios // 获得工人
      .get('EmployeeList', {})
    // 写成功
      .then((response) => {
      // 打印到控制台
        console.log(response)
        // 是否是200
        if (response.data.statusCode === 200) {
        // 接受数据
          this.emps = response.data.data
          this.emps = this.emps.filter((student) => {
            return student.store_id === this.userId
          })
        }
      })
      .catch((error) => {
        alert(error)
      })
    this.$axios // 获得工人
      .get('EmployeePreferenceList', {})
    // 写成功
      .then((response) => {
      // 打印到控制台
        console.log(response)
        // 是否是200
        if (response.data.statusCode === 200) {
        // 接受数据
          this.prefs = response.data.data
        }
      })
      .catch((error) => {
        alert(error)
      })
    this.$axios // 获得店铺
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
    // 替换students
    // get请求，url是studentList
    this.$axios
      .get('ScheduleRuleList', {})
    // 写成功
      .then((response) => {
      // 打印到控制台
        console.log(response)
        // 是否是200
        if (response.data.statusCode === 200) {
        // 接受数据
          this.students = response.data.data
          this.students = this.students.filter((student) => {
            return student.store_id === this.userId
          })
        }
      })
      .catch((error) => {
        alert(error)
      })
    this.students.forEach((student) => {
      student.isUsed = '启用' // 默认值为 true，可以根据实际需求修改
    })
  },
  methods: {
  // 修改
    updateStudent: function () {
      alert(this.student1.rule_type)
      // 发出修改请求
      this.$axios
        .put('updateScheduleRule', {
          store_id: this.student1.store_id,
          rule_value: this.student1.rule_value,
          rule_type: this.student1.rule_type
        })
        .then((response) => {
          if (response.data.statusCode === 200) {
          // 更新前端页面
            for (let i = 0; i < this.students.length; i++) {
              if (this.students[i].rule_type === this.student1.rule_type) {
                this.students[i].rule_value = this.student1.rule_value
              }
            }
            this.dialogFormVisible = false
          }
        })
        .catch((error) => {
          this.$message(error)
        })
    },
    addView: function () {
    // 重置对象数据
      this.student1.rule_type = ''
      this.student1.rule_value = ''
      // 显示对话框
      this.dialogFormVisible1 = true
    },
    handleEdit (index, row) {
    // console.log(index,row);
    // console.log(row.id);
    // 给弹出框绑定的对象填值
      this.student1.rule_type = row.rule_type
      this.student1.rule_value = row.rule_value
      // 显示对话框
      this.dialogFormVisible = true
    },
    // 删除
    handleDelete (index, row) {
      this.$axios
        .get('deleteScheduleRule?store_id=' + row.store_id + '&rule_type=' + row.rule_type)
        .then((response) => {
          console.log(response)
          if (response.data.statusCode === 200) {
            this.students = this.students.filter((student) => {
              return student.rule_type !== row.rule_type
            })
          }
        })
        .catch((error) => {
          alert(error)
        })
    },
    handleStatusChange (index, row) {
      if (row.status === '启用') {
        this.students[index].isUsed = true
      } else if (row.status === '不启用') {
        this.students[index].isUsed = false
      }
    },
    // 添加学生
    addStudent () {
      this.$axios
        .post('addScheduleRule', {
          store_id: this.student1.store_id,
          rule_value: this.student1.rule_value,
          rule_type: this.student1.rule_type
        })
        .then((response) => {
          if (response.data.statusCode === 200) {
            this.$message('add successful')
            const stu = response.data.data
            this.students.push({
              store_id: stu.store_id,
              rule_value: stu.rule_value,
              rule_type: stu.rule_type
            })
            this.dialogFormVisible1 = false
          }
        })
        .catch((error) => {
          this.$message(error)
        })
    },
    createAns () {
      let currentDate = new Date()
      let endDate = new Date()
      endDate.setMonth(endDate.getMonth() + 1)
      for (const key in this.students) { // 处理两端时间
        const it = this.students[key]
        if (it.rule_type === 'openTime') {
          currentDate = it.rule_value
        } else if (it.rule_type === 'endTime') {
          endDate = it.rule_value
        }
      }
      let d1 = new Date(currentDate)
      const d2 = new Date(endDate)
      if (d1 > d2) { // 失败情况
        alert('时间异常 无法生成')
        return
      }
      const ans = [] // 生成答案
      // let id = 0
      while (d1 <= d2) { // 遍历
        const year = d1.getFullYear()
        const month = String(d1.getMonth() + 1).padStart(2, '0')
        const day = String(d1.getDate()).padStart(2, '0')
        const formattedDate = `${year}-${month}-${day}`
        ans.push(formattedDate)
        /* id++
        const dayOfWeek = d1.getDate
        let need = 1
        const it = { // 建立空对象
          name: '',
          skill: ''
        }
        // 核心处理部分
        for (const element in this.emps) {
          if (element.isUsed === true) {
            continue
          }
          for (const pref in this.prefs) {
            if (pref.employee_id === element.employee_id) {
              if (pref.preferenct_type === 'date' && parseInt(pref.preferenct_value) === dayOfWeek % 7) {
                it.name = element.employee_name
                it.skill = element.employee_position
                break
              }
            }
          }
          if (it.name !== '') {
            ans[id].push(it)
            it.name = ''
            continue
          }
        }
        if (dayOfWeek === 0 || dayOfWeek === 6) { // 周末跳过九点
          need = 0
          it.name = '休息'
          it.skill = '休息'
          ans[id].push(it)
        }
        if (need === 1) { // 日常跳过二十二点
          it.name = '休息'
          it.skill = '休息'
          ans[id].push(it)
        } */
        d1.setDate(d1.getDate() + 1)
      }
      console.log(ans)
      this.$router.push({
        path: '/showAns',
        query: {
          day: JSON.stringify(ans),
          emp: JSON.stringify(this.emps)
        }
      })
    }
  }
}
</script>
