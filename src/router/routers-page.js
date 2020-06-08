// pc端路由文件
export default [
    {
        path: '/login',
        name: 'login',
        component: resolve => require(['../global/login'], resolve),
        meta: {title: '登录', roleHost: true},
    },
    {
        path: '/connect',
        name: 'connect',
        component: resolve => require(['../global/connect'], resolve),
        meta: {title: '正在加载中', requireAuth: true, roleHost: true},
    },
    //公共路由
    {
        path: '/user/select',
        name: 'user_select',
        component: resolve => require(['../components-page/yd-user-select/test'], resolve),
        meta: {title: '用户选择器', roleHost: true},
    },
    {
        path: '/no/user',
        name: 'no_user',
        component: resolve => require(['../global/no-user'], resolve),
        meta: {title: '暂无此用户', requireAuth: false, roleHost: true},
    },
    {
        path: '/404',
        name: '404',
        component: resolve => require(['../global/tip-404'], resolve),
        meta: {title: '404页面找不到', roleHost: true},
    },
    {
        path: '/logout',
        name: 'logout',
        component: resolve => require(['../global/tip-logout'], resolve),
        meta: {title: '退出登录成功', roleHost: true},
    },
    {
        path: '/server/error',
        name: 'server_error',
        component: resolve => require(['../global/tip-server-error'], resolve),
        meta: {title: '服务器异常', roleHost: true},
    },
    {
        path: '/permissions/error',
        name: 'permissions_error',
        component: resolve => require(['../global/tip-permissions-error'], resolve),
        meta: {title: '权限异常', roleHost: true},
    },
    //打印分发管理所有数据
    {
        path: '/manage/teaching/sendFile/pointAll',
        name: 'educational_teaching_sendFile_pointAll',
        component: resolve => {
            require(['../page/educational/manage-teaching-sendFile-pointAll'], resolve)
        },
        meta: {title: '分发管理所有数据', requireAuth: true},
    },
    //打印成绩管理所有数据
    {
        path: '/manage/educational/manage-grade/pointAll',
        name: 'educational_educational_manage-grade_pointAll',
        component: resolve => {
            require(['../components-page/common/score-management-pointAll'], resolve)
        },
        meta: {title: '成绩管理所有数据', requireAuth: true},
    },
    //总课表预览
    {
        path: '/educational/schedule_all',
        name: 'educational_schedule_all',
        component: resolve => {
            require(['../components-page/schedule/yd_schedule_total'], resolve)
        },
        meta: {title: '课表预览', requireAuth: true},
    },

    //角色路由打开新窗口
    {
        path: '/manage',
        name: 'layout_blank',
        component: resolve => require(['../page/layout/layout-blank'], resolve),
        meta: {title: '', requireAuth: true},
        children: [
            {
                path: 'teacher/details/:zgh',
                name: 'manage_teacher_details',
                component: resolve => require(['../page/educational/manage-teacher-details'], resolve),
                meta: {title: '教师详情', requireAuth: true, roleHost: true},
            },
            {
                path: 'student/details/:xh',
                name: 'manage_student_details',
                component: resolve => require(['../page/educational/manage-student-details'], resolve),
                meta: {title: '学生详情', requireAuth: true, roleHost: true},
            },
            {
                path: '/edit/teacherInfo/:jsid',
                name: 'edit_teacher_info',
                component: resolve => require(['../page/educational/edit-teacher-info'], resolve),
                meta: {title: '编辑教师信息', requireAuth: true, roleHost: true},
            },
            {
                path: '/edit/studentInfo/:xsid',
                name: 'edit_student_info',
                component: resolve => require(['../page/educational/edit-student-info'], resolve),
                meta: {title: '编辑学生信息', requireAuth: true, roleHost: true},
            },
            {
                path: '/arranging/setting/multiple/:planid',
                name: 'arranging_setting_multiple',
                component: resolve => require(['../page/educational/arranging-setting-multiple'], resolve),
                meta: {title: '排课全校设置', requireAuth: true, roleHost: true},
            },
            {
                path: '/arranging/setting/single/:planid/:planName',
                name: 'arranging_setting_single',
                component: resolve => require(['../page/educational/arranging-setting-single'], resolve),
                meta: {title: '排课单个设置', requireAuth: true, roleHost: true},
            },
        ]
    },
    //角色路由
    {
        path: '/',
        name: 'layout',
        component: resolve => {
            require(['../page/layout/layout'], resolve)
        },
        meta: {title: '首页', requireAuth: true},
        redirect: '/welcome',
        children: [
            //欢迎页
            {
                path: '/welcome',
                name: 'welcome',
                component: resolve => require(['../page/layout/welcome'], resolve),
                meta: {title: '教务', requireAuth: true},
            },
            {
                path: '/welcome',
                name:'welcome',
                component: resolve =>{require(['../page/layout/welcome'])},
                meta: {title: '欢迎页', roleHost: true},
            },
            //学生
            {
                path: '/students',
                name: 'students',
                component: resolve => {
                    require(['../page/index/students'], resolve)
                },
                meta: {title: '学生', requireAuth: true},
                redirect: '/students/home',
                children: [
                    {
                        path: 'home',
                        name: 'students_home',
                        component: resolve => {
                            require(['../page/students/home'], resolve)
                        },
                        meta: {title: '首页', requireAuth: true},
                    },
                    {
                        path: 'design/open',
                        name: 'student_design_open',
                        component: resolve => {
                            require(['../page/students/student-design-open'], resolve)
                        },
                        meta: {title: '开始评教', requireAuth: true}
                    },
                    {
                        path: 'design/join/:rwid',
                        name: 'student_design_join',
                        component: resolve => {
                            require(['../page/students/student-design-join'], resolve)
                        },
                        meta: {title: '正在评教', requireAuth: true}
                    },
                    {
                        path: 'design/history',
                        name: 'student_design_history',
                        component: resolve => {
                            require(['../page/students/student-design-history'], resolve)
                        },
                        meta: {title: '历史评教', requireAuth: true}
                    },
                    {
                        path: 'user-center',
                        name: 'students_user_center',
                        component: resolve => {
                            require(['../page/students/user-center'], resolve)
                        },
                        meta: {title: '个人中心', requireAuth: true}
                    },
                    {
                        path: 'search/test',
                        name: 'students_test',
                        component: resolve => {
                            require(['../page/students/search-test'], resolve)
                        },
                        meta: {title: '考试查询', requireAuth: true}
                    },
                    {
                        path: 'search/grade',
                        name: 'students_grade',
                        component: resolve => {
                            require(['../page/students/search-grade'], resolve)
                        },
                        meta: {title: '成绩查询', requireAuth: true}
                    },
                    {
                        path: 'search/talent/plan',
                        name: 'students_talent_plan',
                        component: resolve => {
                            require(['../page/students/search-talent-plan'], resolve)
                        },
                        meta: {title: '人才培养计划', requireAuth: true}
                    },
                    {
                        path: 'search/schedule',
                        name: 'students_schedule',
                        component: resolve => {
                            require(['../page/students/search-schedule'], resolve)
                        },
                        meta: {title: '课程表查询', requireAuth: true}
                    },
                    {
                        path: 'search/article',
                        name: 'students_article',
                        component: resolve => {
                            require(['../page/students/search-article'], resolve)
                        },
                        meta: {title: '通知公告查询', requireAuth: true}
                    },
                    {
                        path: 'course/select',
                        name: 'students_handle_select',
                        component: resolve => {
                            require(['../page/students/course'], resolve)
                        },
                        meta: {title: '学生选课', requireAuth: true}
                    },
                    {
                        path: 'course/selected',
                        name: 'students_handle_selected',
                        component: resolve => {
                            require(['../page/students/course-select'], resolve)
                        },
                        meta: {title: '已选课程', requireAuth: true}
                    },
                    {
                        path: 'info',
                        name: 'students_info',
                        component: resolve => {
                            require(['../page/students/info'], resolve)
                        },
                        meta: {title: '基本信息', requireAuth: true}
                    },
                    {
                        path: 'info/extend',
                        name: 'students_info_extend',
                        component: resolve => {
                            require(['../page/students/info-extend'], resolve)
                        },
                        meta: {title: '扩展信息', requireAuth: true}
                    },
                    {
                        path: 'info/attachment',
                        name: 'students_info_attachment',
                        component: resolve => {
                            require(['../page/students/info-attachment'], resolve)
                        },
                        meta: {title: '附件信息', requireAuth: true}
                    },
                    {
                        path: 'message_board',
                        name: 'students_message_board',
                        component: resolve => {
                            require(['../page/students/message-board'], resolve)
                        },
                        meta: {title: '留言板', requireAuth: true}
                    }
                ]
            },
            //教师
            {
                path: '/teacher',
                name: 'teacher',
                component: resolve => require(['../page/index/teacher'], resolve),
                meta: {title: '教师', requireAuth: true},
                redirect: '/home',
                children: [
                    {
                        path: 'home',
                        name: 'teacher_home',
                        component: resolve => {
                            require(['../page/teacher/home'], resolve)
                        },
                        meta: {title: '首页', requireAuth: true}
                    },
                    {
                        path: 'user-center',
                        name: 'teacher_user_center',
                        component: resolve => {
                            require(['../page/teacher/user-center'], resolve)
                        },
                        meta: {title: '个人中心', requireAuth: true}
                    },
                    {
                        path: 'search/invigilate',
                        name: 'teacher_invigilate',
                        component: resolve => {
                            require(['../page/teacher/search-invigilate'], resolve)
                        },
                        meta: {title: '监考查询', requireAuth: true}
                    },
                    {
                        path: 'search/talent/plan',
                        name: 'teacher_talent_plan',
                        component: resolve => {
                            require(['../page/teacher/search-talent-plan'], resolve)
                        },
                        meta: {title: '人才培养计划', requireAuth: true}
                    },
                    {
                        path: 'search/schedule',
                        name: 'teacher_schedule',
                        component: resolve => {
                            require(['../page/teacher/search-schedule'], resolve)
                        },
                        meta: {title: '课程表查询', requireAuth: true}
                    },
                    {
                        path: 'search/article',
                        name: 'teacher_article',
                        component: resolve => {
                            require(['../page/teacher/search-article'], resolve)
                        },
                        meta: {title: '通知公告查询', requireAuth: true}
                    },
                    {
                        path: 'handle/task',
                        name: 'teacher_task',
                        component: resolve => {
                            require(['../page/teacher/task'], resolve)
                        },
                        meta: {title: '任务待办', requireAuth: true}
                    },
                    {
                        path: 'handle/message_board',
                        name: 'teacher_message_board',
                        component: resolve => {
                            require(['../page/teacher/message-board'], resolve)
                        },
                        meta: {title: '留言板', requireAuth: true}
                    },
                    {
                        path: 'teaching/plan',
                        name: 'teacher_teaching_plan',
                        component: resolve => {
                            require(['../page/teacher/teaching-plan'], resolve)
                        },
                        meta: {title: '个人教学计划', requireAuth: true}
                    },
                    {
                        path: 'fill/info',
                        name: 'teacher_info',
                        component: resolve => {
                            require(['../page/teacher/info'], resolve)
                        },
                        meta: {title: '基本信息', requireAuth: true}
                    },
                    {
                        path: 'info/extend',
                        name: 'teacher_info_extend',
                        component: resolve => {
                            require(['../page/teacher/info-extend'], resolve)
                        },
                        meta: {title: '扩展信息', requireAuth: true}
                    },
                    {
                        path: 'info/attachment',
                        name: 'teacher_info_attachment',
                        component: resolve => {
                            require(['../page/teacher/info-attachment'], resolve)
                        },
                        meta: {title: '附件信息', requireAuth: true}
                    },
                    {
                        path: 'grade/history',
                        name: 'teacher_grade_history',
                        component: resolve => {
                            require(['../page/teacher/grade-history'], resolve)
                        },
                        meta: {title: '历史成绩查询', requireAuth: true}
                    },
                    {
                        path: 'grade/headmaster',
                        name: 'teacher_grade_headmaster',
                        component: resolve => {
                            require(['../page/teacher/grade-headmaster'], resolve)
                        },
                        meta: {title: '班主任成绩查询', requireAuth: true}
                    },
                    {
                        path: 'grade/achievements',
                        name: 'teacher_grade_achievements',
                        component: resolve => {
                            require(['../page/teacher/grade-achievements'], resolve)
                        },
                        meta: {title: '成绩查询', requireAuth: true}
                    },
                    {
                        path: 'grade/findings_of_audit',
                        name: 'teacher_grade_findings_of_audit',
                        component: resolve => {
                            require(['../page/teacher/grade-findings-of-audit'], resolve)
                        },
                        meta: {title: '成绩审核结果', requireAuth: true}
                    },
                    {
                        path: 'grade/entry',
                        name: 'teacher_grade_entry',
                        component: resolve => {
                            require(['../page/teacher/grade-entry'], resolve)
                        },
                        meta: {title: '开始录入', requireAuth: true}
                    },
                    {
                        path: 'grade/entry/:id',
                        name: 'teacher_grade_entry_open',
                        component: resolve => {
                            require(['../page/teacher/grade-entry-class'], resolve)
                        },
                        meta: {title: '成绩录入', requireAuth: true}
                    },
                    {
                        path: 'students/report',
                        name: 'teacher_students_report',
                        component: resolve => {
                            require(['../page/teacher/students-registration'], resolve)
                        },
                        meta: {title: '学生报到', requireAuth: true}
                    }
                ]
            },
            //教务
            {
                path: '/educational',
                name: 'educational',
                component: resolve => require(['../page/index/educational'], resolve),
                meta: {title: '教务', requireAuth: true},
                redirect: '/home',
                children: [
                    {
                        path: 'home',
                        name: 'educational_home',
                        component: resolve => {
                            require(['../page/educational/home'], resolve)
                        },
                        meta: {title: '首页', requireAuth: true}
                    },
                    {
                        path: 'manage/data-quality',
                        name: 'educational_data_quality',
                        component: resolve => {
                            require(['../page/educational/manage-data-quality'], resolve)
                        },
                        meta: {title: '数据质量核查', requireAuth: true}
                    },
                    {
                        path: 'manage/grade',
                        name: 'educational_grade',
                        component: resolve => {
                            require(['../page/educational/manage-grade'], resolve)
                        },
                        meta: {title: '成绩管理', requireAuth: true}
                    },
                    {
                        path: 'manage/grade/statistical',
                        name: 'educational_grade_statistical',
                        component: resolve => {
                            require(['../page/educational/manage-grade-statistical'], resolve)
                        },
                        meta: {title: '成绩统计', requireAuth: true}
                    },
                    {
                        path: 'manage/diploma',
                        name: 'educational_diploma',
                        component: resolve => {
                            require(['../page/educational/manage-diploma'], resolve)
                        },
                        meta: {title: '毕业管理', requireAuth: true}
                    },
                    {
                        path: 'manage/diploma/history',
                        name: 'educational_diploma_history',
                        component: resolve => {
                            require(['../page/educational/manage-diploma-history'], resolve)
                        },
                        meta: {title: '毕业历史信息查看', requireAuth: true}
                    },

                    {
                        path: 'manage/school-roll',
                        name: 'educational_school_roll',
                        component: resolve => {
                            require(['../page/educational/manage-school-roll'], resolve)
                        },
                        meta: {title: '新生分班', requireAuth: true}
                    },
                    {
                        path: 'manage/school-registration-num',
                        name: 'educational_school_registration_num',
                        component: resolve => {
                            require(['../page/educational/manage-school-registration-num'], resolve)
                        },
                        meta: {title: '学生报到统计', requireAuth: true}
                    },
                    {
                        path: 'manage/student/info',
                        name: 'educational_student_info',
                        component: resolve => {
                            require(['../page/educational/manage-student-info'], resolve)
                        },
                        meta: {title: '学生信息管理', requireAuth: true}
                    },
                    {
                        path: 'manage/student/extend',
                        name: 'educational_student_extend',
                        component: resolve => {
                            require(['../page/educational/manage-student-extend'], resolve)
                        },
                        meta: {title: '学生扩展信息管理', requireAuth: true}
                    },
                    {
                        path: 'manage/talent-plan',
                        name: 'educational_talent_plan',
                        component: resolve => {
                            require(['../page/educational/manage-talent-plan'], resolve)
                        },
                        meta: {title: '人才培养计划', requireAuth: true}
                    },
                    {
                        path: 'manage/teaching-plan',
                        name: 'educational_teaching_plan',
                        component: resolve => {
                            require(['../page/educational/manage-teaching-plan'], resolve)
                        },
                        meta: {title: '教学计划管理', requireAuth: true}
                    },
                    {
                        path: 'manage/teacher/info',
                        name: 'educational_teacher_info',
                        component: resolve => {
                            require(['../page/educational/manage-teacher-info'], resolve)
                        },
                        meta: {title: '教师信息管理', requireAuth: true}
                    },
                    {
                        path: 'manage/teacher/extend',
                        name: 'educational_teacher_extend',
                        component: resolve => {
                            require(['../page/educational/manage-teacher-extend'], resolve)
                        },
                        meta: {title: '扩展信息', requireAuth: true}
                    },
                    {
                        path: 'user-center',
                        name: 'educational_user_center',
                        component: resolve => {
                            require(['../page/educational/user-center'], resolve)
                        },
                        meta: {title: '个人中心', requireAuth: true}
                    },
                    {
                        path: 'manager/article',
                        name: 'educational_article',
                        component: resolve => {
                            require(['../page/educational/manager-article'], resolve)
                        },
                        meta: {title: '通知公告', requireAuth: true}
                    },
                    {
                        path: 'manager/message',
                        name: 'educational_message',
                        component: resolve => {
                            require(['../page/educational/manager-message'], resolve)
                        },
                        meta: {title: '留言管理', requireAuth: true}
                    },
                    {
                        path: 'manager/teachingBuilding',
                        name: 'educational_teaching_building',
                        component: resolve => {
                            require(['../page/educational/manage-teaching-building'], resolve)
                        },
                        meta: {title: '教学楼管理', requireAuth: true}
                    },
                    {
                        path: 'manager/professional',
                        name: 'educational_professional',
                        component: resolve => {
                            require(['../page/educational/manage-professional'], resolve)
                        },
                        meta: {title: '专业管理', requireAuth: true}
                    },
                    {
                        path: 'manager/courses',
                        name: 'educational_courses',
                        component: resolve => {
                            require(['../page/educational/manage-courses'], resolve)
                        },
                        meta: {title: '课程管理', requireAuth: true}
                    },
                    //教学进程表
                    {
                        path: '/manager/teaching_process',
                        name: 'educational_teaching_process',
                        component: resolve => {
                            require(['../page/educational/teaching_process'], resolve)
                        },
                        meta: {title: '教学进程表', requireAuth: true},
                    },
                    //假日调课
                    {
                        path: '/manager/arranging_holiday_adjustment',
                        name: 'arranging_holiday_adjustment',
                        component: resolve => {
                            require(['../page/educational/arranging-holiday-adjustment'], resolve)
                        },
                        meta: {title: '假日调课', requireAuth: true},
                    },
                    {
                        path: 'arranging/list',
                        name: 'educational_arranging_list',
                        component: resolve => {
                            require(['../page/educational/arranging-list'], resolve)
                        },
                        meta: {title: '辅助排课', requireAuth: true}
                    },
                    {
                        path: 'arranging/course/grade',
                        name: 'educational_arranging_grade',
                        component: resolve => {
                            require(['../page/educational/arranging-course-grade'], resolve)
                        },
                        meta: {title: '辅助排课', requireAuth: true}
                    },
                    {
                        path: 'arranging/course/:year/:xq/:isNoWeek/:xlid',
                        name: 'educational_arranging',
                        component: resolve => {
                            require(['../page/educational/arranging-course'], resolve)
                        },
                        meta: {title: '辅助排课', requireAuth: true}
                    },
                    {
                        path: 'schedule/search',
                        name: 'educational_schedule',
                        component: resolve => {
                            require(['../page/educational/search-schedule'], resolve)
                        },
                        meta: {title: '单课表查询', requireAuth: true}
                    },
                    {
                        path: 'schedule/search/total',
                        name: 'educational_schedule_total',
                        component: resolve => {
                            require(['../page/educational/search-schedule-total'], resolve)
                        },
                        meta: {title: '总课表查询', requireAuth: true}
                    },
                    {
                        path: 'manage/classroom',
                        name: 'educational_classroom',
                        component: resolve => {
                            require(['../page/educational/manage-classroom'], resolve)
                        },
                        meta: {title: '教室管理', requireAuth: true}
                    },
                    {
                        path: 'manage/teaching/file',
                        name: 'educational_teaching_file',
                        component: resolve => {
                            require(['../page/educational/manage-teaching-file'], resolve)
                        },
                        meta: {title: '教材库', requireAuth: true}
                    },
                    {
                        path: 'manage/teaching/sendFile',
                        name: 'educational_teaching_sendFile',
                        component: resolve => {
                            require(['../page/educational/manage-teaching-sendFile'], resolve)
                        },
                        meta: {title: '分发教材', requireAuth: true}
                    },
                    {
                        path: 'manage/teachers',
                        name: 'educational_teachers',
                        component: resolve => {
                            require(['../page/educational/manage-teachers'], resolve)
                        },
                        meta: {title: '师资管理', requireAuth: true}
                    },
                    {
                        path: 'manage/students/selectCourse',
                        name: 'educational_students_selectCourse',
                        component: resolve => {
                            require(['../page/educational/manage-students-selectCourse'], resolve)
                        },
                        meta: {title: '学生选课管理', requireAuth: true}
                    },
                    {
                        path: 'manage/exam',
                        name: 'educational_exam',
                        component: resolve => {
                            require(['../page/educational/manage-exam'], resolve)
                        },
                        meta: {title: '考试管理', requireAuth: true}
                    },
                    {
                        path: 'manage/examination',
                        name: 'educational_examination',
                        component: resolve => {
                            require(['../page/educational/manage-examination'], resolve)
                        },
                        meta: {title: '考试管理', requireAuth: true}
                    },
                    {
                        path: 'manage/achievements',
                        name: 'educational_achievements',
                        component: resolve => {
                            require(['../page/educational/manage-achievements'], resolve)
                        },
                        meta: {title: '成绩查询', requireAuth: true}
                    },
                    {
                        path: 'manage/score/query',
                        name: 'educational_score_query',
                        component: resolve => {
                            require(['../page/educational/manage-score-query'], resolve)
                        },
                        meta: {title: '成绩统计', requireAuth: true}
                    },
                    {
                        path: 'manage/score/entry/review',
                        name: 'educational_score_entry_review',
                        component: resolve => {
                            require(['../page/educational/manage-score-entry-review'], resolve)
                        },
                        meta: {title: '成绩录入审核', requireAuth: true}
                    },
                    {
                        path: 'manage/class',
                        name: 'educational_class',
                        component: resolve => {
                            require(['../page/educational/manage-class'], resolve)
                        },
                        meta: {title: '班级管理', requireAuth: true}
                    },
                    {
                        path: 'manage/exam/time',
                        name: 'educational_exam_time',
                        component: resolve => {
                            require(['../page/educational/manage-exam-time'], resolve)
                        },
                        meta: {title: '考期管理', requireAuth: true}
                    },
                    {
                        path: 'manage/seniority',
                        name: 'educational_seniority',
                        component: resolve => {
                            require(['../page/educational/manage-seniority'], resolve)
                        },
                        meta: {title: '校历管理', requireAuth: true}
                    },

                    {
                        path: 'manage/college',
                        name: 'educational_college',
                        component: resolve => {
                            require(['../page/educational/manage-college'], resolve)
                        },
                        meta: {title: '院系管理', requireAuth: true}
                    },
                    {
                        path: 'manage/department',
                        name: 'educational_department',
                        component: resolve => {
                            require(['../page/educational/manage-department'], resolve)
                        },
                        meta: {title: '教研组管理', requireAuth: true}
                    },
                    {
                        path: 'manage/system/setting',
                        name: 'educational_setting',
                        component: resolve => {
                            require(['../page/educational/setting'], resolve)
                        },
                        meta: {title: '系统设置', requireAuth: true}
                    },
                    {
                        path: 'manage/teaching/task',
                        name: 'educational_teaching_evaluation_task',
                        component: resolve => {
                            require(['../page/educational/teaching-evaluation-task'], resolve)
                        },
                        meta: {title: '评教任务', requireAuth: true}
                    },
                    {
                        path: 'manage/teaching/record',
                        name: 'educational_teaching_evaluation_record',
                        component: resolve => {
                            require(['../page/educational/teaching-evaluation-record'], resolve)
                        },
                        meta: {title: '评教记录', requireAuth: true}
                    },
                    {
                        path: 'manage/teaching/statistics',
                        name: 'educational_teaching_evaluation_statistics',
                        component: resolve => {
                            require(['../page/educational/teaching-evaluation-statistics'], resolve)
                        },
                        meta: {title: '评教统计', requireAuth: true}
                    },
                ]
            },
            //index 公共的
            {
                path: 'talent/list/detail/:id',
                name: 'talent_list_detail',
                component: resolve => {
                    require(['../page/index/components/talent-list-detail'], resolve)
                },
                meta: {title: '人才培养计划详情', requireAuth: true}
            },
            {
                path: 'article/list/detail/:id',
                name: 'article_list_detail',
                component: resolve => {
                    require(['../page/index/components/article-list-detail'], resolve)
                },
                meta: {title: '通知公告详情', requireAuth: true}
            },
            {
                path: 'message_board_add',
                name: 'students_message_board_add',
                component: resolve => {
                    require(['../components-mobile/message-board-add'], resolve)
                },
                meta: {title: '留言板添加', requireAuth: true}
            },
        ],
    },
]
