<template>
  <!--学生基本信息-->
  <div class="common-popup-warp mobile-stu-info-basic" :style="{maxHeight:(this.$store.state.minClientHeight-120)+'px'}">
    <van-cell-group>
      <div class="mobile-stu-info-tx"
        style="width: 137px;position: absolute;z-index: 999;right: 0;
        top: 0;padding: 16px;background-color: #fff"
      >
        <!-- <van-image width="%" :src="form.zp" /> 105 147-->
        <!-- <van-uploader :before-read="beforeRead" :after-read="afterRead"  multiple  :max-count="1" v-model="fileList" /> -->
        <cut-pic :cutStyle="2" :imgUrl="form.zp" :showStyle="2"  :isshowid='3'
        ref="cutPic" :ratio="2.5/3.5" @submit="uploadAvatarSuccess"></cut-pic>
      </div>
      <van-field
        v-model="form.xh"
        type="text"
        label="学号"
        required
        :disabled="is_edit"
        placeholder="请输入学号"
      />
      <van-field v-model="form.xm" type="text" label="姓名" :disabled="is_edit" placeholder="请输入密码" />
      <van-field
        v-model="form.xmpy"
        type="text"
        label="姓名拼音"
        :disabled="is_edit"
        placeholder="请输入姓名拼音"
      />
      <van-field
        v-model="form.cym"
        type="text"
        label="曾用名"
        :disabled="is_edit"
        placeholder="请输入曾用名"
      />
      <van-field label="性别">
        <van-radio-group slot="input" v-model="form.xbm" :disabled="is_edit">
          <span style="display: inline-block;margin-right: 20px">
            <van-radio name="1">男</van-radio>
          </span>
          <span style="display: inline-block">
            <van-radio name="2">女</van-radio>
          </span>
        </van-radio-group>
      </van-field>
      <van-field
        v-model="form.csrq"
        type="text"
        @focus="showTime = true"
        label="出生日期"
        :disabled="is_edit"
        placeholder="请选择出生日期"
      />
      <van-field
        v-model="form.mzm"
        type="text"
        label="民族"
        required
        :disabled="is_edit"
        placeholder="请输入民族"
      />
      <van-field
        v-model="form.sfzlx"
        type="text"
        label="身份证类型"
        :disabled="is_edit"
        placeholder="请选择身份证类型"
        @click="showSfzlx = true"
      />
      <van-field
        v-model="form.sfzh"
        type="text"
        label="身份证号码"
        :disabled="is_edit"
        placeholder="请输入身份证号码"
      />
      <van-field
        v-model="jg"
        type="text"
        label="籍贯"
        required
        :disabled="is_edit"
        @focus="showJgm = true"
        placeholder="请选择籍贯"
      />
      <van-field
        v-model="csd"
        type="text"
        label="出生地"
        @focus="showCsd = true"
        :disabled="is_edit"
        placeholder="请选择出生地"
      />
      <van-field
        v-model="hkszd"
        type="text"
        label="户口所在地"
        @focus="showHkszd = true"
        :disabled="is_edit"
        placeholder="请选择户口所在地"
      />
      <van-field
        v-model="form.gbm"
        type="text"
        label="国家地区"
        :disabled="is_edit"
        placeholder="请输入国家地区"
      />
      <van-field
        v-model="form.zzmm"
        type="text"
        label="政治面貌"
        :disabled="is_edit"
        @focus="showSZzmm = true"
        placeholder="请选择政治面貌"
      />
      <van-field
        v-model="form.hkxz"
        type="text"
        label="入学前户口性质"
        :disabled="is_edit"
        @focus="showHkxzm = true"
        placeholder="请选择户口性质"
      />
      <van-field
        v-model="form.ykthm"
        type="text"
        label="一卡通号码"
        :disabled="is_edit"
        placeholder="请输入一卡通号码"
      />
      <van-field
        v-model="form.khm"
        type="text"
        label="开户名"
        :disabled="is_edit"
        placeholder="请输入开户名"
      />
      <van-field
        v-model="form.khh"
        type="text"
        label="开户行"
        :disabled="is_edit"
        placeholder="请输入开户行"
      />
      <van-field
        v-model="form.yhzh"
        type="text"
        label="银行账号"
        :disabled="is_edit"
        placeholder="请输入银行账号"
      />
      <van-field
        v-model="form.xx"
        type="text"
        label="血型"
        required
        :disabled="is_edit"
        @focus="showXx = true"
        placeholder="请选择血型"
      />
      <van-field
        v-model="form.jkzk"
        type="text"
        label="健康状况"
        :disabled="is_edit"
        @focus="showJkzk = true"
        placeholder="请选择健康状况"
      />
      <van-field
        v-model="form.bs"
        type="textarea"
        label="病史"
        :disabled="is_edit"
        autosize
        placeholder="请输入病史"
      />
      <van-field
        v-model="form.tc"
        type="textarea"
        label="特长"
        :disabled="is_edit"
        autosize
        placeholder="请输入特长"
      />
    </van-cell-group>

    <!--选择时间-->
    <van-popup  v-model="showTime" position="bottom" :lock-scroll="false">
      <van-datetime-picker
        v-model="popupTime"
        @cancel="closeTime"
        @confirm="submitTime"
        :formatter="formatter"
        type="date"
      />
    </van-popup>
    <!-- 身份证类型 -->
    <van-popup v-model="showSfzlx" position="bottom">
      <van-dropdown-menu direction="up">
        <van-dropdown-item v-model="form.sfzlxm" :options="sfzlxOptions" @change="sfzlxmChange" />
      </van-dropdown-menu>
    </van-popup>
    <!-- 政治面貌 -->
    <van-popup v-model="showSZzmm" position="bottom">
      <van-dropdown-menu direction="up">
        <van-dropdown-item v-model="form.zzmmm" :options="zzmmmOptions" @change="zzmmmChange" />
      </van-dropdown-menu>
    </van-popup>
    <!-- 户口性质 -->
    <van-popup v-model="showHkxzm" position="bottom">
      <van-dropdown-menu direction="up">
        <van-dropdown-item v-model="form.hkxzm" :options="hkxzmOptions" @change="hkxzmChange" />
      </van-dropdown-menu>
    </van-popup>
    <!-- 健康状态 -->
    <van-popup v-model="showJkzk" position="bottom">
      <van-dropdown-menu direction="up">
        <van-dropdown-item v-model="form.jkzkm" :options="jkzkOptions" @change="jkzkChange" />
      </van-dropdown-menu>
    </van-popup>
    <!-- 血型 -->
    <van-popup v-model="showXx" position="bottom">
      <van-dropdown-menu direction="up">
        <van-dropdown-item v-model="form.xxm" :options="xxOptions" @change="xxChange" />
      </van-dropdown-menu>
    </van-popup>
    <!-- 出生地 -->
    <van-popup v-model="showCsd" position="bottom">
      <van-area :area-list="areaList" :value="csdMoren" @confirm="csdChange" @cancel="areaclose" />
    </van-popup>
    <!-- 籍贯码 -->
    <van-popup v-model="showJgm" position="bottom">
      <van-area
        :area-list="areaList"
        :value="jgMoren"
        @confirm="jgChange"
        :columns-num="2"
        @cancel="areaclose"
      />
    </van-popup>
    <!-- 户口所在地 -->
    <van-popup v-model="showHkszd" position="bottom">
      <van-area
        :area-list="areaList"
        :value="hkszdMoren"
        @confirm="hkszdChange"
        @cancel="areaclose"
      />
    </van-popup>
  </div>
