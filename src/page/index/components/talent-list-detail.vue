<template>
    <!--人才计划详情-->
    <div>
        <el-row class="yd-router-title yd-bg">
            <el-col :span="4">
                <div class="title-icon icon-skin"><i class="yd icon-plan"></i></div>
                <h3>人才培养</h3>
            </el-col>
            <!--  <el-col :span="20" class="text-right">
                  <el-input placeholder="请输入内容" v-model="search" class="input-with-select">
                      <el-button slot="append">搜索</el-button>
                  </el-input>
              </el-col>-->
        </el-row>
        <div class="common-pd yd-bg">
            <div class="search-talent-detail">
                <div class="talent-title"><h3>{{detail.bt}}</h3></div>
                <div class="talent-content">
                    <canvas id="pdf-canvas" style="width:100%"></canvas>
                    <!-- <p>等待存放富文本内容</p> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import PDFJS from 'pdfjs-dist'; 
    PDFJS.GlobalWorkerOptions.workerSrc = 'pdfjs-dist/build/pdf.worker.js';

    export default {
        name:"talent-detail",
        data() {
            return {
                detail:{

                }
            }
        },
        methods:{ 
            showPdf(pdf){
                var url = pdf;   
                PDFJS.getDocument(url).then((pdf) => {
                    return pdf.getPage(1);
                }).then((page) => {
                    // 设置展示比例
                    var scale = 3;
                    // 获取pdf尺寸
                    var viewport = page.getViewport(scale);
                    // 获取需要渲染的元素
                    var canvas = document.getElementById('pdf-canvas');
                    var context = canvas.getContext('2d');  
                    canvas.height = viewport.height ;
                    canvas.width = viewport.width ; 
                    var renderContext = {
                        canvasContext: context,
                        viewport: viewport
                    }; 
                    page.render(renderContext);
                });
            },
        },
        created() { 
            this.$GET('/geniusInfo/detail/'+ this.$route.params.id).then((res) => {
                //    console.log(res.data.geniusInfo.nr)
                   this.detail = res.data.geniusInfo
                   this.showPdf(res.data.geniusInfo.nr)
            })
        }
    }
</script>

<style scoped lang="less">
    .search-talent-detail {
        padding: 40px 64px;
        .talent-title {
            text-align: center;
            margin-bottom: 40px;
            h3 {
                font-size: 20px;
                color: #333;
                font-weight: 550;
            }
        }
        .talent-content {
            font-size: 15px;
            color: #333;
        }
    }
</style>