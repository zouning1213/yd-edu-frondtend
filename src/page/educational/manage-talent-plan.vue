<template>
  <!--人才培养计划-->
  <div class="educational-manage-talent-new">
    <el-row class="yd-router-title yd-bg">
      <el-col :span="4">
        <div class="title-icon icon-skin">
          <i class="yd icon-plan"></i>
        </div>
        <h3>人才培养计划</h3>
      </el-col>
      <!-- <el-col :span="20" class="text-right">
                <el-input placeholder="按标题关键字搜索" v-model="search" class="input-with-select" @keyup.enter.native="searchTitle">
                    <el-button slot="append" @click="searchTitle">搜索</el-button>
                </el-input>
      </el-col>-->
    </el-row>

    <!-- 中间主体 -->
    <div class="yd-bg common-pd yd-common-flex">
      <div class="common-left-tree">
        <yd-select-zyh @getJhh="getJhh"></yd-select-zyh>
        <div style="position: absolute;bottom: 10px;right: 20px">
          <!-- <el-button type="primary" @click="addZyMenu">添加</el-button> -->
        </div>
      </div>
      <div class="common-right-table pr yd-common-table">
        <div class="common-right-table-tapcar">
          <el-button :type="isactive?'primary':''" @click="isShowWhat(true)">专业课程</el-button>
          <el-button :type="!isactive?'primary':''" @click="isShowWhat(false)">附件文本</el-button>
        </div>
        <div :height="this.$store.state.minClientHeight-350">
          <div v-show="isactive">
            <el-table
              show-summary
              :summary-method="getSummaries"
              :span-method="objectSpanMethod"
              :data="tableData"
              :max-height="this.$store.state.minClientHeight-350"
              style="width: 100%;text-align:center"
            >
              <el-table-column label="课程分类" width="80px" align="center">
                <template slot-scope="scope"> 
                  <span class="componyname talent-table-lefttitle" v-if="scope.$index<ggkLength">公共课</span>
                  <span
                    class="componyname talent-table-lefttitle"
                    v-if="scope.$index>=ggkLength"
                  >专业课</span>
                </template>
              </el-table-column>

              <el-table-column align="center" prop="kch" label="课程编码" width="140">
                <template slot-scope="scope">
                  <p>{{scope.row.kch||'-'}}</p>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="kcmc" label="课程名称1" width="280">
                <template slot-scope="scope">
                  <p>{{scope.row.kcmc||'-'}}</p>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="xszsumkss" label="总学时" width>
                <template slot-scope="scope">
                  <p>{{scope.row.xszsumkss||'-'}}</p>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="xszxf" label="总学分" width>
                <template
                  slot-scope="scope"
                >{{scope.row.xszxf=='0'?0:scope.row.xszxf?scope.row.xszxf:'-'}}</template>
              </el-table-column>
              <el-table-column label="学时分布" align="center">
                <el-table-column align="center" prop="xszllks" label="理论" width="50">
                  <template
                    slot-scope="scope"
                  >{{scope.row.xszllks=='0'?0:scope.row.xszllks?scope.row.xszllks:'-'}}</template>
                </el-table-column>
                <!-- <el-table-column
                                        align="center"
                                        prop="xszsyks"
                                        label="实验"
                                        width="50">
                                </el-table-column>
                                <el-table-column
                                        align="center"
                                        prop="xszsjks"
                                        label="上机"
                                        width="50">
                </el-table-column>-->
                <el-table-column align="center" prop="xszsxks" label="实践" width="50">
                  <template
                    slot-scope="scope"
                  >{{scope.row.xszsxks=='0'?0:scope.row.xszsxks?scope.row.xszsxks:'-'}}</template>
                </el-table-column>
                <!-- <el-table-column
                                        align="center"
                                        prop="qt"
                                        label="其他"
                                        width="50">
                </el-table-column>-->
              </el-table-column>
              <el-table-column align="center" prop="khfs" label="考核方式" width="80">
                <template slot-scope="scope">
                  <p>{{scope.row.khfs||'-'}}</p>
                </template>
              </el-table-column>
              <el-table-column label="各学期总学时" align="center">
                <el-table-column align="center" prop="zks1" label="1" width="40">
                  <template slot-scope="scope">
                    <!-- <p>{{scope.row.zks1||'-'}}</p> -->
                    {{scope.row.zks1=='0'?0:scope.row.zks1?scope.row.zks1:'-'}}
                  </template>
                </el-table-column>
                <el-table-column align="center" prop="zks2" label="2" width="40">
                  <template
                    slot-scope="scope"
                  >{{scope.row.zks2=='0'?0:scope.row.zks2?scope.row.zks2:'-'}}</template>
                </el-table-column>
                <el-table-column align="center" prop="zks3" label="3" width="40">
                  <template
                    slot-scope="scope"
                  >{{scope.row.zks3=='0'?0:scope.row.zks3?scope.row.zks3:'-'}}</template>
                </el-table-column>
                <el-table-column align="center" prop="zks4" label="4" width="40">
                  <template
                    slot-scope="scope"
                  >{{scope.row.zks4=='0'?0:scope.row.zks4?scope.row.zks4:'-'}}</template>
                </el-table-column>
                <el-table-column align="center" prop="zks5" label="5" width="40">
                  <template
                    slot-scope="scope"
                  >{{scope.row.zks5=='0'?0:scope.row.zks5?scope.row.zks5:'-'}}</template>
                </el-table-column>
                <el-table-column align="center" prop="xszsjks" label="6" width="40">
                  <template
                    slot-scope="scope"
                  >{{scope.row.zks6=='0'?0:scope.row.zks6?scope.row.zks6:'-'}}</template>
                </el-table-column>
              </el-table-column>

              <el-table-column label="操作" width="100">
                <template slot-scope="scope">
                  <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
                  <el-button type="text" size="small" @click="tabledelete(scope.row.jhxqh)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div v-show="!isactive" class="fujian-contant">
            <editor
              v-if="isShwoFwb"
              :height="this.$store.state.minClientHeight-500"
              :name="editorName"
              :value="fwbContent"
              :uploadUrl="'/notice/editor/upload'"
              v-model="fwbContent"
              @change="function(html){fwbContent=html}"
            ></editor>
            <!-- <div class="mt-30">
                            <el-button type="primary" @click="submitFwb">提 交</el-button> 
            </div>-->
          </div>
        </div>
        <div style="margin-top:20px;width:100%">
          <span v-show="jihuaflag">
            <!-- <span v-show="zyData.jhh"> -->
            <span style="float: left;margin-right: 15px">
              <el-upload
                class="upload-demo"
                :headers="myHeaders"
                :action="uploadaction"
                :on-success="upSuccess"
                :before-upload="beforeUpload"
                :limit="1"
                :on-exceed="handleExceed"
                :on-change="handleChange"
                :file-list="fileList"
              >
                <el-button class="color-blue upload-demo-color upload-talent-plan-button">
                  <i class="el-icon-upload el-icon--right"></i> 上传人才计划培养文档
                </el-button>
                <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
              </el-upload>
            </span>
            <span style="float: left;margin-right: 15px">
              <el-button class="color-blue upload-demo-color download-talent-plan-button">
                <a :href="downWordDz" v-show="downWordDz">
                  <i class="el-icon-upload el-icon--right"></i> 下载人才计划培养文档
                </a>
                <span v-show="!downWordDz">
                  <i class="el-icon-upload el-icon--right"></i> 暂无人才计划培养文档
                </span>
              </el-button>
            </span>
            <!-- <el-button type="primary">导入</el-button> -->
            <el-button type="primary" @click="addNewTalentPlan">添加</el-button>
            <el-button type="primary fr mr-20" @click="submitFwb">人才培养计划及附件文本提交</el-button>
            <yd-import-data
              name="人才培养计划"
              @importSuccess="importSuccess"
              importUrl="/talentSchemeInfo/importExcel"
              :templateUrl="'/talentSchemeInfo/exportData?jhhs='+jhh"
            ></yd-import-data>
            <yd-export-data
              :url="remoteHost + '/talentSchemeInfo/exportData?jhhs='+jhh "
              name="人才培养计划"
            ></yd-export-data>
          </span>
        </div>
      </div>
    </div>
    <!-- 添加课程模态框 -->
    <el-dialog
      @close="kcmotaiClose"
      :title="isEditMotai?'人才计划信息编辑':'人才计划信息添加'"
      :visible.sync="centerDialogVisible"
      width="760px"
    >
      <div class="motai-header-wrap">
        <el-form label-width="90px" :model="motaiForm" :rules="rules" v-show="isEditMotai">
          <el-row>
            <el-col :span="12">
              <el-form-item label="课程分类:">
                <el-input v-model="propData.ksmc" width="220px" disabled></el-input>
                <!-- <el-select v-model="propData.jhxqh"> 
                                    <el-option
                                            v-for="item in jysOptions"
                                            :key="item.ksid"
                                            :label="item.ksmc"
                                            :value="item.ksid"></el-option>
                </el-select>-->
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="考核方式:">
                <el-input v-model="propData.khfs" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="课程编号:">
                <el-input class="ismotaikcbhTop fl" v-model="propData.kcid" disabled></el-input>
                <!-- <div class="ismtkcbh text-center fl"><span>...</span></div>   -->
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="课程名称:">
                <el-input v-model="propData.kcmc" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-form label-width="90px" :model="motaiForm" :rules="rules" v-show="!isEditMotai">
          <el-row>
            <el-col :span="12">
              <el-form-item label="课程分类:">
                <el-select v-model="isjys" @change="jysSelectKc(isjys)">
                  <el-option
                    v-for="item in jysOptions"
                    :key="item.ksid"
                    :label="item.ksmc"
                    :value="item.ksid"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="课程名称:">
                <el-select v-model="propData.kcid">
                  <el-option
                    v-for="item in kcidOptions"
                    :key="item.kcid"
                    :label="item.kcmc"
                    :value="item.kcid"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="motai-body-from">
        <el-table border :data="motaitableData" style="width: 100%">
          <el-table-column prop="name" label="学期" width="180"></el-table-column>
          <el-table-column prop label="1" width>
            <template slot-scope="scope">
              <el-input v-if="scope.row.hang==1" v-model="propData.xf1"></el-input>
              <el-input v-if="scope.row.hang==2" v-model="propData.kss1"></el-input>
              <el-input v-if="scope.row.hang==3" v-model="propData.syks1"></el-input>
              <el-input v-if="scope.row.hang==4" v-model="propData.sjks1"></el-input>
              <el-input v-if="scope.row.hang==5" v-model="propData.sxks1"></el-input>
              <el-input v-if="scope.row.hang==6" v-model="propData.zks1"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop label="2">
            <template slot-scope="scope">
              <el-input v-if="scope.row.hang==1" v-model="propData.xf2"></el-input>
              <el-input v-if="scope.row.hang==2" v-model="propData.kss2"></el-input>
              <el-input v-if="scope.row.hang==3" v-model="propData.syks2"></el-input>
              <el-input v-if="scope.row.hang==4" v-model="propData.sjks2"></el-input>
              <el-input v-if="scope.row.hang==5" v-model="propData.sxks2"></el-input>
              <el-input v-if="scope.row.hang==6" v-model="propData.zks2"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop label="3">
            <template slot-scope="scope">
              <el-input v-if="scope.row.hang==1" v-model="propData.xf3"></el-input>
              <el-input v-if="scope.row.hang==2" v-model="propData.kss3"></el-input>
              <el-input v-if="scope.row.hang==3" v-model="propData.syks3"></el-input>
              <el-input v-if="scope.row.hang==4" v-model="propData.sjks3"></el-input>
              <el-input v-if="scope.row.hang==5" v-model="propData.sxks3"></el-input>
              <el-input v-if="scope.row.hang==6" v-model="propData.zks3"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop label="4">
            <template slot-scope="scope">
              <el-input v-if="scope.row.hang==1" v-model="propData.xf4"></el-input>
              <el-input v-if="scope.row.hang==2" v-model="propData.kss4"></el-input>
              <el-input v-if="scope.row.hang==3" v-model="propData.syks4"></el-input>
              <el-input v-if="scope.row.hang==4" v-model="propData.sjks4"></el-input>
              <el-input v-if="scope.row.hang==5" v-model="propData.sxks4"></el-input>
              <el-input v-if="scope.row.hang==6" v-model="propData.zks4"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop label="5">
            <template slot-scope="scope">
              <el-input v-if="scope.row.hang==1" v-model="propData.xf5"></el-input>
              <el-input v-if="scope.row.hang==2" v-model="propData.kss5"></el-input>
              <el-input v-if="scope.row.hang==3" v-model="propData.syks5"></el-input>
              <el-input v-if="scope.row.hang==4" v-model="propData.sjks5"></el-input>
              <el-input v-if="scope.row.hang==5" v-model="propData.sxks5"></el-input>
              <el-input v-if="scope.row.hang==6" v-model="propData.zks5"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop label="6">
            <template slot-scope="scope">
              <el-input v-if="scope.row.hang==1" v-model="propData.xf6"></el-input>
              <el-input v-if="scope.row.hang==2" v-model="propData.kss6"></el-input>
              <el-input v-if="scope.row.hang==3" v-model="propData.syks6"></el-input>
              <el-input v-if="scope.row.hang==4" v-model="propData.sjks6"></el-input>
              <el-input v-if="scope.row.hang==5" v-model="propData.sxks6"></el-input>
              <el-input v-if="scope.row.hang==6" v-model="propData.zks6"></el-input>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitMotai">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 添加专业模态 -->
    <el-dialog center title="添加" :visible.sync="zycenterDialogVisible" width="460px">
      <div class="zymotai-header-wrap"></div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="zycenterDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="zycenterDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import ydSelectZyh from "../../components-page/select/yd-tree-zyid-year";
