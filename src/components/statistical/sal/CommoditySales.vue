<template>
  <div class="UserInfo1">
    <el-row>
      时间段：
      <el-select v-model="value1" placeholder="请选择" @change="update">
        <el-option
            v-for="item in shortcuts"
            :key="item.value"
            :label="item.text"
            :value="item.value">
        </el-option>
      </el-select>
      <el-date-picker
          v-model="form.startTime"
          type="date"
          :editable="false"
          prefix-icon="el-icon-caret-bottom"
          value-format="yyyy-MM-dd"
          :clearable='false'>
      </el-date-picker>
      <span style="padding: 0 3px">--</span>
      <el-date-picker
          v-model="form.endTime"
          type="date"
          :editable="false"
          prefix-icon="el-icon-caret-bottom"
          value-format="yyyy-MM-dd"
          :clearable='false'>
      </el-date-picker>
      商品编码：
      <el-input style="width:10%" v-model="form.code" placeholder="请输入商品编码"></el-input>
      客户名称：
      <el-input style="width:10%" v-model="form.name" placeholder="请输入客户名称"></el-input>
      <el-button type="primary" icon="el-icon-search" @click="find">搜索</el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "SalesOrder",
  data() {
    return {
      form: {
        code: '',
        name: '',
        startTime:'',
        endTime:'',
        value1: []
      },
      shortcuts: [{
        text: '上周报表',
        value: (() => {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
          return [start, end]
        })(),
      }, {
        text: '前日报表',
        value: (() => {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 2)
          return [start, end]
        })(),
      },{
        text: '昨日报表',
        value: (() => {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 1)
          return [start, end]
        })(),
      },{
        text: '本月至今',
        value: (() => {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
          return [start, end]
        })(),
      }, {
        text: '最近三个月',
        value: (() => {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
          return [start, end]
        })(),
      },{
        text: '当日报表',
        value: (() => {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 0)
          return [start, end]
        })(),
      }],
      value1: '',
    };
  },
  methods: {
    find() {
      if (new Date(this.form.startTime).getTime()>new Date(this.form.endTime).getTime()){
        this.$notify({
          title: '提示',
          message: '开始时间不能小于结束时间'
        });
      }
      console.log(this.form)
    },
    update(){
      this.form.startTime= this.value1[0];
      this.form.endTime= this.value1[1];
    }
  }
}
</script>
<style scoped>
</style>