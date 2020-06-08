<template>
  <div class="teaching-process-wrapper">
    <el-row class="yd-router-title yd-bg">
      <el-col :span="4">
        <div class="title-icon icon-skin"><i class="yd icon-major2"></i></div>
        <h3>教学进程表</h3>
      </el-col>
    </el-row>
    <el-container :element-loading-text="loadingText" class="content-detail-box"
                  element-loading-spinner="el-icon-loading"
                  v-loading="loadingData">
      <el-main class="left-detail-timetable">
        <div class="title">
          请选择学期:
          <el-select @change="getData" placeholder="请选择学期" v-model="schoolCalendarId">
            <el-option :key="item.value" :label="item.xqmc" :value="item.xlid"
                       v-for="item in schoolCalendarList"></el-option>
          </el-select>
        </div>
        <div class="table-box-wrapper">
          <div :style="{width: 303 + totalWeek*40 + 'px'}" class="table-box" v-if="!loadingData">
            <h3 class="table-head bg-skin">教学进程表</h3>
            <el-table :data="tableData" :span-method="objectSpanMethod" @cell-click="tableTdCell"
                      cell-class-name="td-class-info"
                      header-row-class-name="head-info"
                      row-class-name="tr-class-info">
              <el-table-column align="center" label="专业" width="120">
                <template slot-scope="scope">
                  {{scope.row[0].shortName}}
                </template>
              </el-table-column>
              <el-table-column label="班级" prop="1" width="180">
                <template slot-scope="scope">
                  {{scope.row[1].shortName}}
                </template>
              </el-table-column>
              <!-- {tabNum: 1, month: '', start_time: '', end_time: '', week_list: []}-->
              <el-table-column :key="'data'+index" :label="headData.month + '月'" align="center"
                               class="week-list-head"
                               v-for="(headData , index) in headDataList">
                <el-table-column :key="'week'+weekIndex" align="center"
                                 v-for="(week,weekIndex) in headData.week_list"
                                 width="40">
                  <template slot="header">
                    <el-tooltip :content="week.start_time +' ~ '+ week.end_time" class="item"
                                effect="dark" placement="top">
                      <span>{{week.name}}</span>
                    </el-tooltip>
                  </template>

                  <template slot-scope="scope">
                    <div :dataIndex="week.name+1" class="td-content">
                      <div
                        :class="['week-box', scope.row[week.name+1].assignType == 1 ? 'ALL' : 'HALF']"
                        :style="{backgroundColor:scope.row[week.name+1].color}"
                        v-if="scope.row[week.name+1].state == 1">
                                                <span class="course-message">
                                                    {{scope.row[week.name+1].shortName}}
                                                    <span class="t-icon"
                                                          v-if="scope.row[week.name+1].haveTeacher == 'YES'"></span>
                                                </span>
                      </div>
                    </div>
                  </template>
                </el-table-column>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </el-main>
      <el-aside class="right-detail-operation" width="285px">
        <div class="operation-title">
          <span class="title-text">连续周</span>
          <span class="title-btn">
              <el-tag @click="importDialogVisible = true" class="min-tag" type="success">导入</el-tag>
              <el-tag @click="addTagDialogVisible = true" class="min-tag" type="info">添加</el-tag>
          </span>
        </div>
        <ul class="tag-list">
          <li :key="index" @click="selectCourseTagItem(index,tag)"
              class="tag-item el-row" v-for="(tag,index) in tagList">
            <div class="detail-info">
              <span :class="{'active' : weekActive == index}" class="bg-skin"></span>
              <span class="el-col-2">
                                <label :style="'background-color:' + tag.color" class="icon">{{tag.shortName}}</label>
                            </span>
              <span class="name el-col-11 el-col-offset-3">{{tag.trainingName}}</span>
              <span class="operation el-col-6  el-col-offset-2">
                                <i @click.stop="updTraining(tag)" class="yd icon-edit edit"></i>
                                <i @click.stop="delTraining(tag.id,tag.shortName,index)"
                                   class="el-icon-close close"></i>
                            </span>
            </div>
          </li>
        </ul>
        <div class="operation-title">
          <span class="title-text">循环周</span>
        </div>
        <ul class="week-list">
          <li class="week-item" v-for="(week,index) in weekList" :key="index">
            {{week.zsap | weekDealWith}}周：{{week.pkjhmc}}
          </li>
        </ul>

        <ul class="tips-list">
          <li class="tip-item">
            <span class="icon all"></span>表示完整的周 这周都上此课程
          </li>
          <li class="tip-item">
            <span class="icon half"></span>表示这周有专业课跟公共课
          </li>
          <li class="tip-item">
            <span class="icon true"></span>表示已选教师跟教室
          </li>
          <li class="tip-item">
            操作：<span class="text">右侧选中连续周,点击左侧教学进程表</span>
          </li>
        </ul>
      </el-aside>
    </el-container>

    <el-dialog :before-close="initTagForm" :visible.sync="addTagDialogVisible" custom-class="add-tag-dialog"
               width="630px">
      <el-form :inline="true" :model="tagForm" :rules="rules" class="demo-form-inline" label-position="right"
               label-width="100px" ref="addTagDialogForm">
        <div class="el-row">
          <el-form-item label="名称:" prop="trainingName">
            <el-input class="input-self" placeholder="名称" v-model="tagForm.trainingName"></el-input>
          </el-form-item>
          <el-form-item class="short-name-item" label="简称:" prop="shortName">
            <el-input class="input-self" placeholder="简称" v-model="tagForm.shortName"></el-input>
          </el-form-item>
        </div>
        <div class="form-item-color">
          <el-form-item label="选择色块:" prop="color">
            <div class="tag-list-box">
              <el-radio-group class="tag-item-box" size="mini" v-model="tagForm.color">
                <el-radio :key="index" :label="tagColor" class="radio-color"
                          v-for="(tagColor,index) in tagColorList">
                                <span :style="{backgroundColor: tagColor}" class="tag-item">
                                  <span :class="{'active':tagColor == tagForm.color}"></span>
                                </span>
                </el-radio>
              </el-radio-group>
            </div>
          </el-form-item>
        </div>
        <el-form-item label="占用课时:" prop="hourType">
          <el-select class="input-self-190" placeholder="全部" v-model="tagForm.hourType">
            <el-option :value="1" label="全部"></el-option>
            <el-option :value="0" label="剩余"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="short-name-item" label="课时数:">
          <el-input-number :min="1" class="input-self-190" input-self
                           v-model="tagForm.hour"></el-input-number>
        </el-form-item>
        <el-form-item label=" ">
          <el-button @click="operationTraining" type="primary">确 定</el-button>
          <el-button @click="initTagForm">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog :visible.sync="importDialogVisible" custom-class="import-tag-dialog" width="420px">
      <ul class="import-list">
        <el-radio-group v-model="importIds">
          <li :key="index" class="import-item" v-for="(importItem,index) in importDataList">
            <el-radio :label="importItem.xlid">{{importItem.xqmc}}</el-radio>
          </li>
        </el-radio-group>
      </ul>
      <span class="dialog-footer" slot="footer">
                <el-button @click="importTags" type="primary">确 定</el-button>
                <el-button @click="importDialogVisible = false">取 消</el-button>
            </span>
    </el-dialog>

    <el-dialog :visible.sync="courseInfoDialogVisible" custom-class="add-allocation-dialog" destroy-on-close
               width="650px">
      <el-form :inline="true" :model="courseInfoForm" class="demo-form-inline" label-position="right"
               label-width="80px" ref="dynamicValidateForm">
        <el-form-item label="占用课时:" prop="region">
          <el-select class="input-self-300" placeholder="占用课时" v-model="courseInfoForm.assignType">
            <el-option :value="1" label="全部"></el-option>
            <el-option :value="0" label="剩余"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="short-item-60" label="课时数:">
          <el-input-number :min="1" class="input-self-124" input-self
                           v-model="courseInfoForm.courseHour"></el-input-number>
        </el-form-item>
        <div :key="index" class="dynamic-column" v-for="(item,index) in courseInfoForm.processHourAssignList">
          <el-form-item label="教师:">
            <el-select class="input-self-300" placeholder="教师" v-model="item.teacherId">
              <el-option :key="index" :label="teacherInfo.xm"
                         :value="teacherInfo.jsid"
                         v-for="(teacherInfo,index) in teacherInfoList"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="short-item-60" label="课时数:">
            <el-input-number :max="courseInfoForm.courseHour" :min="1" class="input-self-124" input-self
                             v-model="item.classHour"></el-input-number>
          </el-form-item>
          <span @click="editCourseInfoFormItem" class="add-icon el-icon-circle-plus-outline"
                v-if="index == courseInfoForm.processHourAssignList.length - 1 && showAddBtn"></span>
        </div>
        <el-form-item class="long-site" label="教室:">
          <el-select class="select-site" placeholder="占用教室" v-model="courseInfoForm.roomId">
            <el-option :key="index" :label="classRoom.jsmc" :value="classRoom.jsh"
                       v-for="(classRoom,index) in classRoomList"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label=" ">
          <el-button @click="submitProcessData" type="primary">确 定</el-button>
          <el-button @click="deleteProcessData">删 除</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

  </div>