</template>

<script>
import { CodeToText } from "element-china-area-data";
import cityList from "../../mobile/data/area";
import cutPic from "../../components-page/common/cropperPic";

export default {
  name: "info",
  props: {
    form: {
      default: {},
      required: true
    },
    is_edit: {
      default: false
    }
  },
  components: {
    cutPic
  },
  data() {
    return {
      jg: "",
      csd: "",
      hkszd: "",
      //出生地
      showCsd: false,
      areaList: cityList,
      csdMoren: "",
      //籍贯码
      showJgm: false,
      JgMoren: "",
      //户口所在地
      showHkszd: false,
      HkszdMoren: "",
      //政治面貌
      showSZzmm: false,
      //户口性质
      showHkxzm: false,
      //健康状态
      showJkzk: false,
      //血型
      showXx: false,
      value1: "",
      option1: [
        { text: "全部商品", value: 0 },
        { text: "新款商品", value: 1 },
        { text: "活动商品", value: 2 }
      ],
      //文件上传的头像
      fileList:[],
      showTime: false,
      showSfzlx: false,
      popupTime: new Date(),
      zzmmmOptions: [],
      sfzlxOptions: [],
      jkzkOptions: [],
      hkxzmOptions: [],
      xxOptions: [
        {
          value: "1",
          text: "A型"
        },
        {
          value: "2",
          text: "B型"
        },
        {
          value: "3",
          text: "AB型"
        },
        {
          value: "4",
          text: "O型"
        },
        {
          value: "5",
          text: "HR阳性熊猫血"
        },
        {
          value: "6",
          text: "HR阴性熊猫血"
        }
      ],
      config:{
          header:{
              Authorization:''
          },
          action:'',
      },
    };
  },
  created() {
    this.form.csdm = JSON.parse(this.$props.form.csdm || "[{}]") || "";
    this.form.hkszd = JSON.parse(this.$props.form.hkszd || "[{}]") || "";
    this.form.jgm = JSON.parse(this.$props.form.jgm || "[{}]") || "";

    this.fileList = [{url:this.form.zp}] 

    this.csdMoren = this.form.csdm[2] || "";
    this.hkszdMoren = this.form.hkszd[2] || "";
    this.jgMoren = this.form.jgm[1] || "";

    this.csd =
      CodeToText[this.form.csdm[0]] +
        CodeToText[this.form.csdm[1]] +
        CodeToText[this.form.csdm[2]] || "";
    this.hkszd =
      CodeToText[this.form.hkszd[0]] +
        CodeToText[this.form.hkszd[1]] +
        CodeToText[this.form.hkszd[2]] || "";
    this.jg = CodeToText[this.form.jgm[0]] + CodeToText[this.form.jgm[1]] || "";
    //初始化政治面貌下拉框
    this.$GET("/system/dictList/ZZMMM").then(res => {
      let a = [];
      res.forEach((item, index) => {
        a.push({
          value: item.code,
          text: item.name
        });
      });
      this.zzmmmOptions = a;
    });

    //初始化身份证类型下拉框
    this.$GET("/system/dictList/sfzlxm").then(res => {
      // this.sfzlxOptions = res
      let a = [];
      res.forEach((item, index) => {
        a.push({
          value: item.code,
          text: item.name
        });
      });
      this.sfzlxOptions = a;
    });
    //初始健康状态吗下拉框
    this.$GET("/system/dictList/JKZKM").then(res => {
      let a = [];
      res.forEach((item, index) => {
        a.push({
          value: item.code,
          text: item.name
        });
      });
      this.jkzkOptions = a;
    });
    //初始化户口性质码下拉框
    this.$GET("/system/dictList/HKXZM").then(res => {
      let a = [];
      res.forEach((item, index) => {
        a.push({
          value: item.code,
          text: item.name
        });
      });
      this.hkxzmOptions = a;
    });
  },
  mounted() { 
    this.config.header.Authorization = localStorage.getItem(setting.userToken);
    this.config.action = setting.remoteHost + '/studentInfo/upload64/zp';
  },
  methods: {
    //文件上传
    afterRead(file) {
      // 此时可以自行将文件上传至服务器 
      this.uploadPhoto(file.content)
    },
    //上传前校验
    beforeRead(file) { 
      if (file.type == 'image/jpeg'||file.type =='image/png') {
        return true;
      }
        this.$toast('请上传 jpg/png 格式图片');
        return false;
    }, 
    uploadPhoto(data) {
        let token = localStorage.getItem("token")
        let formData = new FormData();
        formData.append('files',data);
        var xhr = new XMLHttpRequest()
        xhr.open('POST',this.config.action,true)
        xhr.setRequestHeader("Authorization",token);
        xhr.send(formData)
        xhr.onload = () => {
            if (xhr.status === 200) { 
                this.form.zp = this.imageAddress + JSON.parse(xhr.responseText).data
            }
        }
    },
    
    uploadAvatarSuccess(res,file) {
      this.uploadPhoto(res)
    },
    formatter(type, value) {
      if (type === "year") {
        return `${value}年`;
      } else if (type === "month") {
        return `${value}月`;
      } else if (type === "day") {
        return `${value}日`;
      }
      return value;
    },
    submitTime() {
      // console.log(this.$options.filters.cutOutDate(this.popupTime,'ymd'))
      this.form.csrq = this.$options.filters.cutOutDate(this.popupTime, "ymd");
      this.showTime = false;
    },
    closeTime() {
      this.showTime = true;
    },
    //身份证类型名变化
    sfzlxmChange(a) {
      this.sfzlxOptions.forEach((item, index) => {
        if (item.value == a) {
          this.form.sfzlx = item.text;
          this.showSfzlx = false;
          return;
        }
      });
    },
    //政治面貌码变化
    zzmmmChange(a) {
      this.zzmmmOptions.forEach((item, index) => {
        if (item.value == a) {
          this.form.zzmm = item.text;
          this.showSZzmm = false;
          return;
        }
      });
    },
    //户口性质变化
    hkxzmChange(a) {
      this.hkxzmOptions.forEach((item, index) => {
        if (item.value == a) {
          this.form.hkxz = item.text;
          this.showHkxzm = false;
          return;
        }
      });
    },
    //健康状态变化
    jkzkChange(a) {
      this.jkzkOptions.forEach((item, index) => {
        if (item.value == a) {
          this.form.jkzk = item.text;
          this.showJkzk = false;
          return;
        }
      });
    },
    //血型变化
    xxChange(a) {
      this.xxOptions.forEach((item, index) => {
        if (item.value == a) {
          this.form.xx = item.text;
          this.showXx = false;
          return;
        }
      });
    },
    //出生地
    csdChange(a) {
      let iscsd = [];
      a.forEach((item, index) => {
        iscsd.push(item.code);
      });
      this.form.csdm = iscsd;
      this.csdMoren = iscsd[2];
      let csdmString =
        CodeToText[iscsd[0]] + CodeToText[iscsd[1]] + CodeToText[iscsd[2]] ||
        "";
      this.csd = csdmString;

      this.showCsd = false;
    },
    //籍贯码
    jgChange(a) {
      let isjg = [];
      a.forEach((item, index) => {
        isjg.push(item.code);
      });
      this.form.jgm = isjg;
      this.jgMoren = isjg[1];
      let jgString = CodeToText[isjg[0]] + CodeToText[isjg[1]] || "";
      this.jg = jgString;

      this.showJgm = false;
    },
    //户口所在地
    hkszdChange(a) {
      let ishkszd = [];
      a.forEach((item, index) => {
        ishkszd.push(item.code);
      });
      this.form.hkszd = ishkszd;
      this.csdMoren = ishkszd[2];
      let hkszdString =
        CodeToText[ishkszd[0]] +
          CodeToText[ishkszd[1]] +
          CodeToText[ishkszd[2]] || "";
      this.hkszd = hkszdString;

      this.showHkszd = false;
    },
    //城市关闭
    areaclose() {
      this.showCsd = false;
      this.showJgm = false;
      this.showHkszd = false;
    }
  },
  filter: {}
};
</script>

<style lang='less' >
.mobile-stu-info-basic{
  .mobile-stu-info-tx{
    img{
      width: 105px;
      height: 147px;
    }
  }
  .van-uploader__preview-image{
    width: 105px;
    height: 147px;
  }
  .van-uploader__upload {
    width: 105px;
    height: 147px;
  }
  .van-dropdown-item--up{
    bottom: 50px !important;
  }
}

</style>