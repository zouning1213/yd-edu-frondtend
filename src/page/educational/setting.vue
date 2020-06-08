<template>
    <!--系统设置-->
    <div>
        <el-row class="yd-router-title yd-bg">
            <el-col :span="4">
                <div class="title-icon icon-skin"><i class="yd icon-menu-setting"></i></div>
                <h3>系统设置</h3>
            </el-col>
            <!-- <el-col :span="20" class="text-right">
                 <el-input placeholder="请输入内容" v-model="search" class="input-with-select">
                     <el-button slot="append">搜索</el-button>
                 </el-input>
             </el-col>-->
        </el-row>
        <div class="yd-bg yd-manage-setting">
            <el-tabs v-model="activeName" type="border-card" class="isconfig-mb-1">
              <!--  <el-tab-pane label="排课变量设置" name="first">
                    <setting-arrang></setting-arrang>
                </el-tab-pane>-->
                <!-- <el-tab-pane label="分数变量设置" name="second">
                    <setting-score></setting-score>
                </el-tab-pane> -->
                <el-tab-pane label="命名变量设置" name="third">
                    <setting-named></setting-named>
                </el-tab-pane>
           <!--     <el-tab-pane label="成绩录入设置" name="fourth">
                    <setting-grade></setting-grade>
                </el-tab-pane>-->
            </el-tabs>
        </div>
    </div>
</template>

<script>
    import './css/setting.less'
    import settingArrang from '../../components-page/educational/setting/setting-arrang'
    import settingGrade from '../../components-page/educational/setting/setting-grade'
    import settingNamed from '../../components-page/educational/setting/setting-named'
    import settingScore from '../../components-page/educational/setting/setting-score'

    export default {
        name:"setting",
        components:{
            settingArrang,
            settingGrade,
            settingNamed,
            settingScore
        },
        data() {
            return {
                activeName:'third',
                ruleForm:{}
            }
        }
    }
</script>

<style lang='less'> 
    .isconfig-mb-1{
        &>.el-tabs__header{
            margin-bottom: 1px;
        }
    }
</style>