</template>

<script>
  //11(课程简称)_NO(NO:没有教师,YES:带教师)_ALL(全角,HALF:半角)
  export default {
    name: 'teaching_process',
    data() {
      return {
        tagForm: {
          calendarId: '',
          trainingName: '',
          shortName: '',
          color: '',
          hourType: '',
          hour: 1
        },
        rules: {
          trainingName: [
            {required: true, message: '请填写标签名', trigger: 'blur'}
          ],
          shortName: [
            {required: true, message: '请填写简称', trigger: 'blur'},
            {min: 1, max: 1, message: '长度为一个字符'},
            {pattern: /[^%&',;=?$_\x22]+/, message: '不能含有特殊字符'}
          ],
          color: [
            {required: true, message: '请选择颜色', trigger: 'change'}
          ],
          hourType: [
            {required: true, message: '请至少选择一个类型', trigger: 'change'}
          ]
        },
        //右边选中课程
        weekActive: -1,
        //进程表数据加载
        loadingData: true,
        loadingText: '加载中...',
        schoolCalendarList: [],
        //专业列表
        majorInfoList: [],
        //教师数据列表
        teacherInfoList: [],
        //教室列表
        classRoomList: [],
        addTagDialogVisible: false,
        importDialogVisible: false,
        courseInfoDialogVisible: false,
        teacherIdDialogVisible: false,
        //课时设置表单数据
        courseInfoForm: {},
        //导入的标签id
        importIds: [],
        tagColorList: [
          '#F8BDBD', '#FFE6CB', '#DFFFED', '#DCE8FF', '#FFC8FE', '#B9FFDD',
          '#F9F0A3', '#FFC8AD', '#9CFFF2', '#8FC4FF', '#B0E9C9', '#EBEBEB',
          '#FFFCD3', '#E7F0DB', '#FFE4E4', '#E8F4FF', '#D2FFD6', '#FFCEE0',
          '#EDFFE0', '#F0E0BC', '#D7DBFF', '#EEDFD8', '#F8EBD0', '#FFCBCB',
        ],
        tableData: [],
        rowSpanArray: [],
        tagList: [],
        weekList: [],
        teacherId: '',
        headDataList: [],
        schoolCalendarId: '',
        activeTags: null,
        operationType: 'add',
        totalWeek: 0,
      }
    },
    computed: {
      //显示加号
      showAddBtn() {
        if (this.courseInfoForm.processHourAssignList) {
          let haveHour = 0
          this.courseInfoForm.processHourAssignList.forEach(processHourAssign => {
            haveHour += processHourAssign.classHour
          })
          return this.courseInfoForm.courseHour > haveHour
        }
        return false
      },
      importDataList() {
        return this.schoolCalendarList.filter(item => {
          return item.xlid != this.schoolCalendarId
        })
      },
    },
    created() {
      this.getSchoolCalendarList()
      this.getMajorList()
      this.getTeacherList()
      this.getClassRoomList()
    },
    methods: {
      //导入标签 /teachingProcess/saveImport/{selectCalendarId}/{currentCalendarId}
      importTags() {
        this.$POST(`/teachingProcess/importTraining/${this.importIds}/${this.schoolCalendarId}`).then(res => {
          if (res.code == 200) {
            this.tagList = res.data
            this.importDialogVisible = false
          } else {
            this.$message.error(res.msg)
          }
        })
      },
      //选择标签
      selectCourseTagItem(index, tag) {
        this.weekActive = this.weekActive == index ? -1 : index
        this.activeTags = this.weekActive == index ? tag : null
      },
      //获取学期列表   /schoolCalendar/list
      getSchoolCalendarList() {
        this.loadingText = '加载学期列表'
        this.$GET('/schoolCalendar/list').then(res => {
          if (res.code == 200) {
            this.schoolCalendarList = res.data
            this.schoolCalendarId = (res.data[0] || {}).xlid
            this.getData()
          } else {
            this.$message.error(res.msg)
          }
        })
      },
      //编辑课程数据
      editCourseInfoFormItem() {
        this.courseInfoForm.processHourAssignList.push({
          classHour: 1,
          majorId: '',
          teacherId: ''
        })
      },
      //配置数据
      configurationData(rowIndexData) {
        rowIndexData.state = '1'
        rowIndexData.calendarId = this.schoolCalendarId
        rowIndexData.color = this.activeTags.color
        rowIndexData.courseHour = this.activeTags.hour
        rowIndexData.assignType = this.activeTags.hourType
        rowIndexData.shortName = this.activeTags.shortName
        rowIndexData.courseName = this.activeTags.trainingName
        rowIndexData.courseId = this.activeTags.id
        this.courseInfoForm = rowIndexData
        this.courseInfoDialogVisible = true
      },
      //教学进程单元格信息获取  /teachingProcess/teachingProcessInfo/{calendarId}/{week}/{classId}
      getTableCell(week, classId) {
        return this.$POST(`/teachingProcess/teachingProcessInfo/${this.schoolCalendarId}/${week}/${classId}`)
      },
      //点击表格添加课程
      tableTdCell(row, column, ele, event) {
        try {
          //取格子的是哪列数据   week
          let index = ele.querySelector('.td-content').getAttribute('dataIndex')
          //选中连续周
          if (this.activeTags) {
            this.getTableCell(row[index].week, row[index].classId).then(res => {
              //有数据
              if (res.success) {
                let tipsText = this.activeTags.id !== row[index].id ? '初始化' : '覆盖'
                this.$confirm(`此操作将${tipsText}已配置的连续周, 是否继续?`, '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  this.operationType = 'update'
                  this.configurationData(row[index])
                })
              }
              //格子中无数据
              else {
                this.operationType = 'add'
                this.configurationData(row[index])
              }
            })
          }
          //未选中连续周  修改操作
          else {
            this.getTableCell(row[index].week, row[index].classId).then(res => {
              let data = res.data
              //有数据
              if (res.success) {
                delete data.color
                Object.assign(row[index], data)
                this.courseInfoForm = row[index]
                this.courseInfoDialogVisible = true
                this.operationType = 'update'
              }
            })
          }
        } catch (e) {
          return false
        }

      },
      //删除教学进程
      deleteProcessData() {
        this.$confirm('此操作将删除该教学内容, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$POST(`/teachingProcess/delTeachingProcess/${this.schoolCalendarId}/${this.courseInfoForm.week}/${this.courseInfoForm.classId}`).then(res => {
            if (res.code == 200) {
              for (let key in this.courseInfoForm) {
                if (key != "week" && key != "classId") {
                  this.courseInfoForm[key] = "";
                }
              }
              this.courseInfoDialogVisible = false;
            } else {
              this.$message.error(res.message);
            }
          })
        })
      },
      //校验课程进程提交
      justProcessData() {
        let haveHour = 0
        this.courseInfoForm.processHourAssignList.forEach(processHourAssign => {
          haveHour += processHourAssign.classHour
        })
        return this.courseInfoForm.courseHour >= haveHour
      },

      // 提交进程数据   /teachingProcess/addTeachingProcess
      submitProcessData() {
        if (!this.justProcessData()) {
          this.$message.error('设置教师的课时大于总课时')
          return false
        }
        let url = this.operationType === 'add' ? '/teachingProcess/addTeachingProcessPojo' : '/teachingProcess/editTeachingProcess'
        this.$POST(url, this.courseInfoForm, {
          transformRequest: function (data) {
            return JSON.stringify(data)
          },
          headers: {'Content-Type': 'application/json'}
        }).then(res => {
          if (res.code == 200) {
            if (this.courseInfoForm.processHourAssignList[0].teacherId) {
              this.courseInfoForm.haveTeacher = 'YES'
            }
            this.initTeachingProcessForm()
          }
        })
      },
      initTagForm() {
        //初始化tagForm
        this.tagForm = {
          calendarId: '',
          trainingName: '',
          shortName: '',
          color: '',
          hourType: '',
          hour: 1
        }
        this.addTagDialogVisible = false
      },
      initTeachingProcessForm() {
        //初始化tagForm
        this.courseInfoForm = {}
        this.courseInfoDialogVisible = false
      },
      //连续周添加  标签添加  /teachingProcess/addTraining
      operationTraining() {
        this.$refs.addTagDialogForm.validate(valid => {
          if (valid) {
            //state [ true : 修改 , false: 编辑]
            let state = !!this.tagForm.id
            let url = state ? '/teachingProcess/editTraining' : '/teachingProcess/addTraining'
            this.tagForm.calendarId = this.schoolCalendarId
            this.$POST(url, this.tagForm).then(res => {
              if (res.code == 200) {
                if (!state) {
                  let newTag = Object.assign(res.data, this.tagForm)
                  this.tagList.unshift(newTag)
                }
                this.initTagForm()
              } else {
                this.$message.error(res.message)
              }
            })
          }
        })
      },
      //连续周删除  标签删除  /teachingProcess/delTraining/{trainingId}
      delTraining(id, tagName, index) {
        if (this.isHaveTags(tagName)) {
          this.$confirm('此操作将永久删除该连续周标签, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$POST('/teachingProcess/delTraining/' + id).then(res => {
              this.tagList.splice(index, 1)
              this.$message({type: 'success', message: '删除成功!'})
            })
          })
        } else {
          this.$message.error("有使用到该标签,无法删除");
        }
      },
      //连续周修改  标签修改  /teachingProcess/editTraining
      updTraining(tag) {
        this.addTagDialogVisible = true
        this.tagForm = tag
      },


      //排课进程列表
      getData() {
        if (this.schoolCalendarId) {
          this.loadingData = true
          this.loadingText = '加载排课进程数据'
          this.$GET('/teachingProcess/list/' + this.schoolCalendarId).then(res => {
            if (res.code == 200) {
              this.tagList = res.data.trainingList || []
              this.weekList = res.data.planList
              this.totalWeek = res.data.totalWeek
              this.dealwithHead(res.data.startDate, res.data.endDate, res.data.totalWeek)
              this.dealwithData(res.data.body)
              this.loadingData = false
            }
          })
        }
      },
      //组装表格头部
      dealwithHead: function (startDate, endDate, totalWeek) {
        let headData = []
        let allDate = this.getAll(startDate, endDate)
        let nowMonth = ''
        //最终时间
        let [eYe, eMe, eDe] = endDate.split('-')

        allDate.forEach((item, index) => {
          let nextData = allDate[index + 1]
          if (nextData) {
            let week = index + 1
            //小数据模板
            let minObj = {name: '', start_time: '', end_time: ''}
            if (nextData.split('-')[1] != nowMonth) {
              //大数据模板
              let obj = {month: '', week_list: []}
              //设置当前月
              nowMonth = Number(nextData.split('-')[1])
              //数据上填充当前月
              obj.month = nowMonth || Number(eMe)
              //将数据加到头上
              headData.push(obj)
            }
            //为week添加一个数据
            minObj.name = week
            //开始时间
            minObj.start_time = item
            //结束时间
            minObj.end_time = allDate.length - 1 === index ? endDate : allDate[week]
            headData[headData.length - 1].week_list.push(minObj)
          }
        })
        this.headDataList = headData
      },
      //处理表格数据
      dealwithData(dataBody) {
        let tableDataNew = []
        let rowSpanArray = []

        dataBody.forEach(item => {
          for (let key in item) {
            item[key] = JSON.parse(item[key])
            item[key].forEach((tableItem, index) => {
              tableItem.unshift(key)

              let resultObj = {}
              //获取班级ID
              let classCourse = Number(tableItem[1].substring(tableItem[1].lastIndexOf('_') + 1))
              tableItem.forEach((tableCell, index) => {
                //当前周
                let week = index - 1
                // state : 1 - 有数据  0 - 无数据
                let resultItemObj = {
                  state: 0,
                  //学期id
                  calendarId: 0,
                  //课时类型:1,全部 0,剩余
                  assignType: '',
                  //短称
                  shortName: '',
                  //颜色
                  color: '',
                  //班级id
                  classId: classCourse,
                  //班级名称
                  className: '',
                  //课时
                  courseHour: 0,
                  //课程安排
                  courseId: 1,
                  //课时名称
                  courseName: '',
                  //教室id
                  roomId: '',
                  //week
                  week: week,
                  //是否安排教师
                  haveTeacher: 'NO',
                  //教师列表
                  processHourAssignList: [{
                    classHour: '',
                    teacherId: ''
                  }]
                }

                if ((tableCell || "").indexOf('_') > -1) {
                  let cellArray = tableCell.split('_')
                  resultItemObj['state'] = 1
                  resultItemObj['shortName'] = cellArray[0]
                  resultItemObj['haveTeacher'] = cellArray[1]
                  resultItemObj['assignType'] = cellArray[2] == 'ALL' ? 1 : 0
                  resultItemObj['color'] = cellArray[3]

                } else {
                  resultItemObj['shortName'] = tableCell
                }

                //填写当前属性
                resultObj[index] = resultItemObj;
              })
              rowSpanArray.push(index === 0 ? item[key].length : 0)
              tableDataNew.push(resultObj)
            })
          }
        })
        this.rowSpanArray = rowSpanArray
        this.tableData = tableDataNew
      },


      //合并表格
      objectSpanMethod({row, column, rowIndex, columnIndex}) {
        if (columnIndex === 0) {
          return {
            colspan: 1,
            rowspan: this.rowSpanArray[rowIndex],
          }
        }
      },


      /*获取部门科室表 专业列表 /teacherInfo/list */
      getTeacherList() {
        this.$GET('/teacherInfo/list', {limit: 999, page: 1}).then(res => {
          if (res.code == 200) {
            this.teacherInfoList = res.data
          } else {
            this.$message.error(res.msg)
          }
        })
      },

      /*获取部门科室表 专业列表 /departmentInfo/list */
      getMajorList() {
        this.$GET('/departmentInfo/list', {limit: 999, page: 1}).then(res => {
          if (res.code == 200) {
            this.majorInfoList = res.data
          } else {
            this.$message.error(res.msg)
          }
        })
      },

      /*获取教室列表 /classRoom/list*/
      getClassRoomList() {
        this.$GET('/classRoom/all', {page: 1, limit: 999}).then(res => {
          this.classRoomList = res
          if (res.code == 200) {
            this.classRoomList = res.data
          } else {
            this.$message.error(res.msg)
          }
        })
      },

      /**
       *  判断是否有应用该标签
       *  如果有 返回  false
       *  没有 返回   true
       */
      isHaveTags(tag) {
        let data = this.tableData;
        for (let i = 0; i < data.length; i++) {
          for (const itemKey in data[i]) {
            let item = data[i][itemKey]
            if (item.shortName == tag) {
              return false;
            }
          }
        }
        return true;
      },
      //获取两天之间相差的星期数 2017-01-20 到 2017-01-23
      getAll(begin, end) {
        let arr = []
        begin = /\d{4}-\d{1,2}-\d{1,2}/g.exec(begin)[0]
        end = /\d{4}-\d{1,2}-\d{1,2}/g.exec(end)[0]
        let ab = begin.split('-')
        let ae = end.split('-')
        let db = new Date()
        db.setUTCFullYear(ab[0], ab[1] - 1, ab[2])
        let de = new Date()
        de.setUTCFullYear(ae[0], ae[1] - 1, ae[2])
        let unixDb = db.getTime()
        let unixDe = de.getTime()
        for (let k = unixDb; k <= unixDe;) {
          arr.push(this.formatDate(new Date(parseInt(k))))
          k = k + 24 * 60 * 60 * 1000 * 7
        }
        if (arr[arr.length - 1] !== end) {
          arr.push(end)
        }
        return arr
      },
      //格式化时间
      formatDate(date) {
        let s = ''
        let mouth = (date.getMonth() + 1) >= 10 ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))
        let day = date.getDate() >= 10 ? date.getDate() : ('0' + date.getDate())
        s += date.getFullYear() + '-' // 获取年份。
        s += mouth + '-' // 获取月份。
        s += day // 获取日。
        return (s) // 返回日期。
      },
    },
    filters: {
      weekDealWith: function (data) {
        let weekArray = data.split(',')
        return weekArray[0] + '~' + weekArray[weekArray.length - 1]
      }
    }
  }
