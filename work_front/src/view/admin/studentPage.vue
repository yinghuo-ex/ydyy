<template>
  <div>
    <el-table :data="students" stripe style="width: 100%">
      <el-table-column prop="employee_id" label="员工ID" width="180"></el-table-column>
      <el-table-column prop="employee_name" label="员工姓名" width="180"></el-table-column>
      <el-table-column prop="employee_email" label="员工邮箱"></el-table-column>
      <el-table-column prop="employee_position" label="员工职位"></el-table-column>
      <el-table-column label="操作">
        <template v-slot="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
            <el-button size="mini" @click="searchPreference(scope.$index, scope.row)">偏好</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
      </el-table-column>
    </el-table>
    <!-- Form -->
    <el-dialog title="修改员工信息" v-model="dialogFormVisible">
      <el-form :model="student">
        <el-form-item label="ID" :label-width="formLabelWidth">
          <el-input v-model="student1.employee_id" autocomplete="off" :value=this.student1.employee_id  ></el-input>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="student1.employee_name" autocomplete="off" :value=this.student1.employee_name ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="student1.employee_email" autocomplete="off" :value=this.student1.employee_email ></el-input>
        </el-form-item>
        <el-form-item label="职位" :label-width="formLabelWidth">
          <el-input v-model="student1.employee_position" autocomplete="off" :value=this.student1.employee_position></el-input>
        </el-form-item>
        <el-form-item label="所属" :label-width="formLabelWidth">
          <el-input v-model="student1.store_id" autocomplete="off" :value=this.student1.store_id></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateStudent()">确 定</el-button>
        </div>
      </template>
    </el-dialog>
    <!-- Form -->
    <el-dialog title="员工偏好" v-model="dialogFormVisible2">
      <el-table :data="pres" :key="tableKey" stripe style="width: 100%">
        <el-table-column prop="preference_type" label="类型" width="120"></el-table-column>
        <el-table-column prop="preference_value" label="内容" width="260"></el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
              <el-button size="mini" @click="handleEdit1(scope.$index, scope.row)">修改</el-button>
              <el-button size="mini" type="danger" @click="handleDeleteEmployeePreference(scope.$index, scope.row)">删除</el-button>
            </template>
        </el-table-column>
      </el-table>
      <el-button type="primary" @click="addPreference()">添加员工偏好</el-button>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="updatePreference()">确 定</el-button>
        </div>
      </template>
    </el-dialog>
    <el-dialog title="修改员工偏好" v-model="dialogFormVisible3">
      <el-form :model="student">
        <el-form-item label="类型" :label-width="formLabelWidth">
          <el-input v-model="empPre.preference_type" autocomplete="off" :value=this.empPre.preference_type  ></el-input>
        </el-form-item>
        <el-form-item label="内容" :label-width="formLabelWidth">
          <el-input v-model="empPre.preference_value" autocomplete="off" :value=this.empPre.preference_value ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible3 = false ">取 消</el-button>
          <el-button type="primary" @click="updateEmployeePreference()">确 定</el-button>
        </div>
      </template>
    </el-dialog>
    <!-- Form -->
    <el-button type="primary" @click="addView()">添加员工</el-button>
    <el-dialog title="添加员工" v-model="dialogFormVisible1">
      <el-form :model="student1">
        <el-form-item label="ID" :label-width="formLabelWidth">
          <el-input v-model="student1.employee_id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="student1.employee_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="student1.employee_email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="职位" :label-width="formLabelWidth">
          <el-input v-model="student1.employee_position" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="addStudent()">确 定</el-button>
      </template>
    </el-dialog>
    <!-- Form -->
    <el-dialog title="添加员工偏好" v-model="dialogFormVisible4">
      <el-form :model="student1">
        <el-form-item label="内容" :label-width="formLabelWidth">
          <el-input v-model="empPre.preference_value" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="addEmployeePreference()">确 定</el-button>
      </template>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      dialogFormVisible: false,
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      dialogFormVisible3: false,
      dialogFormVisible4: false,
      formLabelWidth: '120px',
      student: {
        employee_id: '',
        employee_name: '',
        employee_email: '',
        employee_position: '',
        store_id: ''
      },
      student1: {
        employee_id: '',
        employee_name: '',
        employee_email: '',
        employee_position: '',
        store_id: ''
      },
      empPre: {
        preference_type: '',
        employee_id: '',
        preference_value: ''
      },
      students: [],
      pres: [],
      iniPres: [],
      userId: '',
      tableKey: 0,
      employeeId: ''
    }
  },
  // 页面加载时触发
  created () {
    this.userId = this.$route.query.name
    // 替换students
    // get请求，url是studentList
    this.$axios
      .get('EmployeeList', {})
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
    this.$axios
      .get('EmployeePreferenceList', {})
    // 写成功
      .then((response) => {
      // 打印到控制台
        console.log(response)
        // 是否是200
        if (response.data.statusCode === 200) {
        // 接受数据
          this.iniPres = response.data.data
        /* this.pres = this.pres.filter((preference) => {
            return preference.employee_id === row.employee_id
          }) */
        }
      })
      .catch((error) => {
        alert(error)
      })
  },
  methods: {
  // 修改
    updateStudent: function () {
    // 发出修改请求
      this.$axios
        .put('updateEmployee', {
          employee_id: this.student1.employee_id,
          employee_name: this.student1.employee_name,
          employee_email: this.student1.employee_email,
          employee_position: this.student1.employee_position,
          store_id: this.student1.store_id
        })
        .then((response) => {
          if (response.data.statusCode === 200) {
          // 更新前端页面
            for (let i = 0; i < this.students.length; i++) {
              if (this.students[i].employee_id === this.student1.employee_id) {
                this.students[i].employee_name = this.student1.employee_name
                this.students[i].employee_email = this.student1.employee_email
                this.students[i].employee_position = this.student1.employee_position
                this.students[i].store_id = this.student1.store_id
              }
            }
            this.dialogFormVisible = false
          }
        })
        .catch((error) => {
          this.$message(error)
        })
    },
    updatePreference: function () {
    // 发出修改请求
    // this.pres = []
      this.dialogFormVisible2 = false
    },
    updateEmployeePreference: function () {
    // 发出修改请求
      this.$axios
        .put('updateEmployeePreference', {
          preference_type: this.empPre.preference_type,
          preference_value: this.empPre.preference_value,
          employee_id: this.empPre.employee_id
        })
        .then((response) => {
          if (response.data.statusCode === 200) {
          // 更新前端页面
            for (let i = 0; i < this.pres.length; i++) {
              if (this.pres[i].employee_id === this.empPre.employee_id) {
                this.pres[i].preference_value = this.empPre.preference_value
                this.pres[i].preference_type = this.empPre.preference_type
              }
            }
            for (let i = 0; i < this.iniPres.length; i++) {
              if (this.pres[i].employee_id === this.empPre.employee_id) {
                this.iniPres[i].preference_value = this.empPre.preference_value
                this.iniPres[i].preference_type = this.empPre.preference_type
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
      this.student1.employee_id = ''
      this.student1.employee_name = ''
      this.student1.employee_email = ''
      this.student1.employee_position = ''
      this.student1.store_id = this.userId
      // 显示对话框
      this.dialogFormVisible1 = true
    },
    addPreference: function () {
      this.empPre.employee_id = this.employeeId
      this.empPre.preference_type = ''
      this.empPre.preference_value = ''
      // 显示对话框
      this.dialogFormVisible4 = true
    },
    handleEdit (index, row) {
    // console.log(index,row);
    // console.log(row.id);
    // 给弹出框绑定的对象填值
      this.student1.employee_id = row.employee_id
      this.student1.employee_name = row.employee_name
      this.student1.employee_email = row.employee_email
      this.student1.employee_position = row.employee_position
      this.student1.store_id = row.store_id
      // 显示对话框
      this.dialogFormVisible = true
    },
    handleEdit1 (index, row) {
    // console.log(index,row);
    // console.log(row.id);
      this.dialogFormVisible2 = false
      this.empPre.employee_id = row.employee_id
      this.empPre.preference_type = row.preference_type
      this.empPre.preference_value = row.preference_value
      // 显示对话框
      this.dialogFormVisible3 = true
    },
    searchPreference (index, row) {
    // console.log(index,row);
    // console.log(row.id);
    // 给弹出框绑定的对象填值
    // row.employee_id
    // 显示对话框
      this.employeeId = row.employee_id
      this.pres = this.iniPres.filter((preference) => {
        return preference.employee_id === this.employeeId
      })
      this.tableKey += 1
      this.dialogFormVisible2 = true // 请求完成后，设置dialogFormVisible2为false，确保对话框隐藏
    },
    // 删除
    handleDelete (index, row) {
      this.$axios
        .get('deleteEmployee?employee_id=' + row.employee_id)
        .then((response) => {
          console.log(response)
          if (response.data.statusCode === 200) {
            this.students = this.students.filter((student) => {
              return student.employee_id !== row.employee_id
            })
          }
        })
        .catch((error) => {
          alert(error)
        })
    },
    handleDeleteEmployeePreference (index, row) {
      this.$axios
        .get('deleteEmployeePreference?employee_id=' + row.employee_id + '&preference_type=' + row.preference_type)
        .then((response) => {
          console.log(response)
          if (response.data.statusCode === 200) {
            this.pres = this.pres.filter((student) => {
              return student.employee_id !== row.employee_id
            })
            this.iniPres = this.iniPres.filter((student) => {
              return student.employee_id !== row.employee_id
            })
          }
        })
        .catch((error) => {
          alert(error)
        })
    },
    // 添加学生
    addStudent () {
      this.$axios
        .post('addEmployee', {
          employee_id: this.student1.employee_id,
          employee_name: this.student1.employee_name,
          employee_email: this.student1.employee_email,
          employee_position: this.student1.employee_position,
          store_id: this.student1.store_id
        })
        .then((response) => {
          if (response.data.statusCode === 200) {
            this.$message('add successful')
            const stu = response.data.data
            this.students.push({
              employee_id: stu.employee_id,
              employee_name: stu.employee_name,
              employee_email: stu.employee_email,
              employee_position: stu.employee_position,
              store_id: stu.store_id
            })
            // this.students.push(this.student1);
            this.dialogFormVisible1 = false
          }
        })
        .catch((error) => {
          this.$message(error)
        })
    },
    addEmployeePreference () {
      this.$axios
        .post('addEmployeePreference', {
          employee_id: this.empPre.employee_id,
          preference_type: this.empPre.preference_type,
          preference_value: this.empPre.preference_value
        })
        .then((response) => {
          if (response.data.statusCode === 200) {
            this.$message('add successful')
            const stu = response.data.data
            this.iniPres.push({
              employee_id: stu.employee_id,
              preference_type: stu.preference_type,
              preference_value: stu.preference_value
            })
            this.pres.push({
              employee_id: stu.employee_id,
              preference_type: stu.preference_type,
              preference_value: stu.preference_value
            })
            // this.students.push(this.student1);
            this.dialogFormVisible4 = false
          }
        })
        .catch((error) => {
          this.$message(error)
        })
    }
  }
}
</script>
