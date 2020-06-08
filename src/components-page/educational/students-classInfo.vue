<template>
    <!--新生分班-->
    <div>
        <div class="common-pd yd-bg yd-common-flex">
            <div class="common-left-tree">

            </div>
            <div class="common-right-table yd-common-table">

            </div>

        </div>

    </div>
</template>

<script>


    export default {
        name:'manage-school-rollfb',
        components:{
            ydSelectZyTree,
            ydImportData
        },
        data() {
            return {
                // 
                importStuSuccess:false,
                fileList:[],
                uploadaction:setting.remoteHost + '/studentTemporary/exportExcel',
                myHeaders:{Authorization:token},
                motaiform:{
                    excelDz:setting.remoteHost + '/studentTemporary/exportTemplate',
                    exportXs:setting.remoteHost + '/studentTemporary/exportData'
                },
                //
                childBjData:{
                    bjmc:'',
                    bjid:''
                },
                dialogFormVisibleImportStu:false,
                editXhData:{},
                zyh:'',
                dialogFormVisibleXh:false,
                dialogFormVisible:false,
                dialogFormVisibleBjmc:false,
                form:{
                    zyid:'',
                    zyh:'',
                    bjsl:null,
                    zdbj:null
                },
                xhrule:{
                    xh:[
                        {required:true,message:'请输入学号',trigger:'blur'}
                    ]
                },
                rules:{
                    zyh:[
                        {required:true,message:'请选择专业号',trigger:'blur'},
                    ],
                    bjsl:[
                        {required:true,message:'请输入班级数量',trigger:'change'},
                        {type:'number',message:'班级数量必需为数字'}
                    ],
                    zdbj:[
                        {required:true,message:'请输入重点班数量',trigger:'change'},
                        {type:'number',message:'重点班数量必需为数字'}
                    ],
                },
                rule:{
                    bh:[
                        {required:true,message:'请输入班号',trigger:'blur'}
                    ],
                    bjmc:[
                        {required:true,message:'请输入班级名称',trigger:'blur'}
                    ]
                },
                classOptions:[],
                zyOptions:[],
                params:{ //传递给分页组件需要的参数
                    limit:10,
                    // page:1,
                    condition:'',
                    zyh:'',
                    isnull:'',
                    bjid:''
                },
                tableList:[],
                editRow:{} //编辑的对象
            }
        },

        methods:{

        },
    }
</script>