import editor from "../../components-page/common/editor";

import ydExportData from "../../components-page/common/yd-export-data";
import ydImportData from "../../components-page/common/yd-import-data";

var uploadaction = setting.remoteHost + "/geniusInfo/upload";
var token = localStorage.getItem("token");

export default {
  name: "manage-talent-lan-new",
  components: {
    editor,
    ydSelectZyh,
    ydExportData,
    ydImportData
  },
  data() {
    return {
      isEditMotai: false,
      jihuaflag: false,
      search: "",
      isShwoFwb: true,
      downWordDz: "",
      // this.motaiform.wordDz = setting.remoteHost + '/storage/fetch/' + row.xxjh || ''
      fwbContent: "",
      //
      zyData: {},
      editorName: "contentText",
      isactive: true,
      propData: {},
      jhh: "",
      isjys: "",
      ggkLength: 0,
      zykLength: 0,
      //
      fileList: [],
      uploadaction: uploadaction,
      myHeaders: { Authorization: token },
      //
      zycenterDialogVisible: false,
      centerDialogVisible: false,
      tableData: [],
      motaitableData: [
        {
          name: "学分",
          hang: 1
        },
        {
          name: "理论学时",
          hang: 2
        },
        // {
        //     name:'实验学时',
        //     hang:3,
        // },
        // {
        //     name:'上机学时',
        //     hang:4,
        // },
        {
          name: "实践学时",
          hang: 5
        },
        {
          name: "周课时",
          hang: 6
        }
      ],
      motaiForm: {
        kcfl: "",
        khfs: "",
        kcbh: "",
        kcmc: ""
      },
      rules: {
        kcfl: [
          { required: true, message: "请选择活动名称", trigger: "change" }
        ],
        khfs: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ],
        kcbh: [
          { required: true, message: "请选择活动资源", trigger: "change" }
        ],
        kcmc: [{ required: true, message: "请填写活动形式", trigger: "change" }]
      },
      jysOptions: [],
      kcidOptions: []
    };
  },
  created() {
    this.$GET("/departmentInfo/list", { page: 1, limit: 100 }).then(res => {
      this.jysOptions = res.data;
    });
  },
  methods: {
    importSuccess() {
      this.getJhh(this.jhh);
    },
    isShowWhat(flag) {
      this.isactive = flag;
    },
    searchTitle() {
      this.getJhh(this.jhh);
    },
    // columnIndex === 0表示之合并第一列
    objectSpanMethod({ rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex === 0 && this.ggkLength !== 0) {
          return {
            rowspan: this.ggkLength,
            colspan: 1
          };
        }
        if (rowIndex === this.ggkLength) {
          return {
            rowspan: this.zykLength,
            colspan: 1
          };
        }
        return {
          rowspan: 0,
          colspan: 0
        };
      }
    },
    //
    //上传前钩子
    beforeUpload(file) {
      var testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
      const extension = testmsg === "docx";
      if (!extension) {
        this.$message({
          message: "上传文件只能是docx格式!",
          type: "warning"
        });
        this.fileList.pop(1);
      }
      // console.log(file)
      // console.log(this.fileList)
      return extension;
    },
    handleExceed(files, fileList) {
      this.$message.warning(`只能上传一个文件 `);
    },
    //上传成功
    upSuccess(response, file, fileList) {
      // console.log("上传成功回调")
      //下载地址
      // this.tableData.pdf = setting.remoteHost + '/storage/fetch/' + response.data.pdf
      this.downWordDz =
        setting.remoteHost + "/storage/fetch/" + response.data.org;
    },
    handleChange(file, fileList) {
      this.fileList = fileList.slice(-3);
    },
    addZyMenu() {
      this.zycenterDialogVisible = true;
    },
    getJhh(jhh) {
      this.isShwoFwb = false;
      // console.log("被子调用")
      this.jhh = jhh;
      this.$GET("/talentSchemeInfo/grouplist", {
        jhh: jhh,
        condition: this.search
      }).then(res => {
        this.ggkLength = res.data.ggkc.length;
        // console.log(res.data.ggkc);
        this.zykLength = res.data.zykc.length;
        this.tableData = res.data.ggkc.concat(res.data.zykc);
      });
      //换专业清空数据
      this.zyData = "";
      this.downWordDz = "";
      this.fwbContent = "";
      // 根据jhh初始化数据
      this.$GET("/geniusInfo/detail/" + jhh).then(res => {
        // console.log("下面根据jhh从服务器取的")
        // console.log(res.data.geniusInfo)
        this.zyData = res.data.geniusInfo;
        this.downWordDz = res.data.geniusInfo.fjlj;
        this.fwbContent = res.data.geniusInfo.nr;
        this.isShwoFwb = true;
        this.jihuaflag = true;
      });
    },
    //编辑
    handleClick(row) {
      this.isEditMotai = true;
      this.propData = row;
      // console.log(this.propData)
      this.centerDialogVisible = true;
    },
    //添加新的
    addNewTalentPlan() {
      this.isEditMotai = false;
      this.centerDialogVisible = true;
    },
    kcmotaiClose() {
      if (this.propData.jhh) {
        this.getJhh(this.propData.jhh);
      }
      this.propData = {};
    },
    //教研室查课程
    jysSelectKc(ksid) {
      this.$GET("/lessonInfo/lessonInfoByksid", { ksid: ksid }).then(res => {
        this.kcidOptions = res.data;
      });
    },
    //模态提交
    submitMotai() {
      if (this.isEditMotai == false) {
        this.propData.jhh = this.jhh;
        // console.log(this.propData);
        this.$POST("/talentSchemeInfo/add", this.propData).then(res => {
          if (res.code == 200) {
            this.$message({
              type: "success",
              message: "添加成功!"
            });
          } else {
            this.$message({
              type: "success",
              message: res.message
            });
          }
          this.getJhh(this.propData.jhh);
          this.centerDialogVisible = false;
        });
      } else {
        this.$POST("/talentSchemeInfo/update", this.propData).then(res => {
          if (res.code == 200) {
            this.$message({
              type: "success",
              message: "编辑成功!"
            });
            this.getJhh(this.propData.jhh);
            this.centerDialogVisible = false;
          }
        });
      }
    },
    tabledelete(jhh) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$GET("/talentSchemeInfo/delete", { talentSchemeInfoId: jhh }).then(
          res => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.getJhh(this.jhh);
            } else {
              this.$message({
                type: "error",
                message: res.message
              });
            }
          }
        );
      });
    },
    //提交富文本
    submitFwb() {
      this.zyData.nr = this.fwbContent;
      this.zyData.fjlj = this.downWordDz;
      if (this.zyData.jhh) {
        this.$POST("/geniusInfo/update", this.zyData).then(res => {
          if (res.code == 200) {
            this.$message({
              type: "success",
              message: "提交成功"
            });
          } else {
            this.$message({
              type: "error",
              message: "提交失败"
            });
          }
        });
      }
    },
    //尾行总计
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总计';
          return;
        }
        if (index >= 1&&index<8) {
          sums[index] = '';
          return;
        }
        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          sums[index] += '';
        } else {
          sums[index] = '';
        }
      });

      return sums;
    }
  }
};
</script>

