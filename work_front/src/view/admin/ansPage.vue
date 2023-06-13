<template>
    <div class="scheduler">
      <h1 class="title">日程表</h1>
      <el-button-group>
        <el-button
          :class="{ active: view === 'day' }"
          @click="switchView('day')"
        >
          日视图
        </el-button>
        <el-button
          :class="{ active: view === 'week' }"
          @click="switchView('week')"
        >
          周视图
        </el-button>
      </el-button-group>

      <!-- 分组选择 -->
      <el-form>
        <el-form-item label="分组方式">
          <el-select v-model="selectedGroup" placeholder="请选择分组方式">
            <el-option label="按岗位" value="position"></el-option>
            <el-option label="按员工" value="employee"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <!-- 日期选择 -->
      <div class="date-buttons">
        <el-button @click="previousPage" :disabled="currentPage === 1" icon="el-icon-arrow-left"></el-button>
        <el-button-group>
          <el-button
            v-for="date in displayedDates"
            :key="date"
            :class="{ active: selectedDate === date }"
            @click="selectDate(date)"
            style="border-right: none"
          >
            {{ date }}
          </el-button>
        </el-button-group>
        <el-button @click="nextPage" :disabled="currentPage === totalPages" icon="el-icon-arrow-right"></el-button>
      </div>

      <!-- 日程表 -->
      <table class="schedule-table">
    <thead>
      <tr>
        <th></th>
        <th v-for="date in displayedDates" :key="date">{{ date }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="time in timeOptions" :key="time">
        <th>{{ time }}</th>
        <td
          v-for="date in displayedDates"
          :key="date"
          @click="selectTimeSlot(date, time)"
          :class="{ active: isTimeSlotSelected(date, time) }"
        >{{ getWorkContent(date, time) }}</td> <!-- 修改这里 -->
      </tr>
    </tbody>
  </table>
    </div>
  </template>

<script>
function getRandomElement (array) {
  const randomIndex = Math.floor(Math.random() * array.length)
  return array[randomIndex]
}
export default {
  name: 'Scheduler',
  data () {
    return {
      selectedGroup: 'employee',
      scheduleData: [],
      dateOptions: [
        '2023-05-21',
        '2023-05-22',
        '2023-05-23',
        '2023-05-24',
        '2023-05-25'
      ], // Replace with your date options
      selectedDate: '', // Selected date
      timeOptions: [
        '08:00',
        '09:00',
        '10:00',
        '11:00',
        '12:00',
        '13:00',
        '14:00',
        '15:00'
      ], // Replace with your time options
      saber: [],
      selectedTimeSlots: [], // Array to store selected time slots
      emps: [],
      currentPage: 1, // 当前页码
      pageSize: 1 // 每页展示的日期按钮数量
    }
  },
  created () {
    const ans = JSON.parse(this.$route.query.day)
    this.emps = JSON.parse(this.$route.query.emp)
    console.log(ans)
    this.dateOptions = ans
    this.initScheduleData()
  },
  computed: {
    displayedDates () {
      const startIndex = (this.currentPage - 1) * this.pageSize
      const endIndex = startIndex + this.pageSize
      return this.dateOptions.slice(startIndex, endIndex)
    },
    totalPages () {
      return Math.ceil(this.dateOptions.length / this.pageSize)
    }
  },
  methods: {
    initScheduleData () {
    // 初始化二维数组与日程表单元格对应的工作内容
      for (let i = 0; i < this.dateOptions.length; i++) {
        const rowData = {}
        rowData.date = this.dateOptions[i] // 添加日期字段
        for (let j = 0; j < this.timeOptions.length; j++) {
          const time = this.timeOptions[j]
          rowData[time] = getRandomElement(this.emps) // 设置初始工作内容为空字符串
        }
        this.scheduleData.push(rowData)
      }
    },
    getWorkContent (date, time) {
      const rowData = this.scheduleData.find(row => row.date === date)
      if (rowData) {
        if (this.selectedGroup === 'position') {
          return rowData[time].employee_position
        } else {
          return rowData[time].employee_name
        }
      }
      return ''
    },
    switchView (date) {
      if (date === 'day') { this.pageSize = 1 } else { this.pageSize = 7 }
    },
    selectDate (date) {
      this.selectedDate = date
    },
    selectTimeSlot (date, time) {
      const slot = { date, time }
      const index = this.selectedTimeSlots.findIndex(
        (slot) => slot.date === date && slot.time === time
      )
      if (index === -1) {
        this.selectedTimeSlots.push(slot)
      } else {
        this.selectedTimeSlots.splice(index, 1)
      }
    },
    isTimeSlotSelected (date, time) {
      return this.selectedTimeSlots.some(
        (slot) => slot.date === date && slot.time === time
      )
    },
    previousPage () {
      if (this.currentPage > 1) {
        this.currentPage--
        this.selectedDate = '' // Reset selected date
      }
    },
    nextPage () {
      if (this.currentPage < this.totalPages) {
        this.currentPage++
        this.selectedDate = '' // Reset selected date
      }
    }
  }
}
</script>

  <style>
  .scheduler {
    padding: 20px;
  }

  .title {
    text-align: center;
    font-size: 24px;
    margin-bottom: 20px;
  }

  .date-buttons {
    margin-bottom: 20px;
  }

  .date-buttons .el-button {
    margin-right: 10px;
  }

  .schedule-table {
    width: 100%;
    border-collapse: collapse;
  }

  .schedule-table th,
  .schedule-table td {
    border: 1px solid #ccc;
    padding: 10px;
    text-align: center;
    cursor: pointer;
  }

  .schedule-table th {
    background-color: #f0f0f0;
  }

  .schedule-table td.active {
    background-color: #409eff;
    color: #fff;
  }
  </style>