</script>

<style lang="less">
  .teaching-process-wrapper {
    .content-detail-box {
      background-color: #fff;
      min-height: 750px;

      .left-detail-timetable {
        padding: 25px 30px 12px 20px;

        .table-box-wrapper {
          margin-top: 15px;
          padding-bottom: 20px;

          .table-head {
            height: 38px;
            line-height: 38px;
            text-align: center;
            font-size: 16px;
            color: #fff;
          }

          .table-box {
            text-align: center;
            color: #fff;
            font-size: 16px;
            font-weight: 400;
            border-bottom: 1px solid #999999;
            border-left: 1px solid #999999;
            border-right: 1px solid #999999;

            .head-info {
              height: 36px;
              line-height: initial;
              padding: 0;

              th {
                border-right: 1px solid #999999;
                border-bottom: 1px solid #999999;

                &.is-center div {
                  padding: 0;
                }
              }
            }

            .tr-class-info:hover > td {
              background-color: inherit;
            }

            .td-class-info {
              border-right: 1px solid #999999;
              border-bottom: 1px solid #999999;
            }

            .el-table__body {
              td {
                height: 30px;
                padding: 0;
                box-sizing: border-box;
              }
            }


            .week-box {
              position: absolute;
              top: 0;
              left: 0;
              cursor: pointer;
              text-align: center;
              height: 100%;
              color: #000;

              &.HALF {
                width: 50%;
              }

              &.ALL {
                width: 100%;
              }

              .course-message {
                position: absolute;
                width: 100%;
                top: 50%;
                left: 0;
                transform: translateY(-50%);
                line-height: 1;

                .t-icon {
                  width: 8px;
                  height: 5px;
                  display: inline-block;
                  border-bottom: 1px solid #333333;
                  border-left: 1px solid #333333;
                  transform: rotate(-50deg);
                }
              }
            }
          }
        }
      }

      .right-detail-operation {
        box-sizing: border-box;
        box-shadow: 0px 3px 25px 5px rgba(50, 98, 236, 0.08);
        border-radius: 4px;

        .operation-title {
          padding: 20px 16px 10px;
          display: flex;
          align-items: center;
          justify-content: space-between;

          .title-text {
            display: inline-block;
            font-size: 14px;
            font-weight: bold;
            color: #333;
          }

          .title-btn {
            // float: right;
            display: inline-block;

            .min-tag {
              cursor: pointer;
              width: 42px;
              height: 22px;
              line-height: 22px;
              border-radius: 11px;
            }
          }
        }


        .tag-list {
          min-height: 100px;
          max-height: 408px;
          overflow-y: auto;
          overflow-x: hidden;

          .tag-item {
            padding: 0 16px;
            cursor: pointer;
            position: relative;
            font-size: 14px;
            font-weight: 400;
            height: 50px;
            line-height: 50px;

            .active {
              display: inline-block;
              position: absolute;
              width: 5px;
              height: 20px;
              left: 5px;
              top: 50%;
              border-radius: 5px;
              margin-top: -10px;
            }

            .detail-info {
              border-bottom: 1px solid #E5EAF5;
              height: 100%;

              &:hover {
                .operation {
                  .edit {
                    display: inline-block;
                  }

                  .close {
                    display: inline-block;
                  }
                }
              }


              .icon {
                display: inline-block;
                width: 20px;
                height: 20px;
                line-height: 20px;
                border-radius: 2px;
                text-align: center;
                color: #000;
              }

              .name {
                margin-left: 14px;
                color: #333333;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
                word-break: break-all;
              }

              .operation {
                text-align: right;

                .edit {
                  display: none;
                  padding: 5px;
                  font-size: 12px;
                  font-weight: 700;
                }

                .close {
                  display: none;
                  font-size: 14px;
                  padding: 5px;
                  vertical-align: middle;
                  font-weight: 700;
                }

              }
            }
          }
        }


        .week-list {
          padding: 0 16px;

          .week-item {
            font-size: 14px;
            font-weight: 400;
            height: 50px;
            line-height: 50px;
            border-bottom: 1px solid #E5EAF5;
          }
        }

        .tips-list {
          font-size: 14px;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          padding: 20px 16px;

          .tip-item {
            height: 20px;
            margin-bottom: 15px;

            .icon {
              display: inline-block;
              width: 20px;
              height: 20px;
              margin-right: 5px;
              vertical-align: middle;

              &.all {
                background-color: #F8BDBD;
              }

              &.half {
                &::after {
                  display: inline-block;
                  content: "";
                  width: 10px;
                  height: 20px;
                  background-color: #CCDCFF;
                }
              }

              &.true {
                position: relative;

                &::before {
                  position: absolute;
                  top: 3px;
                  left: 4px;
                  content: "";
                  display: inline-block;
                  width: 5px;
                  height: 10px;
                  border-bottom: 1px solid #333;
                  border-right: 1px solid #333;
                  transform: rotate(45deg);
                }
              }
            }

            .text {
              display: inline-block;
              vertical-align: text-top;
              width: 80%;
            }
          }
        }
      }
    }

    .add-tag-dialog {

      .short-name-item {
        .el-form-item__label {
          width: 60px !important;
        }
      }

      .form-item-color {
        .el-form-item__content {
          width: calc(100% - 126px);
        }

        .tag-name {
          display: inline-block;
          text-align: right;
          padding-right: 12px;
          width: 80px;
          line-height: 40px;
        }

        .tag-list-box {
          margin-top: 10px;
          margin-left: -4px;
          display: inline-block;
          vertical-align: top;

          .tag-item-box {
            .radio-color {
              position: relative;
              width: 32px;
              height: 32px;
              border-radius: 4px;
              margin-right: 6px;
              margin-bottom: 12px;

              .el-radio__label {
                padding-left: 0;
              }

              .tag-item {
                position: relative;
                display: inline-block;
                width: 100%;
                height: 100%;
                border-radius: 4px;

                .active {
                  position: absolute;
                  top: 0;
                  right: 0;
                  display: inline-block;
                  width: 0;
                  height: 0;
                  border-width: 7px;
                  border-style: solid;
                  border-radius: 4px;
                  border-color: #3E7857 #3E7857 transparent transparent;

                  &::after {
                    position: absolute;
                    top: -5px;
                    right: -7px;
                    transform: rotate(135deg);
                    content: "";
                    display: inline-block;
                    width: 6px;
                    height: 3px;
                    border-top: 1px solid #fff;
                    border-right: 1px solid #fff;
                  }
                }
              }
            }

            .el-radio__input {
              display: none;
            }
          }
        }
      }

      .input-self {
        width: 188px;
      }

      .el-dialog__footer {
        text-align: left;
      }
    }

    .import-tag-dialog {
      .import-list {
        .el-radio-group {
          width: 100%;

          .import-item {
            border-bottom: 1px solid #E5EAF5;
            height: 50px;
            line-height: 50px;
          }
        }
      }

      .el-dialog__footer {
        text-align: left;
      }
    }

    .add-allocation-dialog {

      .short-item-48 {
        .el-form-item__label {
          width: 48px !important;
        }
      }

      .short-item-60 {
        .el-form-item__label {
          width: 60px !important;
        }
      }

      .dynamic-column {
        position: relative;

        .add-icon {
          position: absolute;
          top: 50%;
          right: -8px;
          margin-top: -26px;
          color: #CCCCCC;
          font-size: 32px;
        }
      }

      .long-site {
        width: 100%;

        .el-form-item__content {
          width: calc(100% - 85px);

          .select-site {
            width: 95%;
          }
        }
      }
    }

    .input-self-124 {
      width: 124px;
    }

    .input-self-190 {
      width: 190px;
    }

    .input-self-300 {
      width: 300px;
    }

    .input-self-360 {
      width: 360px;
    }

    .input-self-120 {
      width: 120px;
    }
  }
</style>