<style lang="less">
.educational-manage-talent-new {
  .common-right-table-tapcar {
    width: 100%;
    height: 40px;
    margin-bottom: 20px;
    background-color: #f3f5f7;
    & > .el-button--medium {
      padding: 8px 24px;
      margin: 4px;
    }
  }
  .upload-talent-plan-button {
    background-color: #3a85dc;
    color: #fff;
  }
  .download-talent-plan-button {
    background-color: #ec526c;
    color: #fff;
    a {
      color: #fff;
    }
  }
}

/* .educational-manage-talent-new {
         .manage-talent-menu {
             position: relative;
             width: 320px;
             !*height: 757px;*!
             border: 1px solid #DCDCDC;
             .manage-talent-menu-header {
                 height: 40px;
                 padding-left: 20px;
                 color: #fff;
                 span {
                     line-height: 40px;
                 }
             }
             .manage-talent-menu-content {
                 height: 600px;
             }
             .manage-talent-menu-button {
                 position: absolute;
                 right: 10px;
                 bottom: 10px;
             }
             //
             .el-icon-caret-right {
                 transition: all .3s
             }
             .el-submenu.is-opened > .el-submenu__title .el-icon-caret-right {
                 -webkit-transform: rotateZ(90deg);
                 transform: rotateZ(90deg);
                 transition: all .5 ease
             }
         }
         .manage-talent-table {
             position: relative;
             !*height: 757px;*!
             // background-color: #ccc;
             padding-left: 20px;
             .talent-table-lefttitle {
                 width: 16px;
                 font-size: 16px;
                 word-wrap: break-word;
                 letter-spacing: 14px;
             }
             .talent-table-button-wrap {
                 position: absolute;
                 left: 20px;
                 bottom: 10px;
             }
         }
         .motai-header-wrap {
             width: 100%;
             // height: 133px;
             background: rgba(243, 245, 247, 1);
             padding: 20px 0 0 20px;
             margin-bottom: 20px;
             .el-input--medium .el-input__inner {
                 width: 220px;
             }
             .ismotaikcbhTop {
                 width: 140px;
                 margin-right: 10px;
                 .el-input__inner {
                     width: 140px;
                 }
             }
             .ismtkcbh {
                 margin-top: 1px;
                 width: 70px;
                 height: 36px;
                 border-radius: 4px;
                 border: 1px solid #DCDFE6;
                 background-color: #fff;
                 font-size: 20px;
                 span {
                     line-height: 36px;
                 }

                 // .el-input__inner{
                 //     background-color: #fff;
                 //     width: 70px;
                 //     cursor: pointer;
                 // }
             }
         }
         .zymotai-header-wrap {

         }
         .color-blue {
             background-color: #3A85DC;
             color: #fff
         }
         .upload-demo {
             float: left;
         }
         .upload-demo-color {

             margin-right: 13px;
         }
     }*/
</style> 